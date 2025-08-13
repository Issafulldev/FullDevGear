#!/usr/bin/env node
/**
 * Optimize images to WebP using Sharp
 * Usage:
 *   node scripts/optimize-images-run.js --optimize
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CONFIG = {
  maxWidth: 1200,
  quality: 80,
  directories: ['assets/images', 'assets/projects'],
};

async function* walk(dir) {
  let entries = [];
  try {
    entries = await fs.promises.readdir(dir, { withFileTypes: true });
  } catch (_) {
    return;
  }
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

function isRaster(p) {
  return /\.(png|jpe?g)$/i.test(p);
}

async function optimizeFile(file, outDir = null) {
  const parsed = path.parse(file);
  const outBase = path.join(outDir || parsed.dir, `${parsed.name}-optimized.webp`);
  await sharp(file)
    .resize({ width: CONFIG.maxWidth, withoutEnlargement: true })
    .webp({ quality: CONFIG.quality })
    .toFile(outBase);
  return outBase;
}

async function optimizeAll() {
  let optimized = 0;
  for (const dir of CONFIG.directories) {
    const abs = path.resolve(process.cwd(), dir);
    for await (const file of walk(abs)) {
      if (!isRaster(file)) {continue;}
      const out = await optimizeFile(file);
      console.log(`Optimized: ${path.relative(process.cwd(), file)} → ${path.relative(process.cwd(), out)}`);
      optimized++;
    }
  }
  console.log(`\n✅ Done. Files optimized: ${optimized}`);
}

async function main() {
  if (process.argv.includes('--optimize')) {
    await optimizeAll();
  } else {
    console.log('Run with `--optimize` to generate optimized WebP images.');
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { optimizeAll, CONFIG };


