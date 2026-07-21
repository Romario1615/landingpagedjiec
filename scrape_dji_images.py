#!/usr/bin/env python3
import hashlib
import os
import re
import ssl
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import Request, urlopen

URL = "https://www.dji.com/"
OUTPUT_DIR = Path(__file__).resolve().parent / "assets" / "dji-images"
MAX_IMAGES = 20
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp"}


class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attr_map = dict(attrs)
        if tag == "img":
            self._add_candidate(attr_map.get("src"))
            self._add_candidate(attr_map.get("data-src"))
            self._add_candidate(attr_map.get("data-srcset"))
            self._add_candidate(attr_map.get("srcset"))

        style = attr_map.get("style")
        if style:
            for match in re.finditer(r"url\((['\"]?)([^'\")]+)\1\)", style):
                self._add_candidate(match.group(2))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def _add_candidate(self, value):
        if not value:
            return
        if value.startswith("data:"):
            return
        if "," in value and (".jpg" in value or ".png" in value or ".webp" in value or ".jpeg" in value):
            for part in value.split(","):
                candidate = part.strip().split()[0]
                if candidate:
                    self.urls.append(candidate)
            return
        self.urls.append(value)


def fetch_html(url: str) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    }
    request = Request(url, headers=headers)
    context = ssl.create_default_context()
    with urlopen(request, context=context, timeout=30) as response:
        return response.read().decode("utf-8", errors="ignore")


def sanitize_name(url: str, fallback: str = "image") -> str:
    parsed = urlparse(url)
    path = unquote(parsed.path or "")
    name = os.path.basename(path) or fallback
    stem, ext = os.path.splitext(name)
    ext = ext.lower()
    if ext not in ALLOWED_EXTENSIONS:
        ext = ".jpg"
    safe_stem = re.sub(r"[^a-zA-Z0-9._-]+", "-", stem or fallback).strip("-") or fallback
    digest = hashlib.md5(url.encode("utf-8")).hexdigest()[:8]
    return f"{safe_stem}-{digest}{ext}"


def normalize_url(url: str, base_url: str) -> str | None:
    if not url:
        return None
    url = url.strip()
    if url.startswith("data:"):
        return None
    if url.startswith("//"):
        url = "https:" + url
    elif url.startswith("/"):
        url = urljoin(base_url, url)
    elif not url.startswith(("http://", "https://")):
        url = urljoin(base_url, url)
    return url


def download_image(url: str, output_dir: Path) -> str | None:
    normalized = normalize_url(url, URL)
    if not normalized:
        return None

    parsed = urlparse(normalized)
    if parsed.scheme not in {"http", "https"}:
        return None

    target_path = output_dir / sanitize_name(normalized)
    if target_path.exists():
        return str(target_path)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    }
    request = Request(normalized, headers=headers)
    try:
        with urlopen(request, context=ssl.create_default_context(), timeout=30) as response:
            content_type = response.headers.get("Content-Type", "")
            if "image" not in content_type and not any(normalized.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp"]):
                return None
            data = response.read()
    except Exception as exc:
        print(f"No se pudo descargar {normalized}: {exc}")
        return None

    if not data:
        return None

    target_path.write_bytes(data)
    return str(target_path)


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Descargando imágenes desde {URL}")
    html = fetch_html(URL)
    parser = ImageParser()
    parser.feed(html)

    seen = set()
    downloaded = []
    for candidate in parser.urls:
        normalized = normalize_url(candidate, URL)
        if not normalized:
            continue
        if normalized in seen:
            continue
        seen.add(normalized)
        if len(downloaded) >= MAX_IMAGES:
            break
        saved = download_image(normalized, OUTPUT_DIR)
        if saved:
            downloaded.append(saved)
            print(f"✓ {saved}")

    manifest_path = OUTPUT_DIR / "manifest.txt"
    manifest_path.write_text("\n".join(downloaded) + "\n", encoding="utf-8")
    print(f"\nSe descargaron {len(downloaded)} imágenes en {OUTPUT_DIR}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
