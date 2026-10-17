// Diff a region of two PNGs as an ASCII heat map.
// Usage: node scripts/diffascii.mjs <a.png> <b.png> <x0> <y0> <x1> <y1> [step]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [aP, bP, X0, Y0, X1, Y1, stepArg] = process.argv.slice(2);
const step = Number(stepArg ?? 4);
const a = PNG.sync.read(readFileSync(aP));
const b = PNG.sync.read(readFileSync(bP));

const x0 = +X0;
const y0 = +Y0;
const w = +X1 - x0;
const h = +Y1 - y0;

const crop = (img) => {
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const f = ((y0 + y) * img.width + (x0 + x)) << 2;
      const t = (y * w + x) << 2;
      out.data[t] = img.data[f];
      out.data[t + 1] = img.data[f + 1];
      out.data[t + 2] = img.data[f + 2];
      out.data[t + 3] = 255;
    }
  }
  return out;
};

const ca = crop(a);
const cb = crop(b);
const out = new PNG({ width: w, height: h });
const total = pixelmatch(ca.data, cb.data, out.data, w, h, {
  threshold: 0.1,
  diffColor: [255, 0, 255],
});
console.log(`region ${w}x${h} at ${x0},${y0}: ${total} (${((total / (w * h)) * 100).toFixed(2)}%)`);

const marks = " .:-=+*#%@";
const rows = [];
for (let y = 0; y < h; y += step) {
  let s = "";
  for (let x = 0; x < w; x += step) {
    let n = 0;
    let cnt = 0;
    for (let dy = 0; dy < step && y + dy < h; dy++) {
      for (let dx = 0; dx < step && x + dx < w; dx++) {
        const i = ((y + dy) * w + (x + dx)) << 2;
        if (out.data[i] === 255 && out.data[i + 1] === 0 && out.data[i + 2] === 255) n++;
        cnt++;
      }
    }
    const r = cnt ? n / cnt : 0;
    s += marks[Math.min(marks.length - 1, Math.round(r * (marks.length - 1)))];
  }
  rows.push(`${String(y0 + y).padStart(5)} ${s}`);
}
console.log(`      x from ${x0} step ${step}`);
console.log(rows.join("\n"));
