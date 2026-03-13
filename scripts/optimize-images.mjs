#!/usr/bin/env node
/**
 * Оптимизация изображений в src/assets — без потери качества.
 * Правила: max 1200px по длинной стороне, quality 92 (WebP/JPEG), 85 (AVIF).
 *
 * Запуск: pnpm optimize:images
 * Автоматически: перед pnpm build (prebuild)
 */

import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = join(process.cwd(), 'src', 'assets');
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 92;
const AVIF_QUALITY = 85;
const JPEG_QUALITY = 92;

// Исключения: мелкие логотипы, hero/welcome/corp (полноэкранные), tours (карточки — макс. чёткость)
const SKIP_PATTERNS = [
  /favicon\.(png|ico)$/i,
  /partners\//,
  /hero\//,
  /welcome\//,
  /corp\//,
  /tours\//,
];

async function getAllImages(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await getAllImages(fullPath, files);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.webp', '.jpg', '.jpeg', '.png', '.avif'].includes(ext)) {
        const relative = fullPath.replace(process.cwd(), '').replace(/^\//, '');
        if (!SKIP_PATTERNS.some((p) => p.test(relative))) {
          files.push(fullPath);
        }
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const { size: origSize } = await stat(filePath);
  const ext = extname(filePath).toLowerCase();
  const meta = await sharp(filePath).metadata();
  const { width, height } = meta;

  const needsResize = width > MAX_WIDTH || height > MAX_WIDTH;
  if (!needsResize && origSize < 80_000) {
    return null;
  }

  let pipeline = sharp(filePath);
  if (needsResize) {
    pipeline = pipeline.resize(MAX_WIDTH, MAX_WIDTH, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  let buffer;
  switch (ext) {
    case '.avif':
      buffer = await pipeline.avif({ quality: AVIF_QUALITY }).toBuffer();
      break;
    case '.jpg':
    case '.jpeg':
      buffer = await pipeline.jpeg({ quality: JPEG_QUALITY }).toBuffer();
      break;
    case '.png':
      buffer = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
      break;
    default:
      buffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
  }

  const newSize = buffer.length;
  if (newSize >= origSize) return null;

  const fs = await import('node:fs/promises');
  await fs.writeFile(filePath, buffer);

  return {
    path: filePath,
    origSize,
    newSize,
    saved: ((1 - newSize / origSize) * 100).toFixed(1),
  };
}

async function main() {
  const images = await getAllImages(ASSETS_DIR);
  console.log(`Найдено изображений: ${images.length}`);

  const results = [];
  for (const img of images) {
    try {
      const r = await optimizeImage(img);
      if (r) results.push(r);
    } catch (err) {
      console.warn(`⚠ ${img}: ${err.message}`);
    }
  }

  // OG image 1200×630 для соцсетей (из hero)
  const heroPath = join(ASSETS_DIR, 'hero', 'plane.avif');
  const ogPath = join(process.cwd(), 'public', 'og-image.jpg');
  try {
    await sharp(heroPath)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toFile(ogPath);
    console.log('OG image: public/og-image.jpg (1200×630)');
  } catch (e) {
    console.warn('⚠ OG image:', e.message);
  }

  if (results.length === 0) {
    console.log('Все изображения уже оптимизированы.');
    return;
  }

  console.log(`\nОптимизировано: ${results.length}`);
  let totalSaved = 0;
  for (const r of results) {
    totalSaved += r.origSize - r.newSize;
    console.log(
      `  ${r.path.replace(process.cwd(), '')}: ${(r.origSize / 1024).toFixed(0)} KB → ${(r.newSize / 1024).toFixed(0)} KB (−${r.saved}%)`
    );
  }
  console.log(`\nВсего сэкономлено: ${(totalSaved / 1024).toFixed(0)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
