// Print the first row containing dark ink in a region, for two images.
// Usage: node scripts/inktop.mjs <a.png> <b.png> <x0> <y0> <x1> <y1> [lum]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [pa, pb, X0, Y0, X1, Y1, lumArg] = process.argv.slice(2);
const lum = Number(lumArg ?? 160);
const x0 = +X0;
const y0 = +Y0;
const x1 = +X1;
const y1 = +Y1;

function firstInk(img) {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * img.width + x) << 2;
      const l = 0.299 * img.data[i] + 0.587 * img.data[i + 1] + 0.114 * img.data[i + 2];
      if (l < lum) return y;
    }
  }
  return -1;
}

const A = PNG.sync.read(readFileSync(pa));
const B = PNG.sync.read(readFileSync(pb));
console.log(`A=${firstInk(A)}  B=${firstInk(B)}  d=${firstInk(B) - firstInk(A)}`);
