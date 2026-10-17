import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));
const hex = (n) => n.toString(16).padStart(2, "0");
const at = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return `${hex(img.data[i])}${hex(img.data[i + 1])}${hex(img.data[i + 2])}`;
};

// Card 5 image: page x1168..1656, y2890..3378
const X0 = 1168, Y0 = 2890, S = 488;
console.log("card5 image samples (page coords)");
for (const [cx, cy] of [[0.1, 0.1], [0.5, 0.5], [0.9, 0.9], [0.25, 0.75], [0.75, 0.25], [0.02, 0.5], [0.5, 0.02]]) {
  const x = Math.round(X0 + cx * S), y = Math.round(Y0 + cy * S);
  console.log(`  (${x},${y})  MINE ${at(m, x, y)}  FIGMA ${at(f, x, y)}`);
}

// Row-by-row mismatch magnitude in the image box
console.log("\nrow profile (max channel delta per row, every 16 rows)");
let big = 0, small = 0, same = 0;
for (let y = Y0; y < Y0 + S; y++) {
  let maxd = 0;
  for (let x = X0; x < X0 + S; x++) {
    const i = (m.width * y + x) << 2;
    for (let c = 0; c < 3; c++) maxd = Math.max(maxd, Math.abs(m.data[i + c] - f.data[i + c]));
  }
  if (maxd === 0) same++;
  else if (maxd <= 3) small++;
  else big++;
}
console.log(`  rows: identical=${same}  delta<=3=${small}  delta>3=${big}`);
