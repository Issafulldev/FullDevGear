#!/usr/bin/env bash
set -euo pipefail

# Requires: sharp-cli (npm i -g sharp-cli)

opt_dir() {
  local dir="$1"
  find "$dir" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r img; do
    local base="${img%.*}"
    local out="${base}-optimized.webp"
    echo "Optimizing: $img -> $out"
    sharp -i "$img" -o "$out" --resize 1200 --webp-quality 80
  done
}

opt_dir assets/images || true
opt_dir assets/projects || true

echo "Done."


