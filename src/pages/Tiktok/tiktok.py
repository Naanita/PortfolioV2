import asyncio
import os
import json
import logging
from datetime import datetime
from playwright.async_api import async_playwright
import yt_dlp

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

DOWNLOAD_VIDEOS = True
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COOKIE_FILE = os.path.join(BASE_DIR, "cookies.json")

def ajustar_ruta_local_filename(ruta_absoluta, base_dir_unix='/src/pages'):
    ruta_unix = ruta_absoluta.replace('\\', '/')
    pos = ruta_unix.find(base_dir_unix)
    if pos != -1:
        ruta_relativa = ruta_unix[pos:]
    else:
        ruta_relativa = ruta_unix
    return ruta_relativa

async def random_sleep(min_seconds, max_seconds):
    import random
    await asyncio.sleep(random.uniform(min_seconds, max_seconds))

async def scroll_page(page):
    await page.evaluate("window.scrollBy(0, window.innerHeight);")
    await random_sleep(1, 2)

async def handle_captcha(page, cookies_exist):
    try:
        if cookies_exist:
            omitir_button = page.locator("button", has_text="Omitir")
            if await omitir_button.count() > 0 and await omitir_button.is_visible():
                logging.info("CAPTCHA de intereses (PRIMERO) detectado. Pulsando 'Omitir'...")
                await omitir_button.click()
                await asyncio.sleep(2)
                logging.info("CAPTCHA de intereses resuelto.")
                return

        captcha_dialog = page.locator('div[role="dialog"]')
        if await captcha_dialog.count() > 0 and await captcha_dialog.is_visible():
            logging.info("CAPTCHA detectado. Esperando resolución automática...")
            await page.wait_for_selector('div[role="dialog"]', state='detached', timeout=300000)
            logging.info("CAPTCHA resuelto. Continuando...")
            await asyncio.sleep(0.5)
            if not cookies_exist:
                omitir_button = page.locator("button", has_text="Omitir")
                if await omitir_button.count() > 0 and await omitir_button.is_visible():
                    logging.info("CAPTCHA de intereses (SEGUNDO) detectado. Pulsando 'Omitir'...")
                    await omitir_button.click()
                    await asyncio.sleep(2)
                    logging.info("CAPTCHA de intereses resuelto.")
            return
    except Exception as e:
        logging.error(f"Error al manejar CAPTCHA: {str(e)}")

async def hover_and_get_views(page, video_element):
    try:
        await video_element.hover()
        await random_sleep(0.5, 1)
        views = await video_element.evaluate("""
        (element) => {
            const viewElement = element.querySelector('strong[data-e2e="video-views"]');
            return viewElement ? viewElement.textContent.trim() : 'N/A';
        }
        """)
        return views
    except Exception:
        return 'N/A'

async def extract_video_info(page, video_url, views):
    await page.goto(video_url, wait_until="networkidle")
    await random_sleep(2, 4)
    cookies_exist = os.path.exists(COOKIE_FILE)
    await handle_captcha(page, cookies_exist=cookies_exist)

    description_and_hashtags = await page.evaluate("""
    () => {
        let description = '';
        let hashtags = [];
        const descElements = document.querySelectorAll('span[data-e2e="new-desc-span"]');
        descElements.forEach(el => {
            if (el && el.textContent) {
                description += el.textContent.trim() + ' ';
                const matches = el.textContent.match(/#\\S+/g);
                if (matches) {
                    hashtags.push(...matches);
                }
            }
        });
        const hashtagLinks = document.querySelectorAll('a.search-common-link strong');
        hashtagLinks.forEach(strong => {
            if (strong && strong.textContent) {
                const tag = strong.textContent.trim();
                description += tag + ' ';
                hashtags.push(tag);
            }
        });
        return { description: description.trim(), hashtags: hashtags };
    }
    """)
    description = description_and_hashtags['description']
    hashtags = description_and_hashtags['hashtags']
    first_hashtag = hashtags[0] if hashtags else ''

    video_info = await page.evaluate("""
    () => {
        const getTextContent = (selectors) => {
            for (let selector of selectors) {
                const elements = document.querySelectorAll(selector);
                for (let element of elements) {
                    const text = element.textContent.trim();
                    if (text) return text;
                }
            }
            return 'N/A';
        };
        return {
            likes: getTextContent(['[data-e2e="like-count"]', '[data-e2e="browse-like-count"]']),
            comments: getTextContent(['[data-e2e="comment-count"]', '[data-e2e="browse-comment-count"]']),
            shares: getTextContent(['[data-e2e="share-count"]']),
            bookmarks: getTextContent(['[data-e2e="undefined-count"]']),
            musicTitle: getTextContent(['.css-pvx3oa-DivMusicText']),
            date: getTextContent(['span[data-e2e="browser-nickname"] span:last-child']),
        };
    }
    """)
    if views == 'N/A':
        views = await page.evaluate("""
        () => {
            const viewElement = document.querySelector('strong[data-e2e="video-views"]');
            return viewElement ? viewElement.textContent.trim() : 'N/A';
        }
        """)
    video_info.update({
        'views': views,
        'url': video_url,
        'description': description,
        'hashtags': hashtags,
        'first_hashtag': first_hashtag,
        'timestamp': datetime.now().isoformat()
    })
    return video_info

def download_tiktok_video(video_url, save_path):
    ydl_opts = {
        'outtmpl': os.path.join(save_path, '%(id)s.%(ext)s'),
        'format': 'best',
        'quiet': True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            filename = ydl.prepare_filename(info)
            logging.info(f"Video descargado: {filename}")
            return filename
    except Exception as e:
        logging.error(f"Error descargando video: {str(e)}")
        return None

async def save_cookies(context):
    cookies = await context.cookies()
    with open(COOKIE_FILE, "w", encoding="utf-8") as f:
        json.dump(cookies, f, ensure_ascii=False, indent=2)
    logging.info("Cookies guardadas en cookies.json")

async def load_cookies(context):
    with open(COOKIE_FILE, "r", encoding="utf-8") as f:
        cookies = json.load(f)
    await context.add_cookies(cookies)
    logging.info("Cookies cargadas desde cookies.json")

async def scrape_tiktok_profile(username):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 720},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        )

        cookies_exist = os.path.exists(COOKIE_FILE)
        if cookies_exist:
            await load_cookies(context)

        page = await context.new_page()
        await page.goto(f"https://www.tiktok.com/@{username}", wait_until="networkidle")
        await handle_captcha(page, cookies_exist=cookies_exist)

        if not cookies_exist:
            await save_cookies(context)

        for _ in range(10):
            await scroll_page(page)
            await handle_captcha(page, cookies_exist=cookies_exist)

        video_elements = await page.query_selector_all('div[data-e2e="user-post-item"]')
        video_elements = video_elements[3:3+8]
        logging.info(f"Procesando {len(video_elements)} videos...")

        video_urls = []
        for element in video_elements:
            video_url = await element.evaluate('(el) => el.querySelector("a").href')
            views = await hover_and_get_views(page, element)
            video_urls.append((video_url, views))

        json_file = os.path.join(BASE_DIR, f"{username}_tiktok_videos.json")
        previous_data = []
        if os.path.exists(json_file):
            with open(json_file, 'r', encoding='utf-8') as f:
                previous_data = json.load(f)

        # Diccionario para acceso rápido y actualización por URL
        videos_dict = {v['url']: v for v in previous_data}

        for video_url, views in video_urls:
            video_info = await extract_video_info(page, video_url, views)
            if DOWNLOAD_VIDEOS:
                save_path = os.path.join(BASE_DIR, username)
                os.makedirs(save_path, exist_ok=True)
                filename = download_tiktok_video(video_url, save_path)
                if filename:
                    video_info['local_filename'] = ajustar_ruta_local_filename(filename)
            # Actualiza o agrega el video por su URL
            videos_dict[video_url] = video_info

        await browser.close()
        # Convierte el diccionario actualizado a lista para guardar
        updated_data = list(videos_dict.values())
        return updated_data

async def main():
    username = "hikvisionlatam"
    videos = await scrape_tiktok_profile(username)
    with open(os.path.join(BASE_DIR, f"{username}_tiktok_videos.json"), "w", encoding="utf-8") as f:
        json.dump(videos, f, indent=2, ensure_ascii=False)
    print(f"Datos guardados en {username}_tiktok_videos.json")

if __name__ == "__main__":
    asyncio.run(main())
