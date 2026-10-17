// Given a frame and a fitted source, print the source pixel that maps to a
// normalized point, for STRETCH / COVER / CONTAIN.
// Usage: node scripts/mapsource.mjs <src> <frameW> <frameH> <u> <v> <fit>
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import jpeg from "jpeg-js";

const [srcPath, fwA, fhA, uA, vA, fit] = process.argv.slice(2);
const fw = +fwA, fh = +fhA, u = +uA, v = +vA;
const load = (p) => {
  const buf = readFileSync(p);
  if (p.endsWith(".png")) { const i = PNG.sync.read(buf); return i; }
  const raw = jpeg.decode(buf, { useTArray: true });
  return { width: raw.width, height: raw.height, data: raw.data };
};
const img = load(srcPath);
let sx, sy;
if (fit === "cover" || fit === "contain") {
  const scale = fit === "cover"
    ? Math.max(fw / img.width, fh / img.height)
    : Math.min(fw / img.width, fh / img.height);
  const sw = fw / scale, sh = fh / scale;
  sx = (img.width - sw) / 2 + u * sw;
  sy = (img.height - sh) / 2 + v * sh;
} else {
  sx = u * img.width;
  sy = v * img.height;
}
const X = Math.max(0, Math.min(img.width - 1, Math.round(sx)));
const Y = Math.max(0, Math.min(img.height - 1, Math.round(sy)));
const i = (img.width * Y + X) << 2;
const hex = (n) => n.toString(16).padStart(2, "0");
console.log(`${srcPath} ${img.width}x${img.height} fit=${fit} u=${u} v=${v} -> src(${X},${Y}) #${hex(img.data[i])}${hex(img.data[i+1])}${hex(img.data[i+2])}`);
