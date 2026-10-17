import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const mine = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const base = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));

const px = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const isBg = (c) => c[0] > 240 && c[1] > 240 && c[2] > 240;

// Card 5 image should occupy x 1168..1655, y 2890..3377.
for (const [name, img] of [["MINE", mine], ["BASE", base]]) {
  // horizontal extent at the vertical middle
  let x0 = -1, x1 = -1;
  for (let x = 1100; x < 1750; x++) {
    const c = px(img, x, 3134);
    if (!isBg(c)) {
      if (x0 < 0) x0 = x;
      x1 = x;
    }
  }
  let y0 = -1, y1 = -1;
  for (let y = 2820; y < 3450; y++) {
    const c = px(img, 1412, y);
    if (!isBg(c)) {
      if (y0 < 0) y0 = y;
      y1 = y;
    }
  }
  console.log(`${name}: row3134 non-bg x ${x0}..${x1}   col1412 non-bg y ${y0}..${y1}`);
}
