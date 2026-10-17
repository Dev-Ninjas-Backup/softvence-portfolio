import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));

// Card 1: x 220..1700, y 382..958. Use a band above the content/image (y 390..410)
// and one below the content (y 890..915) to stay on pure background.
function stats(img, x0, x1, y0, y1) {
  let min = 999, max = -1;
  const counts = new Map();
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++) {
      const i = (img.width * y + x) << 2;
      const v = img.data[i];
      if (v < min) min = v;
      if (v > max) max = v;
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
  const hist = [...counts.entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => `${k}:${v}`).join(" ");
  return `min=${min} max=${max}  ${hist}`;
}

console.log("band y390-410 (x225-1695)");
console.log("  MINE ", stats(m, 225, 1696, 390, 410));
console.log("  FIGMA", stats(f, 225, 1696, 390, 410));

// Sample the exact top-left corner region
console.log("\ncorner samples (card-local top-left):");
for (const [lx, ly] of [[2, 2], [6, 6], [12, 12], [20, 0], [40, 0], [0, 40], [100, 0], [0, 100]]) {
  const x = 220 + lx, y = 382 + ly;
  const i = (m.width * y + x) << 2;
  const j = (f.width * y + x) << 2;
  console.log(`  local(${lx},${ly}) MINE ${m.data[i]}  FIGMA ${f.data[j]}`);
}
