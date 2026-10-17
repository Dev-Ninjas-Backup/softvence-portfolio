// Trace non-background ink in a region: for each x column print the y-range of ink.
// Usage: node scripts/trace.mjs <png> <x0> <y0> <x1> <y1> <xstep> [bgHex] [tol]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [p, X0, Y0, X1, Y1, STEP, bgHex = "F6F8F6", tolArg = 12] = process.argv.slice(2);
const img = PNG.sync.read(readFileSync(p));
const x0 = +X0;
const y0 = +Y0;
const x1 = +X1;
const y1 = +Y1;
const step = +STEP;
const tol = +tolArg;
const bg = [parseInt(bgHex.slice(0, 2), 16), parseInt(bgHex.slice(2, 4), 16), parseInt(bgHex.slice(4, 6), 16)];

for (let x = x0; x < x1; x += step) {
  let min = null;
  let max = null;
  let n = 0;
  for (let y = y0; y < y1; y++) {
    const i = (y * img.width + x) << 2;
    const d =
      Math.abs(img.data[i] - bg[0]) + Math.abs(img.data[i + 1] - bg[1]) + Math.abs(img.data[i + 2] - bg[2]);
    if (d > tol) {
      if (min === null) min = y;
      max = y;
      n++;
    }
  }
  console.log(`${String(x).padStart(5)}  ${min === null ? "-" : min}..${max === null ? "-" : max}  n=${n}`);
}
