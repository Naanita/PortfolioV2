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

# --- CONFIGURACIÓN ---
VIDEOS_A_PROCESAR = [
        "https://www.tiktok.com/@hikvisionlatam/video/7516918173078228229",
        "https://www.tiktok.com/@hikvisionlatam/video/7498116270617857335",
        "https://www.tiktok.com/@hikvisionlatam/video/7491838741091192119",
        "https://www.tiktok.com/@hikvisionlatam/video/7510300279997320454",
        "https://www.tiktok.com/@hikvisionlatam/video/7502229067761093893",
]

# Define el nombre de usuario para organizar los archivos.
USERNAME = "hikvisionlatam"
DOWNLOAD_VIDEOS = True 

# Configuración de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- DEFINICIÓN DE RUTAS Y DIRECTORIOS ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COOKIE_FILE = os.path.join(BASE_DIR, "cookies.json")
IMAGES_DIR = os.path.join(BASE_DIR, "images")
os.makedirs(IMAGES_DIR, exist_ok=True)



def ajustar_ruta_local_filename(ruta_absoluta, username):
    """Ajusta la ruta de un archivo local para que sea relativa al usuario."""
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
    """Pausa aleatoria para simular comportamiento humano."""
    import random
    await asyncio.sleep(random.uniform(min_seconds, max_seconds))

async def save_cookies(context):
    """Guarda las cookies del navegador en un archivo JSON."""
    try:
        cookies = await context.cookies()
        with open(COOKIE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cookies, f, ensure_ascii=False, indent=2)
        logging.info("Cookies guardadas exitosamente.")
    except Exception as e:
        logging.error(f"Error al guardar las cookies: {e}")

async def load_cookies(context):
    """Carga las cookies desde un archivo JSON al navegador."""
    if os.path.exists(COOKIE_FILE):
        try:
            with open(COOKIE_FILE, 'r', encoding='utf-8') as f:
                cookies = json.load(f)
            await context.add_cookies(cookies)
            logging.info("Cookies cargadas exitosamente.")
            return True
        except Exception as e:
            logging.error(f"Error al cargar las cookies: {e}")
    return False

async def handle_captcha(page):
    """Maneja diálogos de CAPTCHA o banners de cookies que puedan aparecer."""
    try:
        omitir_btn = page.locator("button", has_text="Omitir")
        if await omitir_btn.count() and await omitir_btn.is_visible():
            logging.info("Botón 'Omitir' encontrado, haciendo clic.")
            await omitir_btn.click()
            await asyncio.sleep(2)
        
        dialog = page.locator('div[role="dialog"]')
        if await dialog.count() and await dialog.is_visible():
            logging.warning("Diálogo de CAPTCHA/verificación detectado. Esperando...")
            await page.wait_for_selector('div[role="dialog"]', state='detached', timeout=300000)
            logging.info("El diálogo ha desaparecido.")
            
    except Exception as e:
        logging.warning(f"No se pudo manejar el CAPTCHA o banner automáticamente: {e}")


# --- FUNCIÓN DE EXTRACCIÓN ---
async def extract_video_info(page, video_url):
    """Extrae la información detallada de un video de TikTok usando los selectores originales."""
    await page.goto(video_url, wait_until="networkidle")
    await random_sleep(2, 4)
    await handle_captcha(page)

    # Extraer descripción y hashtags
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
        return { description: desc.trim(), hashtags: [...new Set(tags)] }; // Usa Set para eliminar duplicados
    }
    """)
    description = desc_data['description']
    hashtags = desc_data['hashtags']
    first_tag = hashtags[0] if hashtags else ''

    # Extraer likes, comentarios, etc.
    video_info_selectors = await page.evaluate("""
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
            musicTitle: get(['.css-pvx3oa-DivMusicText', 'h4[data-e2e="music-title"]']),
            date: get(['span[data-e2e="browser-nickname"] span:last-child'])
        };
    }
    """)
    
    # Extraer vistas
    views = await page.evaluate("""
        () => {
            const v = document.querySelector('strong[data-e2e="video-views"]');
            return v ? v.textContent.trim() : 'N/A';
        }
    """)

    # Combina toda la información del video
    video_info = {
        'url': video_url,
        'views': views,
        'description': description,
        'hashtags': hashtags,
        'first_hashtag': first_tag,
        'timestamp': datetime.now().isoformat(),
        **video_info_selectors
    }

    # --- BLOQUE THUMBNAIL ---
    try:
        vid_id = video_url.rstrip('/').split('/video/')[1].split('?')[0]
        thumb_src = await page.evaluate("""
        () => {
            const pic_img = document.querySelector('div.css-1e263gw-StyledVideoBlurBackground picture img');
            return pic_img ? pic_img.src : null;
        }
        """)
        if thumb_src:
            logging.info(f"URL de thumbnail encontrada: {thumb_src}")
            resp = requests.get(thumb_src, timeout=10)
            resp.raise_for_status()
            img = Image.open(BytesIO(resp.content)).convert('RGB')
            
            quality = 80
            buf = BytesIO()
            img.save(buf, format='WEBP', quality=quality)
            while buf.tell() > 300 * 1024 and quality > 10:
                quality -= 10
                buf = BytesIO()
                img.save(buf, format='WEBP', quality=quality)
            
            filename = f"{vid_id}_poster.webp"
            path = os.path.join(IMAGES_DIR, filename)
            with open(path, 'wb') as f:
                f.write(buf.getvalue())
            video_info['thumbnail_url'] = f"/images/{filename}"
            logging.info(f"Thumbnail optimizado guardado en {path} (Tamaño: {buf.tell() / 1024:.2f} KB)")
        else:
            logging.warning("No se encontró la imagen de la miniatura con el selector original.")
            video_info['thumbnail_url'] = None
    except Exception as e:
        logging.error(f"Error al procesar el thumbnail para {video_url}: {e}")
        video_info['thumbnail_url'] = None

    return video_info

def download_tiktok_video(video_url, save_path):
    """Descarga un video de TikTok usando yt-dlp."""
    opts = {
        'outtmpl': os.path.join(save_path, '%(id)s.%(ext)s'),
        'format': 'best',
        'quiet': True,
        'noplaylist': True,
        'cookiefile': COOKIE_FILE if os.path.exists(COOKIE_FILE) else None
    }
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            fn = ydl.prepare_filename(info)
            logging.info(f"Video descargado: {fn}")
            return fn
    except Exception as e:
        logging.error(f"Error descargando video {video_url}: {e}")
        return None

# --- FUNCIÓN PRINCIPAL DE SCRAPING ---
async def scrape_videos_especificos(video_urls, username):
    """Orquesta el proceso de scraping para una lista específica de URLs."""
    resultados_finales = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        )
        await load_cookies(context)
        page = await context.new_page()
        
        for url in video_urls:
            logging.info(f"--- Procesando video: {url} ---")
            try:
                info = await extract_video_info(page, url)
                
                if DOWNLOAD_VIDEOS:
                    video_save_dir = os.path.join(BASE_DIR, username)
                    os.makedirs(video_save_dir, exist_ok=True)
                    archivo_local = download_tiktok_video(url, video_save_dir)
                    if archivo_local:
                        info['local_filename'] = ajustar_ruta_local_filename(archivo_local, username)
                
                resultados_finales.append(info)
                logging.info(f"Información extraída exitosamente para {url}")

            except Exception as e:
                logging.error(f"FALLO al procesar la URL {url}: {e}", exc_info=True)
            
            await random_sleep(3, 6)

        await save_cookies(context)
        await browser.close()
        
    return resultados_finales

# --- PUNTO DE ENTRADA DEL SCRIPT ---
async def main():
    """Función que ejecuta el proceso completo."""
    logging.info(f"Iniciando scraping para {len(VIDEOS_A_PROCESAR)} video(s) del usuario '{USERNAME}'.")
    
    videos_data = await scrape_videos_especificos(VIDEOS_A_PROCESAR, USERNAME)
    
    if videos_data:
        out_file_path = os.path.join(BASE_DIR, f"{USERNAME}_tiktok_videos.json")
        with open(out_file_path, 'w', encoding='utf-8') as f:
            json.dump(videos_data, f, indent=2, ensure_ascii=False)
        print(f"\n¡Proceso completado! Datos de {len(videos_data)} videos guardados en: {out_file_path}")
    else:
        print("\nNo se pudo extraer información de ningún video.")

if __name__ == "__main__":
    asyncio.run(main())