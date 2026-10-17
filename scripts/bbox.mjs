// Compare dark-pixel bounding boxes between two images inside a region.
// Usage: node scripts/bbox.mjs <a.png> <b.png> <thresh> "x0 y0 x1 y1 label" ...
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [aPath, bPath, threshArg, ...rects] = process.argv.slice(2);
const thresh = Number(threshArg ?? 160);
const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));

function bbox(img, x0, y0, x1, y1) {
  let minX = 1e9, minY = 1e9, maxX = -1, maxY = -1, count = 0;
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++) {
      const i = (img.width * y + x) << 2;
      const v = img.data[i] * 0.299 + img.data[i + 1] * 0.587 + img.data[i + 2] * 0.114;
      if (v < thresh) {
        count++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  return maxX < 0 ? null : { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1, count };
}

for (const spec of rects) {
  const parts = spec.split(/\s+/);
  const [x0, y0, x1, y1] = parts.slice(0, 4).map(Number);
  const label = parts.slice(4).join(" ");
  const ba = bbox(a, x0, y0, x1, y1);
  const bb = bbox(b, x0, y0, x1, y1);
  const fmt = (r) => (r ? `x${r.minX}..${r.maxX} y${r.minY}..${r.maxY} ${r.w}x${r.h} n=${r.count}` : "none");
  console.log(`${label}`);
  console.log(`   MINE  ${fmt(ba)}`);
  console.log(`   FIGMA ${fmt(bb)}`);
  if (ba && bb)
    console.log(`   delta x ${ba.minX - bb.minX}..${ba.maxX - bb.maxX}  y ${ba.minY - bb.minY}..${ba.maxY - bb.maxY}  w ${ba.w - bb.w} h ${ba.h - bb.h} n ${ba.count - bb.count}`);
}
