import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));

const hex = (n) => n.toString(16).padStart(2, "0");
const at = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return `#${hex(img.data[i])}${hex(img.data[i + 1])}${hex(img.data[i + 2])}`;
};

// Card 1 spans x 220..1700, y 382..958
const pts = [
  [240, 400],
  [500, 400],
  [900, 400],
  [1300, 400],
  [1650, 400],
  [1650, 500],
  [1650, 900],
  [240, 900],
  [900, 950],
  [240, 700],
  [1700, 700],
  [1710, 700],
];
for (const [x, y] of pts) {
  console.log(`(${x},${y})  MINE ${at(m, x, y)}  FIGMA ${at(f, x, y)}`);
}
