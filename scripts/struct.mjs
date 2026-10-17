import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/showreel-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4983.png"));

function col(img, x, y0, y1) {
  // classify each row: 'W' near-white, '.' near bg(#f6f8f6), '#' other
  const out = [];
  for (let y = y0; y < y1; y++) {
    const i = (img.width * y + x) << 2;
    const r = img.data[i], g = img.data[i + 1], b = img.data[i + 2];
    if (r > 250 && g > 250 && b > 250) out.push("W");
    else if (Math.abs(r - 246) < 4 && Math.abs(g - 248) < 4 && Math.abs(b - 246) < 4) out.push(".");
    else out.push("#");
  }
  return out.join("");
}

function transitions(img, x, y0, y1) {
  const c = col(img, x, y0, y1);
  const out = [];
  for (let i = 1; i < c.length; i++) if (c[i] !== c[i - 1]) out.push(`${y0 + i}:${c[i - 1]}->${c[i]}`);
  return out.join(" ");
}

for (const x of [300, 1000, 1600]) {
  console.log(`x=${x}`);
  console.log(`  MINE  ${transitions(m, x, 330, 900)}`);
  console.log(`  FIGMA ${transitions(f, x, 330, 900)}`);
}
