import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const mine = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const base = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));
const one = PNG.sync.read(readFileSync("/tmp/765-6464-1x.png"));

const X0 = 1168, Y0 = 2890, S = 488;
const hex = (n) => n.toString(16).padStart(2, "0");
const at = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return `${hex(img.data[i])}${hex(img.data[i + 1])}${hex(img.data[i + 2])}`;
};

console.log("in-page vs base vs 1x export");
for (const [x, y] of [[50, 50], [244, 244], [122, 366], [366, 122], [438, 438]]) {
  console.log(
    `  (${x},${y})  page ${at(mine, X0 + x, Y0 + y)}  base ${at(base, X0 + x, Y0 + y)}  1x ${at(one, x, y)}`,
  );
}

// Is the page image shifted? try shifts
for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [2, 2]]) {
  let diff = 0;
  for (let y = 20; y < S - 20; y++)
    for (let x = 20; x < S - 20; x++) {
      const i = (mine.width * (Y0 + y) + X0 + x) << 2;
      const j = (one.width * (y + dy) + (x + dx)) << 2;
      let d = 0;
      for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(mine.data[i + c] - one.data[j + c]));
      if (d > 8) diff++;
    }
  console.log(`  shift(${dx},${dy}): ${diff} px differ >8`);
}

// Full-page vs 1x with no shift, restricted to inner area
let diff0 = 0, tot = 0;
for (let y = 0; y < S; y++)
  for (let x = 0; x < S; x++) {
    const i = (mine.width * (Y0 + y) + X0 + x) << 2;
    const j = (one.width * y + x) << 2;
    let d = 0;
    for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(mine.data[i + c] - one.data[j + c]));
    tot++;
    if (d > 8) diff0++;
  }
console.log(`  no-shift full box: ${diff0}/${tot}`);
