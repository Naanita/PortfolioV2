
import asyncio
import os
import json
import logging
import random
import tempfile
from datetime import datetime
from dotenv import load_dotenv
import boto3
from botocore.config import Config
from playwright.async_api import async_playwright
import yt_dlp
from io import BytesIO
from PIL import Image

# ─── CARGAR CONFIGURACIÓN ──────────────────────────────────────────────────────
load_dotenv()
ACCOUNT_ID = os.getenv('CF_ACCOUNT_ID')
ACCESS_KEY = os.getenv('CF_ACCESS_KEY_ID')
SECRET_KEY = os.getenv('CF_SECRET_ACCESS_KEY')
BUCKET     = os.getenv('CF_R2_BUCKET')
ENDPOINT   = f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com"

# Cliente S3 para Cloudflare R2
s3 = boto3.client(
    's3',
    endpoint_url=ENDPOINT,
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name='auto',
    config=Config(s3={'addressing_style': 'path'})
)

# ─── CONSTANTES ───────────────────────────────────────────────────────────────
VIDEOS_A_PROCESAR = [
    'https://www.tiktok.com/@hikvisionlatam/video/7518742393085054214',
    'https://www.tiktok.com/@hikvisionlatam/video/7516918173078228229',
    'https://www.tiktok.com/@hikvisionlatam/video/7498116270617857335',
    'https://www.tiktok.com/@hikvisionlatam/video/7491838741091192119',
    'https://www.tiktok.com/@hikvisionlatam/video/7510300279997320454',
    'https://www.tiktok.com/@hikvisionlatam/video/7502229067761093893',
]
USERNAME = 'hikvisionlatam'
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ─── AUXILIARES PLAYWRIGHT ──────────────────────────────────────────────────────
async def random_sleep(min_s, max_s):
    await asyncio.sleep(random.uniform(min_s, max_s))

async def scroll_page(page):
    await page.evaluate('window.scrollBy(0, window.innerHeight);')
    await random_sleep(1, 2)

async def handle_captcha(page):
    try:
        btn = page.locator('button', has_text='Omitir')
        if await btn.count() and await btn.is_visible():
            await btn.click(); await asyncio.sleep(2)
        dlg = page.locator('div[role="dialog"]')
        if await dlg.count() and await dlg.is_visible():
            await page.wait_for_selector('div[role="dialog"]', state='detached', timeout=300000)
    except:
        pass

async def hover_and_get_views(page, element):
    try:
        await element.hover(); await random_sleep(0.5, 1)
        return await element.evaluate(
            'el => el.querySelector("strong[data-e2e=\\"video-views\\"]")?.textContent.trim() || "N/A"'
        )
    except:
        return 'N/A'

# ─── METADATOS + MINIATURA ──────────────────────────────────────────────────────
async def extract_video_info(page, video_url, views):
    await page.goto(video_url, wait_until='networkidle'); await random_sleep(2, 4); await handle_captcha(page)
    if views == 'N/A':
        views = await page.evaluate(
            '() => document.querySelector("strong[data-e2e=\\"video-views\\"]")?.textContent.trim() || "N/A"'
        )
    # descripción y hashtags
    desc = await page.evaluate(
        '''() => {
            let d = '', tags = [];
            document.querySelectorAll('span[data-e2e="new-desc-span"]').forEach(el => {
                d += el.textContent.trim() + ' ';
                const m = el.textContent.match(/#\S+/g);
                if(m) tags.push(...m);
            });
            return {description: d.trim(), hashtags: [...new Set(tags)]};
        }'''
    )
    sel = await page.evaluate(
        '''() => {
            const get = sels => {
                for (const s of sels) {
                    const el = document.querySelector(s);
                    if(el?.textContent.trim()) return el.textContent.trim();
                }
                return 'N/A';
            };
            return {
                likes: get(['[data-e2e="like-count"]','[data-e2e="browse-like-count"]']),
                comments: get(['[data-e2e="comment-count"]','[data-e2e="browse-comment-count"]']),
                shares: get(['[data-e2e="share-count"]']),
                bookmarks: get(['[data-e2e="undefined-count"]']),
                music: get(['.css-pvx3oa-DivMusicText']),
                date: get(['span[data-e2e="browser-nickname"] span:last-child'])
            };
        }'''
    )
    info = {
        'url': video_url,
        'views': views,
        'description': desc['description'],
        'hashtags': desc['hashtags'],
        **sel,
        'timestamp': datetime.now().isoformat(),
    }
    # miniatura en memoria + subida
    try:
        vid_id = video_url.rstrip('/').split('/video/')[1].split('?')[0]
        thumb_src = await page.evaluate(
            '() => document.querySelector("div.css-1e263gw-StyledVideoBlurBackground picture img")?.src'
        )
        if thumb_src:
            res = requests.get(thumb_src, timeout=10); res.raise_for_status()
            img = Image.open(BytesIO(res.content)).convert('RGB')
            buf = BytesIO(); img.save(buf, format='WEBP', quality=80)
            key = f'thumbnails/{vid_id}.webp'
            s3.put_object(Bucket=BUCKET, Key=key, Body=buf.getvalue(), ContentType='image/webp')
            info['thumbnail_url'] = f"{ENDPOINT}/{BUCKET}/{key}"
    except:
        info['thumbnail_url'] = None
    return info

# ─── DESCARGA + SUBIDA VÍDEO ────────────────────────────────────────────────────
def download_and_upload_video(video_url):
    # descarga a archivo temporal
    with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as tmp:
        path = tmp.name
    opts = {'outtmpl': path, 'format': 'best', 'quiet': True, 'noplaylist': True}
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([video_url])
        # subir el archivo
        vid_id = video_url.rstrip('/').split('/video/')[1].split('?')[0]
        ext = os.path.splitext(path)[1].lstrip('.')
        key = f'videos/{vid_id}.{ext}'
        s3.upload_file(path, BUCKET, key)
        r2_url = f"{ENDPOINT}/{BUCKET}/{key}"
    finally:
        try:
            os.remove(path)
        except:
            pass
    return r2_url

# ─── SCRAPE + PROCESO COMPLETO ─────────────────────────────────────────────────
async def scrape_and_upload():
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(user_agent='Mozilla/5.0')
        # extraer vistas
        page = await context.new_page()
        await page.goto(f'https://www.tiktok.com/@{USERNAME}', wait_until='networkidle')
        await handle_captcha(page)
        for _ in range(5): await scroll_page(page); await handle_captcha(page)
        elems = await page.query_selector_all('div[data-e2e="user-post-item"]')
        views_map = {}
        for el in elems:
            href = await el.evaluate('e => e.querySelector("a").href')
            if href in VIDEOS_A_PROCESAR:
                views_map[href] = await hover_and_get_views(page, el)
        await page.close()
        # procesar cada vídeo
        for url, vws in views_map.items():
            logging.info(f'Procesando {url}')
            detail = await context.new_page()
            try:
                info = await extract_video_info(detail, url, vws)
                # descarga y subida
                info['video_url'] = download_and_upload_video(url)
                results.append(info)
                logging.info(f'OK {url}')
            except Exception as e:
                logging.error(f'Error procesando {url}: {e}', exc_info=True)
            finally:
                await detail.close(); await random_sleep(2, 5)
        await browser.close()
    return results

async def main():
    data = await scrape_and_upload()
    # imprimir y guardar JSON
    for item in data: print(json.dumps(item, ensure_ascii=False))
    out = os.path.join(os.path.dirname(__file__), f'{USERNAME}_tiktok_videos.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(data, f, separators=(',', ':'), ensure_ascii=False)
    print(f'JSON guardado en: {out}')

if __name__ == '__main__':
    asyncio.run(main())

