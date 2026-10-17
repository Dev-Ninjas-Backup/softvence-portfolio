import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/work-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4921.png"));

function bb(img, x0, x1, y0, y1, pred) {
  let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1, n = 0;
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++) {
      const i = (img.width * y + x) << 2;
      if (pred(img.data[i], img.data[i + 1], img.data[i + 2])) {
        n++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  return n ? `n=${n} x[${minX},${maxX}] (w=${maxX - minX + 1}) y[${minY},${maxY}] (h=${maxY - minY + 1})` : "none";
}

const white = (r, g, b) => r > 210 && g > 210 && b > 210;

console.log("green card '20+' (exp 723,921 78x44)");
console.log("  MINE ", bb(m, 715, 815, 912, 975, white));
console.log("  FIGMA", bb(f, 715, 815, 912, 975, white));
console.log("green card 'Global Awards & Features' (exp 723,999)");
console.log("  MINE ", bb(m, 715, 910, 995, 1030, white));
console.log("  FIGMA", bb(f, 715, 910, 995, 1030, white));
