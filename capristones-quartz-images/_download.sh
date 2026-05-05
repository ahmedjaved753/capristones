#!/usr/bin/env bash
# Download all quartz product images from capristones.com.
# - Reads slug list (built from listing page crawl).
# - For each slug, fetches /product/<slug>, extracts H1 product name + og:image (full-res).
# - Writes image to capristones-quartz-images/<slug>.<ext> and appends manifest.csv.
set -euo pipefail

OUT_DIR="$(cd "$(dirname "$0")" && pwd)"
MANIFEST="$OUT_DIR/manifest.csv"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'

SLUGS=(
  venetian-white
  calacatta-negro
  rio-light
  calacatta-gold
  calacatta-gold-lq
  carrara-riva
  8130
  placid
  idyllic
  artic-gray
  intricate
  steel-gray
  integrity
  argento
  dreamy
  urban
  avenza
  8038
  8083
  1001 1002 1003 1004 1005 1006 1007 1008 1009 1010
)

echo "slug,product_name,image_url,saved_as,status" > "$MANIFEST"

for slug in "${SLUGS[@]}"; do
  url="https://capristones.com/product/${slug}"
  html=$(curl -fsSL -A "$UA" "$url" || curl -fsSL -A "$UA" "${url}/" || true)
  if [[ -z "$html" ]]; then
    echo "$slug,,,,FETCH_FAIL" >> "$MANIFEST"
    echo "[FAIL] $slug — could not fetch detail page" >&2
    continue
  fi

  # Product name: prefer og:title, fallback to H1
  name=$(printf '%s' "$html" | grep -oE 'property="og:title" content="[^"]+"' | head -1 | sed -E 's/.*content="([^"]+)".*/\1/' | sed 's/ - capri stones.*//')
  if [[ -z "$name" ]]; then
    name=$(printf '%s' "$html" | grep -oE '<h1[^>]*product_title[^>]*>[^<]+</h1>' | head -1 | sed -E 's/<[^>]+>//g')
  fi

  # Full-res image: WooCommerce gallery's first data-large_image (most reliable)
  img=$(printf '%s' "$html" | grep -oE 'data-large_image="https://capristones\.com/wp-content/uploads/[^"]+"' | head -1 | sed -E 's/.*"(https[^"]+)".*/\1/')
  if [[ -z "$img" ]]; then
    # Fallback 1: og:image
    img=$(printf '%s' "$html" | grep -oE 'property="og:image" content="[^"]+"' | head -1 | sed -E 's/.*content="([^"]+)".*/\1/')
  fi
  if [[ -z "$img" ]]; then
    # Fallback 2: first scaled.jpg under uploads
    img=$(printf '%s' "$html" | grep -oE 'https://capristones\.com/wp-content/uploads/[0-9]{4}/[0-9]{2}/[^"]*-scaled\.(jpg|png|jpeg)' | head -1)
  fi
  if [[ -z "$img" ]]; then
    echo "$slug,\"$name\",,,NO_IMAGE_FOUND" >> "$MANIFEST"
    echo "[FAIL] $slug — no image URL" >&2
    continue
  fi

  ext="${img##*.}"
  ext="${ext%%\?*}"
  out="$OUT_DIR/${slug}.${ext}"

  if curl -fsSL -A "$UA" -o "$out" "$img"; then
    bytes=$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out")
    echo "$slug,\"$name\",$img,${slug}.${ext},OK_${bytes}b" >> "$MANIFEST"
    echo "[ OK ] $slug → ${slug}.${ext} (${bytes} bytes)  [$name]"
  else
    echo "$slug,\"$name\",$img,,DOWNLOAD_FAIL" >> "$MANIFEST"
    echo "[FAIL] $slug — image download failed: $img" >&2
  fi
done

echo
echo "Manifest written to: $MANIFEST"
