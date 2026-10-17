// Count pixel mismatches inside named rectangles.
// Usage: node scripts/regions.mjs <a.png> <b.png> "x0 y0 x1 y1 name" ...
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [aPath, bPath, ...rects] = process.argv.slice(2);
const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));
const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);

const na = new PNG({ width: w, height: h }), nb = new PNG({ width: w, height: h });
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    const f = (a.width * y + x) << 2, t = (w * y + x) << 2;
    na.data[t] = a.data[f]; na.data[t + 1] = a.data[f + 1]; na.data[t + 2] = a.data[f + 2]; na.data[t + 3] = a.data[f + 3];
    const g = (b.width * y + x) << 2;
    nb.data[t] = b.data[g]; nb.data[t + 1] = b.data[g + 1]; nb.data[t + 2] = b.data[g + 2]; nb.data[t + 3] = b.data[g + 3];
  }

const diff = new PNG({ width: w, height: h });
const total = pixelmatch(na.data, nb.data, diff.data, w, h, { threshold: 0.1, includeAA: false });
console.log(`TOTAL ${total} (${((total / (w * h)) * 100).toFixed(3)}%)`);

const bad = (x, y) => { const i = (w * y + x) << 2; return diff.data[i] > 200 && diff.data[i + 1] < 80; };

for (const r of rects) {
  const p = r.trim().split(/\s+/);
  const [x0, y0, x1, y1] = p.slice(0, 4).map(Number);
  const name = p.slice(4).join(" ") || `${x0},${y0}-${x1},${y1}`;
  let n = 0;
  for (let y = Math.max(0, y0); y < Math.min(h, y1); y++)
    for (let x = Math.max(0, x0); x < Math.min(w, x1); x++) if (bad(x, y)) n++;
  const area = (Math.min(h, y1) - Math.max(0, y0)) * (Math.min(w, x1) - Math.max(0, x0));
  console.log(`  ${String(n).padStart(6)} / ${String(area).padStart(7)} (${((n / area) * 100).toFixed(2)}%)  ${name}`);
}
