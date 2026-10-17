import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/work-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4921.png"));

function runs(img, y, x0, x1) {
  const out = [];
  let start = -1;
  for (let x = x0; x < x1; x++) {
    const i = (img.width * y + x) << 2;
    const d = img.data[i] < 150 && img.data[i + 1] < 150 && img.data[i + 2] < 150;
    if (d && start < 0) start = x;
    if (!d && start >= 0) {
      out.push(`${start}-${x - 1}`);
      start = -1;
    }
  }
  if (start >= 0) out.push(`${start}-${x1 - 1}`);
  return out.join(" ");
}

for (const y of [534, 538, 542, 546, 549]) {
  console.log(`y=${y}\n  M ${runs(m, y, 240, 300)}\n  F ${runs(f, y, 240, 300)}`);
}
