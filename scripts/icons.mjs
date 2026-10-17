import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/work-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4921.png"));

function bb(img, x0, x1, y0, y1) {
  let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1, n = 0;
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++) {
      const i = (img.width * y + x) << 2;
      if (img.data[i] < 170 && img.data[i + 1] < 170 && img.data[i + 2] < 170) {
        n++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  return `n=${n} x[${minX},${maxX}] y[${minY},${maxY}]`;
}

const checks = [
  ["quote icon 4940  (exp 248,524 35x35)", 238, 300, 518, 562],
  ["green card icon 4963 (exp 1091,936 53x53)", 1080, 1160, 925, 1000],
  ["green card digits 20+ (exp 723,921)", 715, 810, 915, 1010],
  ["link icon 4976 (exp 1203,959 32x32)", 1195, 1245, 950, 1000],
  ["arrow 4981 (exp 1580,953 44x44)", 1570, 1635, 945, 1005],
];
for (const [name, x0, x1, y0, y1] of checks) {
  console.log(`${name}\n  MINE  ${bb(m, x0, x1, y0, y1)}\n  FIGMA ${bb(f, x0, x1, y0, y1)}`);
}
