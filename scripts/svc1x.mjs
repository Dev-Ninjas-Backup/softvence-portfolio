import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const base = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));
const one = PNG.sync.read(readFileSync("/tmp/765-6464-1x.png"));
const two = PNG.sync.read(readFileSync("public/figma/765-6464.png"));

const X0 = 1168, Y0 = 2890, S = 488;
const hex = (n) => n.toString(16).padStart(2, "0");
const at = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return `${hex(img.data[i])}${hex(img.data[i + 1])}${hex(img.data[i + 2])}`;
};

console.log("1x export:", one.width, "x", one.height, "| 2x export:", two.width, "x", two.height);
console.log("samples: BASE(from screenshot) / 1x export / 2x export");
for (const [x, y] of [[50, 50], [244, 244], [438, 438], [122, 366], [366, 122], [244, 12], [12, 244]]) {
  console.log(
    `  (${x},${y})  base ${at(base, X0 + x, Y0 + y)}  1x ${at(one, x, y)}  2x ${at(two, x * 2, y * 2)}`,
  );
}

// how different is base vs 1x inside the box?
let diff = 0, maxd = 0;
for (let y = 0; y < S; y++)
  for (let x = 0; x < S; x++) {
    const i = (base.width * (Y0 + y) + X0 + x) << 2;
    const j = (one.width * y + x) << 2;
    let d = 0;
    for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(base.data[i + c] - one.data[j + c]));
    if (d > 8) diff++;
    if (d > maxd) maxd = d;
  }
console.log(`\nbase vs 1x export: ${diff}/${S * S} pixels differ >8, max delta ${maxd}`);
