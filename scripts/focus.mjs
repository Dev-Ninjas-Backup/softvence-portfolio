// Histogram of mismatched pixels by x/y bucket, to localise diffs.
// Usage: node scripts/focus.mjs <a.png> <b.png> [xBucket] [yBucket]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [aPath, bPath, xbArg, ybArg] = process.argv.slice(2);
const xb = Number(xbArg ?? 40);
const yb = Number(ybArg ?? 20);

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
pixelmatch(na.data, nb.data, diff.data, w, h, { threshold: 0.1, includeAA: false });

const bad = (i) => diff.data[i] > 200 && diff.data[i + 1] < 80;
const xh = {}, yh = {};
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    const i = (w * y + x) << 2;
    if (bad(i)) {
      xh[Math.floor(x / xb) * xb] = (xh[Math.floor(x / xb) * xb] || 0) + 1;
      yh[Math.floor(y / yb) * yb] = (yh[Math.floor(y / yb) * yb] || 0) + 1;
    }
  }
console.log(`X histogram (bucket ${xb}px):`);
for (const k of Object.keys(xh).map(Number).sort((p, q) => p - q)) console.log(`  x ${String(k).padStart(4)}-${k + xb - 1}: ${xh[k]}`);
console.log(`Y histogram (bucket ${yb}px):`);
for (const k of Object.keys(yh).map(Number).sort((p, q) => p - q)) console.log(`  y ${String(k).padStart(4)}-${k + yb - 1}: ${yh[k]}`);
