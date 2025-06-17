import asyncio
import os
import json
import logging
from datetime import datetime
from playwright.async_api import async_playwright
import yt_dlp
import requests
from PIL import Image
from io import BytesIO

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

DOWNLOAD_VIDEOS = True
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COOKIE_FILE = os.path.join(BASE_DIR, "cookies.json")

# Directorio para thumbnails optimizados
IMAGES_DIR = os.path.join(BASE_DIR, "images")
os.makedirs(IMAGES_DIR, exist_ok=True)

def ajustar_ruta_local_filename(ruta_absoluta, username='hikvisionlatam'):
    ruta_unix = ruta_absoluta.replace('\\', '/')
    idx = ruta_unix.rfind(f"/{username}/")
    if idx != -1:
        return ruta_unix[idx:]
    idx2 = ruta_unix.find(username)
    if idx2 != -1:
        return '/' + ruta_unix[idx2:]
    filename = os.path.basename(ruta_unix)
    return f"/{username}/{filename}"

async def random_sleep(min_seconds, max_seconds):
    import random
    await asyncio.sleep(random.uniform(min_seconds, max_seconds))

async def scroll_page(page):
    await page.evaluate("window.scrollBy(0, window.innerHeight);")
    await random_sleep(1, 2)

async def handle_captcha(page, cookies_exist):
    try:
        if cookies_exist:
            btn = page.locator("button", has_text="Omitir")
            if await btn.count() and await btn.is_visible():
                await btn.click()
                await asyncio.sleep(2)
                return

        dialog = page.locator('div[role="dialog"]')
        if await dialog.count() and await dialog.is_visible():
            await page.wait_for_selector('div[role="dialog"]', state='detached', timeout=300000)
            await asyncio.sleep(0.5)
            if not cookies_exist:
                btn2 = page.locator("button", has_text="Omitir")
                if await btn2.count() and await btn2.is_visible():
                    await btn2.click()
                    await asyncio.sleep(2)
            return
    except Exception as e:
        logging.error(f"Error al manejar CAPTCHA: {e}")

async def hover_and_get_views(page, element):
    try:
        await element.hover()
        await random_sleep(0.5, 1)
        return await element.evaluate("""
            el => {
                const v = el.querySelector('strong[data-e2e="video-views"]');
                return v ? v.textContent.trim() : 'N/A';
            }
        """)
    except:
        return 'N/A'

async def extract_video_info(page, video_url, views):
    await page.goto(video_url, wait_until="networkidle")
    await random_sleep(2, 4)
    cookies_exist = os.path.exists(COOKIE_FILE)
    await handle_captcha(page, cookies_exist)

    # descripción y hashtags
    desc_data = await page.evaluate("""
    () => {
        let desc = '', tags = [];
        document.querySelectorAll('span[data-e2e="new-desc-span"]').forEach(el => {
            desc += el.textContent.trim() + ' ';
            const m = el.textContent.match(/#\\S+/g);
            if (m) tags.push(...m);
        });
        document.querySelectorAll('a.search-common-link strong').forEach(s => {
            const t = s.textContent.trim();
            desc += t + ' ';
            tags.push(t);
        });
        return { description: desc.trim(), hashtags: tags };
    }
    """)
    description = desc_data['description']
    hashtags = desc_data['hashtags']
    first_tag = hashtags[0] if hashtags else ''

    video_info = await page.evaluate("""
    () => {
        const get = sels => {
            for (let sel of sels) {
                const el = document.querySelector(sel);
                if (el && el.textContent.trim()) return el.textContent.trim();
            }
            return 'N/A';
        };
        return {
            likes: get(['[data-e2e="like-count"]','[data-e2e="browse-like-count"]']),
            comments: get(['[data-e2e="comment-count"]','[data-e2e="browse-comment-count"]']),
            shares: get(['[data-e2e="share-count"]']),
            bookmarks: get(['[data-e2e="undefined-count"]']),
            musicTitle: get(['.css-pvx3oa-DivMusicText']),
            date: get(['span[data-e2e="browser-nickname"] span:last-child'])
        };
    }
    """)
    if views == 'N/A':
        views = await page.evaluate("""
            () => {
                const v = document.querySelector('strong[data-e2e="video-views"]');
                return v ? v.textContent.trim() : 'N/A';
            }
        """)

    video_info.update({
        'url': video_url,
        'views': views,
        'description': description,
        'hashtags': hashtags,
        'first_hashtag': first_tag,
        'timestamp': datetime.now().isoformat(),
    })

    # === BLOQUE THUMBNAIL: extraer desde <picture> y optimizar a WebP <300KB ===
    try:
        vid_id = video_url.rstrip('/').split('/video/')[1].split('?')[0]
        thumb_src = await page.evaluate("""
        () => {
            const pic = document.querySelector('div.css-sq145r picture img');
            return pic ? pic.src : null;
        }
        """)
        if thumb_src:
            resp = requests.get(thumb_src, timeout=10)
            resp.raise_for_status()
            img = Image.open(BytesIO(resp.content)).convert('RGB')
            quality = 80
            buf = BytesIO()
            img.save(buf, format='WEBP', quality=quality)
            while buf.tell() > 300*1024 and quality > 10:
                quality -= 10
                buf = BytesIO()
                img.save(buf, format='WEBP', quality=quality)
            filename = f"{vid_id}_poster.webp"
            path = os.path.join(IMAGES_DIR, filename)
            with open(path, 'wb') as f:
                f.write(buf.getvalue())
            video_info['thumbnail_url'] = f"/images/{filename}"
            logging.info(f"Thumbnail optimizado guardado en {path}")
        else:
            logging.warning("No se encontró <picture><img> para thumbnail")
    except Exception as e:
        logging.error(f"Error en thumbnail: {e}")
    # ============================================================

    return video_info

def download_tiktok_video(video_url, save_path):
    opts = {
        'outtmpl': os.path.join(save_path, '%(id)s.%(ext)s'),
        'format': 'best',
        'quiet': True,
    }
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            fn = ydl.prepare_filename(info)
            logging.info(f"Video descargado: {fn}")
            return fn
    except Exception as e:
        logging.error(f"Error descargando video: {e}")
        return None

async def save_cookies(context):
    cookies = await context.cookies()
    with open(COOKIE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cookies, f, ensure_ascii=False, indent=2)
    logging.info("Cookies guardadas")

async def load_cookies(context):
    with open(COOKIE_FILE, 'r', encoding='utf-8') as f:
        cookies = json.load(f)
    await context.add_cookies(cookies)
    logging.info("Cookies cargadas")

async def scrape_tiktok_profile(username):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={'width':1280,'height':720},
            user_agent=(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                'AppleWebKit/537.36 (KHTML, like Gecko) '
                'Chrome/91.0.4472.124 Safari/537.36'
            )
        )

        if os.path.exists(COOKIE_FILE):
            await load_cookies(context)

        page = await context.new_page()
        await page.goto(f"https://www.tiktok.com/@{username}", wait_until="networkidle")
        await handle_captcha(page, os.path.exists(COOKIE_FILE))
        await save_cookies(context)

        for _ in range(10):
            await scroll_page(page)
            await handle_captcha(page, os.path.exists(COOKIE_FILE))

        elems = await page.query_selector_all('div[data-e2e="user-post-item"]')
        elems = elems[3:11]  # tomamos 8 videos
        logging.info(f"Procesando {len(elems)} videos...")

        video_urls = []
        for el in elems:
            href = await el.evaluate('e => e.querySelector("a").href')
            vws = await hover_and_get_views(page, el)
            video_urls.append((href, vws))

        # Cargar datos anteriores
        json_file = os.path.join(BASE_DIR, f"{username}_tiktok_videos.json")
        previous = []
        if os.path.exists(json_file):
            with open(json_file, 'r', encoding='utf-8') as f:
                previous = json.load(f)
        videos_dict = {v['url']: v for v in previous}

        # Extraer y descargar
        for url, vws in video_urls:
            info = await extract_video_info(page, url, vws)
            if DOWNLOAD_VIDEOS:
                dst = os.path.join(BASE_DIR, username)
                os.makedirs(dst, exist_ok=True)
                fn = download_tiktok_video(url, dst)
                if fn:
                    info['local_filename'] = ajustar_ruta_local_filename(fn)
            videos_dict[url] = info

        await browser.close()

        # === Ajuste de orden para que el video que salió primero vaya al inicio ===
        ordered = [videos_dict[url] for url, _ in video_urls]
        ordered.reverse()
        return ordered

async def main():
    username = "hikvisionlatam"
    videos = await scrape_tiktok_profile(username)
    out = os.path.join(BASE_DIR, f"{username}_tiktok_videos.json")
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(videos, f, indent=2, ensure_ascii=False)
    print(f"Guardado en {out}")

if __name__ == "__main__":
    asyncio.run(main())
