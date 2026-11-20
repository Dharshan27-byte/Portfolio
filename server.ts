import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = '0.0.0.0';
const ASSETS_ROOT = path.resolve(__dirname, 'portfolio assets');
const PORTRAIT_PATH = path.join(
  ASSETS_ROOT,
  'all cetrificates',
  'spring bord cetrificates',
  'IDENTITIES',
  'PHOTO.jpg'
);

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
};

function isSafePortfolioAsset(relativePath: string): boolean {
  const normalized = path.posix.normalize(relativePath).replace(/^\/+/, '');
  if (!normalized || normalized.startsWith('..') || normalized.includes('\0')) {
    return false;
  }
  const segments = normalized.split('/').map((s) => s.toLowerCase());
  if (segments.includes('identities')) {
    return false;
  }
  const ext = path.extname(normalized).toLowerCase();
  return ext in MIME_TYPES;
}

async function createServer() {
  const app = express();

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', assetsAvailable: fs.existsSync(ASSETS_ROOT) });
  });

  app.get('/api/portrait', (_req, res) => {
    if (!fs.existsSync(PORTRAIT_PATH)) {
      res.status(404).json({ error: 'Portrait not found' });
      return;
    }
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(PORTRAIT_PATH);
  });

  app.get('/portfolio-files/{*assetPath}', (req, res) => {
    const rawParam = req.params.assetPath;
    const joined = Array.isArray(rawParam) ? rawParam.join('/') : rawParam;
    const decoded = decodeURIComponent(joined || '');

    if (!isSafePortfolioAsset(decoded)) {
      res.status(403).json({ error: 'Access restricted or unsupported asset type' });
      return;
    }

    const resolved = path.resolve(ASSETS_ROOT, decoded);
    if (!resolved.startsWith(ASSETS_ROOT + path.sep) || !fs.existsSync(resolved)) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }

    const ext = path.extname(resolved).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileName = path.basename(resolved);
    const forceDownload = req.query.download === '1';

    res.setHeader('Content-Type', mimeType);
    res.setHeader(
      'Content-Disposition',
      `${forceDownload ? 'attachment' : 'inline'}; filename="${fileName.replace(/"/g, '')}"`
    );
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(resolved);
  });

  const distDir = path.resolve(__dirname, 'dist');
  const isProduction = process.env.NODE_ENV === 'production' && fs.existsSync(distDir);

  if (isProduction) {
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Portfolio server running at http://${HOST}:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
