#!/usr/bin/env node
/**
 * Generate PWA icons (192/512 and maskable 192) from source logo
 */
const path = require('path');
const fs = require('fs');

let sharp = null;
try {
  sharp = require('sharp');
} catch (error) {
  sharp = null;
}
const spawn = require('child_process').spawn;
const os = require('os');

const SRC = path.resolve(__dirname, '..', 'assets', 'logos', 'logosite.PNG');
const OUT_DIR = path.resolve(__dirname, '..', 'assets', 'logos');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true }).catch(() => { });
}

async function generateWithSharp() {
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
        .composite([
          {
            input: await sharp(SRC)
              .resize(size - padding * 2, size - padding * 2, { fit: 'contain' })
              .png()
              .toBuffer(),
            left: padding,
            top: padding,
          },
        ])
        .png();
    }
    await img.toFile(path.join(OUT_DIR, file));
    console.log('Generated', file);
  });

  await Promise.all(tasks);
}

function runSips(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('sips', args, { stdio: 'ignore' });
    proc.on('close', (code) => {
      if (code === 0) { resolve(); }
      else { reject(new Error(`sips exited with code ${code}`)); }
    });
    proc.on('error', reject);
  });
}

async function generateWithSips() {
  const tasks = [
    { file: 'icon-192.png', size: 192 },
    { file: 'icon-512.png', size: 512 },
    { file: 'icon-180.png', size: 180 },
    { file: 'icon-192-maskable.png', size: 192, maskable: true },
    { file: 'icon-512-maskable.png', size: 512, maskable: true },
  ];

  await ensureDir(OUT_DIR);

  const PADDING_RATIO = 0.1;
  const PAD_COLOR = '00000000';

  for (const { file, size, maskable } of tasks) {
    const outPath = path.join(OUT_DIR, file);

    if (!maskable) {
      await runSips(['-z', String(size), String(size), SRC, '--out', outPath]);
      console.log('Generated (sips)', file);
      continue;
    }

    const innerSize = Math.max(1, Math.round(size * (1 - PADDING_RATIO * 2)));
    const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'fdg-icons-'));
    const tmpFile = path.join(tmpDir, `mask-${file}`);

    try {
      await runSips(['-z', String(innerSize), String(innerSize), SRC, '--out', tmpFile]);
      await runSips(['--padToHeightWidth', String(size), String(size), tmpFile, '--padColor', 'FFFFFF', '--out', outPath]); // sips ne supporte pas le transparent
      console.log('Generated (sips maskable)', file);
    } finally {
      await fs.promises.rm(tmpDir, { recursive: true, force: true }).catch(() => { });
    }
  }
}

async function main() {
  if (sharp) {
    await generateWithSharp();
    return;
  }

  const platform = process.platform;
  if (platform === 'darwin') {
    console.warn('sharp module unavailable; using macOS sips as fallback.');
    try {
      await generateWithSips();
    } catch (error) {
      console.error('Failed to generate icons with sips. Please ensure the tool is available.', error);
      process.exit(1);
    }
  } else {
    console.error('sharp module unavailable and no fallback available. Please install sharp or upgrade Node.js.');
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


