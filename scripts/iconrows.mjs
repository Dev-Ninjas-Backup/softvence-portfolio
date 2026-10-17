import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/work-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4921.png"));

function row(img, y, x0, x1) {
  let n = 0;
  for (let x = x0; x < x1; x++) {
    const i = (img.width * y + x) << 2;
    if (img.data[i] < 150 && img.data[i + 1] < 150 && img.data[i + 2] < 150) n++;
  }
  return n;
}

console.log("Quote icon region x240-292 (icon only above y551)");
for (let y = 520; y <= 574; y++) {
  const a = row(m, y, 240, 292);
  const b = row(f, y, 240, 292);
  console.log(`${y}  M${String(a).padStart(3)}  F${String(b).padStart(3)}${Math.abs(a - b) > 3 ? "  <<" : ""}`);
}
