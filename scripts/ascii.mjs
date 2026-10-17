// Render a region of a PNG as ASCII for visual inspection.
// Usage: node scripts/ascii.mjs <img.png> <x0> <y0> <x1> <y1> [step]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [p, X0, Y0, X1, Y1, stepArg] = process.argv.slice(2);
const step = Number(stepArg ?? 1);
const im = PNG.sync.read(readFileSync(p));

function classify(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const sat = mx - mn;
  if (g > 90 && g > r + 40 && g > b + 40) return "G"; // green
  if (b > 150 && b > r + 40 && b > g + 20) return "B"; // blue
  if (lum < 110) return "#"; // dark ink
  if (lum < 205) return "+"; // mid ink
  if (lum < 250 || sat > 12) return "."; // near-white / tint
  return " "; // pure white
}

const rows = [];
for (let y = +Y0; y < +Y1; y += step) {
  let s = "";
  for (let x = +X0; x < +X1; x += step) {
    const i = (im.width * y + x) << 2;
    s += classify(im.data[i], im.data[i + 1], im.data[i + 2]);
  }
  rows.push(`${String(y).padStart(4)} ${s}`);
}
const hdr = "     " + Array.from({ length: Math.ceil((+X1 - +X0) / step) }, (_, i) => {
  const x = +X0 + i * step;
  return x % 10 === 0 ? String(Math.floor(x / 10) % 10) : " ";
}).join("");
console.log(hdr);
console.log(rows.join("\n"));
