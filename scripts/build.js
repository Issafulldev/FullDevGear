#!/usr/bin/env node
/* Simple build script: minify CSS, JS, and HTML to dist/ */
const fs = require('fs');
const path = require('path');
const { minify: minifyHtml } = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const terser = require('terser');
let workboxBuild = null;

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyStatic(srcRel) {
  const src = path.join(ROOT, srcRel);
  const dest = path.join(DIST, srcRel);
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function walk(dir, exts) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {out.push(...walk(p, exts));}
    else if (!exts || exts.includes(path.extname(p))) {out.push(p);}
  }
  return out;
}

async function buildHtml() {
  const htmlFiles = ['index.html', 'terms.html', 'privacy.html']
    .filter(f => fs.existsSync(path.join(ROOT, f)));
  ensureDir(DIST);
  for (const rel of htmlFiles) {
    const src = path.join(ROOT, rel);
    const dest = path.join(DIST, rel);
    const content = fs.readFileSync(src, 'utf8');
    const min = await minifyHtml(content, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });
    fs.writeFileSync(dest, min);
  }
}

async function buildCss() {
  const cssDir = path.join(ROOT, 'styles');
  if (!fs.existsSync(cssDir)) {return;}
  const files = walk(cssDir, ['.css']);
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const dest = path.join(DIST, rel);
    ensureDir(path.dirname(dest));
    const css = fs.readFileSync(file, 'utf8');
    const output = new CleanCSS({ level: 2 }).minify(css).styles;
    fs.writeFileSync(dest, output);
  }
}

async function buildJs() {
  const jsDir = path.join(ROOT, 'scripts');
  if (!fs.existsSync(jsDir)) {return;}
  const files = walk(jsDir, ['.js']);
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const dest = path.join(DIST, rel);
    ensureDir(path.dirname(dest));
    const code = fs.readFileSync(file, 'utf8');
    const min = await terser.minify(code, { module: true });
    fs.writeFileSync(dest, min.code || code);
  }
}

async function copyAssets() {
  const assetsDir = path.join(ROOT, 'assets');
  if (!fs.existsSync(assetsDir)) {return;}
  const files = walk(assetsDir);
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const dest = path.join(DIST, rel);
    ensureDir(path.dirname(dest));
    fs.copyFileSync(file, dest);
  }
  if (fs.existsSync(path.join(ROOT, 'manifest.webmanifest'))) {
    copyStatic('manifest.webmanifest');
  }
  // Copy SW if present (legacy/manual). Workbox generateSW will overwrite in dist.
  if (fs.existsSync(path.join(ROOT, 'sw.js'))) {
    copyStatic('sw.js');
  }
}

async function main() {
  const target = process.argv[2] || 'all';
  ensureDir(DIST);
  if (target === 'all' || target === 'html') {await buildHtml();}
  if (target === 'all' || target === 'css') {await buildCss();}
  if (target === 'all' || target === 'js') {await buildJs();}
  if (target === 'all') {await copyAssets();}
  // Generate Workbox service worker with precache of dist assets
  try {
    // Lazy-require to avoid hard dependency during dev if not installed
    workboxBuild = workboxBuild || require('workbox-build');
    await workboxBuild.generateSW({
      globDirectory: DIST,
      globPatterns: ['**/*.{html,js,css,webmanifest,svg,png,webp,jpg,jpeg,gif}'],
      swDest: path.join(DIST, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'images',
            expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'static-resources' },
        },
      ],
      navigateFallback: 'index.html',
    });
    console.log('Workbox service worker generated → dist/sw.js');
  } catch (err) {
    console.warn('Workbox not installed or failed to generate SW. Skipping PWA generation.\n', err?.message || err);
  }
  console.log('Build complete → dist/');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


