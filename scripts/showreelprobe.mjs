import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/showreel-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4983.png"));

function bb(img, x0, x1, y0, y1, pred = (r, g, b) => r < 160 && g < 160 && b < 160) {
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
  return n ? `n=${n} x[${minX},${maxX}] w=${maxX - minX + 1} y[${minY},${maxY}]` : "none";
}

console.log("TITLE row (dark text, y140-260)");
console.log("  MINE ", bb(m, 200, 1750, 140, 260));
console.log("  FIGMA", bb(f, 200, 1750, 140, 260));

console.log("card1 info title (y755-795, x245-800)");
console.log("  MINE ", bb(m, 245, 800, 752, 795));
console.log("  FIGMA", bb(f, 245, 800, 752, 795));

console.log("card1 stats (y795-880, x245-800)");
console.log("  MINE ", bb(m, 245, 800, 795, 885));
console.log("  FIGMA", bb(f, 245, 800, 795, 885));

console.log("bottom-left block x0-90 y1010-1090");
for (const [x, y] of [[20, 1050], [50, 1060], [70, 1075]]) {
  const im = (img, xx, yy) => {
    const i = (img.width * yy + xx) << 2;
    const h = (n) => n.toString(16).padStart(2, "0");
    return `#${h(img.data[i])}${h(img.data[i + 1])}${h(img.data[i + 2])}`;
  };
  console.log(`  (${x},${y}) MINE ${im(m, x, y)}  FIGMA ${im(f, x, y)}`);
}
