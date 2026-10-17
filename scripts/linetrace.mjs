// Print runs where two images differ by more than a threshold along given scanlines.
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
const [aPath, bPath, ...ys] = process.argv.slice(2);
const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));
for (const yStr of ys) {
  const y = Number(yStr);
  let runs = [], start = -1, maxd = 0;
  const flush = (endX) => { if (start >= 0) runs.push(`${start}-${endX}(${maxd})`); start = -1; maxd = 0; };
  for (let x = 0; x < Math.min(a.width, b.width); x++) {
    const i = (a.width * y + x) << 2, j = (b.width * y + x) << 2;
    const d = Math.max(Math.abs(a.data[i]-b.data[j]), Math.abs(a.data[i+1]-b.data[j+1]), Math.abs(a.data[i+2]-b.data[j+2]));
    if (d > 25) { if (start < 0) start = x; maxd = Math.max(maxd, d); }
    else flush(x - 1);
  }
  flush(Math.min(a.width, b.width) - 1);
  console.log(`y=${y}: ${runs.length ? runs.join(" ") : "(match)"}  [runs=${runs.length}]`);
}
