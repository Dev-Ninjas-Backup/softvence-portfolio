// For a given card frame, sample N normalized points from the Figma hero render
// and compare against each candidate source image under STRETCH / COVER sampling.
// Usage: node scripts/matchcard.mjs <figmaHero.png> <left> <top> <w> <h> <src...>
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import jpeg from "jpeg-js";

const [figmaPath, l, t, w, h, ...srcs] = process.argv.slice(2);
const left = +l, top = +t, fw = +w, fh = +h;

const figma = PNG.sync.read(readFileSync(figmaPath));
const px = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};

const load = (p) => {
  const buf = readFileSync(p);
  if (p.endsWith(".png")) return PNG.sync.read(buf);
  const raw = jpeg.decode(buf, { useTArray: true });
  return { width: raw.width, height: raw.height, data: raw.data };
};

const samples = [];
const N = 5;
for (let i = 1; i <= N; i++) for (let j = 1; j <= N; j++) samples.push([i / (N + 1), j / (N + 1)]);

for (const s of srcs) {
  const img = load(s);
  let stretchErr = 0, coverErr = 0;
  // cover: scale to cover the frame, center-crop
  const scale = Math.max(fw / img.width, fh / img.height);
  const cw = fw / scale, ch = fh / scale; // visible source size
  for (const [u, v] of samples) {
    const fx = left + Math.round(u * fw), fy = top + Math.round(v * fh);
    const ref = px(figma, fx, fy);
    // STRETCH
    const sx = Math.min(img.width - 1, Math.round(u * img.width));
    const sy = Math.min(img.height - 1, Math.round(v * img.height));
    const a = px(img, sx, sy);
    stretchErr += Math.abs(a[0] - ref[0]) + Math.abs(a[1] - ref[1]) + Math.abs(a[2] - ref[2]);
    // COVER
    const cx = Math.round((img.width - cw) / 2 + u * cw);
    const cy = Math.round((img.height - ch) / 2 + v * ch);
    const b = px(img, Math.min(img.width - 1, cx), Math.min(img.height - 1, cy));
    coverErr += Math.abs(b[0] - ref[0]) + Math.abs(b[1] - ref[1]) + Math.abs(b[2] - ref[2]);
  }
  console.log(`${s}  src=${img.width}x${img.height}  STRETCH err=${stretchErr}  COVER err=${coverErr}`);
}
console.log("--- reference figma samples ---");
for (const [u, v] of samples.slice(0, 6)) {
  const fx = left + Math.round(u * fw), fy = top + Math.round(v * fh);
  console.log(`  (u=${u.toFixed(2)},v=${v.toFixed(2)}) -> (${fx},${fy}) #${px(figma, fx, fy).map((n) => n.toString(16).padStart(2, "0")).join("")}`);
}
