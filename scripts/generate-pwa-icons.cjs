const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function createBrandedPng(width, height, isMaskable = false) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2;
  const safeMargin = isMaskable ? 0.35 : 0.42; // safe-zone radius factor

  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const idx = 1 + x * 4;
      
      // Base background color: Deep slate #090d16
      let r = 9;
      let g = 13;
      let b = 22;
      let a = 255;

      const dx = (x - cx) / width;
      const dy = (y - cy) / height;
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);

      // Subtle gradient highlight toward top-left
      const grad = Math.max(0, 1 - Math.sqrt((x / width - 0.2) ** 2 + (y / height - 0.2) ** 2));
      r = Math.min(255, Math.round(r + grad * 18));
      g = Math.min(255, Math.round(g + grad * 18));
      b = Math.min(255, Math.round(b + grad * 32));

      // Central branded rounded square / badge
      const badgeSize = isMaskable ? width * 0.55 : width * 0.65;
      const halfB = badgeSize / 2;
      const cornerR = badgeSize * 0.22;
      const bx = Math.abs(x - cx);
      const by = Math.abs(y - cy);

      let inBadge = false;
      if (bx <= halfB && by <= halfB) {
        if (bx <= halfB - cornerR || by <= halfB - cornerR) {
          inBadge = true;
        } else {
          const cornerDist = Math.sqrt((bx - (halfB - cornerR)) ** 2 + (by - (halfB - cornerR)) ** 2);
          if (cornerDist <= cornerR) {
            inBadge = true;
          }
        }
      }

      if (inBadge) {
        // Deep purple badge background (#6b21a8 to #7c3aed)
        const py = (y - (cy - halfB)) / badgeSize;
        r = Math.round(107 + py * 17);
        g = Math.round(33 + py * 25);
        b = Math.round(168 + py * 69);

        // Draw code bracket glyphs: < / > or "AB" in pixels
        const nx = (x - (cx - halfB)) / badgeSize;
        const ny = (y - (cy - halfB)) / badgeSize;

        // Left bracket '<': points (0.35, 0.3) -> (0.24, 0.5) -> (0.35, 0.7)
        // Slash '/': points (0.54, 0.3) -> (0.46, 0.7)
        // Right bracket '>': points (0.65, 0.3) -> (0.76, 0.5) -> (0.65, 0.7)
        const dLine = (px, py, x1, y1, x2, y2) => {
          const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
          if (l2 === 0) return Math.hypot(px - x1, py - y1);
          let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
          t = Math.max(0, Math.min(1, t));
          return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
        };

        const thick = 0.045;
        const dL1 = dLine(nx, ny, 0.36, 0.32, 0.23, 0.5);
        const dL2 = dLine(nx, ny, 0.23, 0.5, 0.36, 0.68);
        const dSlash = dLine(nx, ny, 0.56, 0.28, 0.44, 0.72);
        const dR1 = dLine(nx, ny, 0.64, 0.32, 0.77, 0.5);
        const dR2 = dLine(nx, ny, 0.77, 0.5, 0.64, 0.68);

        const minD = Math.min(dL1, dL2, dSlash, dR1, dR2);
        if (minD < thick) {
          // Sharp cyan highlight #38bdf8
          const alpha = Math.min(1, Math.max(0, (thick - minD) / 0.015));
          r = Math.round(r * (1 - alpha) + 56 * alpha);
          g = Math.round(g * (1 - alpha) + 189 * alpha);
          b = Math.round(b * (1 - alpha) + 248 * alpha);
        }
      }

      row[idx] = r;
      row[idx + 1] = g;
      row[idx + 2] = b;
      row[idx + 3] = a;
    }
    rawRows.push(row);
  }

  const rawData = Buffer.concat(rawRows);
  const idat = makeChunk('IDAT', zlib.deflateSync(rawData));
  const iend = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating PWA icons in', publicDir);

const icon192 = createBrandedPng(192, 192, false);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);
console.log('Created pwa-192x192.png');

const icon512 = createBrandedPng(512, 512, false);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);
console.log('Created pwa-512x512.png');

const maskable512 = createBrandedPng(512, 512, true);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), maskable512);
console.log('Created pwa-maskable-512x512.png');

const appleTouchIcon = createBrandedPng(180, 180, false);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);
console.log('Created apple-touch-icon.png');
