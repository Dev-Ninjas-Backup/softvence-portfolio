import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

for (const f of process.argv.slice(2)) {
  const p = PNG.sync.read(readFileSync(f));
  let minA = 255;
  for (let i = 3; i < p.data.length; i += 4) minA = Math.min(minA, p.data[i]);
  console.log(f, `${p.width}x${p.height}`, "minAlpha=", minA);
}
