// Per-row count of "ink" pixels (dark or saturated) in a region, for two images.
// Usage: node scripts/rows.mjs <a.png> <b.png> <x0> <y0> <x1> <y1>
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [aPath, bPath, x0, y0, x1, y1] = process.argv.slice(2);
const X0 = Number(x0), Y0 = Number(y0), X1 = Number(x1), Y1 = Number(y1);
const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));

// "ink" = anything not close to the pale card background.
function ink(img, y) {
  let n = 0;
  for (let x = X0; x < X1; x++) {
    const i = (img.width * y + x) << 2;
    const r = img.data[i], g = img.data[i + 1], bl = img.data[i + 2];
    const lum = r * 0.299 + g * 0.587 + bl * 0.114;
    const sat = Math.max(r, g, bl) - Math.min(r, g, bl);
    if (lum < 200 || sat > 24) n++;
  }
  return n;
}

let runs = null;
console.log(`rows ${Y0}..${Y1}   (MINE / FIGMA ink counts)`);
for (let y = Y0; y < Y1; y++) {
  const ia = ink(a, y), ib = ink(b, y);
  const has = ia > 2 || ib > 2;
  if (has) console.log(`  y=${String(y).padStart(5)}  ${String(ia).padStart(5)} / ${String(ib).padStart(5)}  ${"#".repeat(Math.min(40, Math.round(ia / 12)))}`);
}
