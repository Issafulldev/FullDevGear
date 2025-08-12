#!/usr/bin/env node
/**
 * Generate PWA icons (192/512 and maskable 192) from source logo
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const SRC = path.resolve(__dirname, '..', 'assets', 'logos', 'logosite.PNG');
const OUT_DIR = path.resolve(__dirname, '..', 'assets', 'logos');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true }).catch(() => { });
}

async function main() {
  await ensureDir(OUT_DIR);
  const tasks = [
    { file: 'icon-192.png', size: 192 },
    { file: 'icon-512.png', size: 512 },
    { file: 'icon-192-maskable.png', size: 192, maskable: true },
    { file: 'icon-512-maskable.png', size: 512, maskable: true },
    { file: 'icon-180.png', size: 180 }, // Apple touch icon
  ].map(async ({ file, size, maskable }) => {
    let img = sharp(SRC).resize(size, size, { fit: 'cover' }).png();
    if (maskable) {
      // Add safe padding for maskable area
      const padding = Math.round(size * 0.1);
      img = sharp({
        create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      })
        .composite([{ input: await sharp(SRC).resize(size - padding * 2, size - padding * 2, { fit: 'contain' }).png().toBuffer(), left: padding, top: padding }])
        .png();
    }
    await img.toFile(path.join(OUT_DIR, file));
    console.log('Generated', file);
  });

  await Promise.all(tasks);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


