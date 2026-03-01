const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 4200;
const ROOT = path.join(__dirname, 'dist/hazemportfolio-frontend/browser');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.glb': 'model/gltf-binary',
};

const server = http.createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);

    if (!fs.existsSync(filePath)) {
        filePath = path.join(ROOT, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const raw = fs.readFileSync(filePath);

    // Cache headers for hashed assets
    if (filePath.match(/\.[a-f0-9]{8}\./)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Only gzip compressible content types
    const compressible = ['.html', '.js', '.css', '.json', '.svg', '.txt'];
    if (compressible.includes(ext) && acceptEncoding.includes('gzip')) {
        res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'gzip' });
        res.end(zlib.gzipSync(raw));
    } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(raw);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/ with gzip compression`);
});
