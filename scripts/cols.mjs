// Per-column ink profile for a region, two images side by side.
// Usage: node scripts/cols.mjs <a.png> <b.png> <x0> <y0> <x1> <y1> [step]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [aPath, bPath, x0, y0, x1, y1, stepArg] = process.argv.slice(2);
const X0 = Number(x0), Y0 = Number(y0), X1 = Number(x1), Y1 = Number(y1);
const step = Number(stepArg ?? 4);
const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));

function ink(img, x) {
  let n = 0;
  for (let y = Y0; y < Y1; y++) {
    const i = (img.width * y + x) << 2;
    const lum = img.data[i] * 0.299 + img.data[i + 1] * 0.587 + img.data[i + 2] * 0.114;
    if (lum < 200) n++;
  }
  return n;
}

let sa = 0, sb = 0;
const rows = [];
for (let x = X0; x < X1; x += step) {
  const ia = ink(a, x), ib = ink(b, x);
  sa += ia;
  sb += ib;
  rows.push(`${String(x).padStart(5)} ${String(ia).padStart(3)}/${String(ib).padStart(3)} ${"#".repeat(Math.min(30, ia))}|${"#".repeat(Math.min(30, ib))}`);
}
console.log(rows.join("\n"));
console.log(`TOTAL sampled ink  MINE ${sa}  FIGMA ${sb}   (${(((sa - sb) / sb) * 100).toFixed(1)}%)`);
