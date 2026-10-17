// Print the strongest-ink pixel in a vertical window for each x.
// Usage: node scripts/sample.mjs <png> <x list...> <y0> <y1>
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const args = process.argv.slice(2);
const img = PNG.sync.read(readFileSync(args[0]));
const y1 = +args[args.length - 1];
const y0 = +args[args.length - 2];
const xs = args.slice(1, -2).map(Number);

for (const x of xs) {
  let best = null;
  let bd = 0;
  for (let y = y0; y < y1; y++) {
    const i = (y * img.width + x) << 2;
    const c = [img.data[i], img.data[i + 1], img.data[i + 2]];
    const d = Math.abs(c[0] - 246) + Math.abs(c[1] - 248) + Math.abs(c[2] - 246);
    if (d > bd) {
      bd = d;
      best = [y, c];
    }
  }
  console.log("x=" + String(x).padStart(4), best ? `y=${best[0]} rgb=${best[1].join(",")} d=${bd}` : "none");
}
