// Report pixel-mismatch counts per horizontal band (and optionally per cell).
// Usage: node scripts/bands.mjs <a.png> <b.png> [bandHeight] [threshold]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [aPath, bPath, bandArg, thrArg] = process.argv.slice(2);
const band = Number(bandArg ?? 100);
const threshold = Number(thrArg ?? 0.1);

const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));
const w = Math.min(a.width, b.width);
const h = Math.min(a.height, b.height);

const norm = (img) => {
  if (img.width === w && img.height === h) return img;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const f = (img.width * y + x) << 2;
      const t = (w * y + x) << 2;
      out.data[t] = img.data[f];
      out.data[t + 1] = img.data[f + 1];
      out.data[t + 2] = img.data[f + 2];
      out.data[t + 3] = img.data[f + 3];
    }
  return out;
};

const na = norm(a), nb = norm(b);
const diff = new PNG({ width: w, height: h });
const total = pixelmatch(na.data, nb.data, diff.data, w, h, { threshold, includeAA: false });
console.log(`${aPath} vs ${bPath}: total ${total} (${((total / (w * h)) * 100).toFixed(3)}%)`);
for (let y0 = 0; y0 < h; y0 += band) {
  const y1 = Math.min(y0 + band, h);
  let bad = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < w; x++) {
      const i = (w * y + x) << 2;
      if (diff.data[i] > 200 && diff.data[i + 1] < 80) bad++;
    }
  const pct = (bad / (w * (y1 - y0))) * 100;
  const bar = "#".repeat(Math.round(pct / 2));
  console.log(`y ${String(y0).padStart(4)}-${String(y1).padStart(4)}: ${String(bad).padStart(6)} (${pct.toFixed(2)}%) ${bar}`);
}
