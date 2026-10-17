// Composite a PNG over a solid colour (default white) and save it.
// Usage: node scripts/flatten.mjs <in.png> <out.png> [r g b]
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";
const [inP, outP, r = "255", g = "255", b = "255"] = process.argv.slice(2);
const im = PNG.sync.read(readFileSync(inP));
for (let i = 0; i < im.data.length; i += 4) {
  const a = im.data[i + 3] / 255;
  im.data[i] = Math.round(im.data[i] * a + (+r) * (1 - a));
  im.data[i + 1] = Math.round(im.data[i + 1] * a + (+g) * (1 - a));
  im.data[i + 2] = Math.round(im.data[i + 2] * a + (+b) * (1 - a));
  im.data[i + 3] = 255;
}
writeFileSync(outP, PNG.sync.write(im));
console.log("flattened", inP, "->", outP);
