// Crop a region of a PNG (optionally upscaled) and save it.
// Usage: node scripts/crop.mjs <in.png> <out.png> <x0> <y0> <x1> <y1> [scale]
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";

const [inP, outP, X0, Y0, X1, Y1, scaleArg] = process.argv.slice(2);
const scale = Number(scaleArg ?? 1);
const im = PNG.sync.read(readFileSync(inP));
const x0 = +X0;
const y0 = +Y0;
const cw = +X1 - x0;
const ch = +Y1 - y0;
const w = Math.round(cw * scale);
const h = Math.round(ch * scale);
const out = new PNG({ width: w, height: h });
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const sx = x0 + Math.floor(x / scale);
    const sy = y0 + Math.floor(y / scale);
    const f = (sy * im.width + sx) << 2;
    const t = (y * w + x) << 2;
    out.data[t] = im.data[f];
    out.data[t + 1] = im.data[f + 1];
    out.data[t + 2] = im.data[f + 2];
    out.data[t + 3] = 255;
  }
}
writeFileSync(outP, PNG.sync.write(out));
console.log(`cropped ${inP} [${x0},${y0}..${X1},${Y1}] -> ${outP} ${w}x${h}`);
