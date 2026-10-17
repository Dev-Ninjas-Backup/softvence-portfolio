// Compare an observed render crop against a source image under several
// transforms, to identify what the renderer actually did.
// Usage: node scripts/diagfit.mjs <observed.png> <left> <top> <w> <h> <src>
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import jpeg from "jpeg-js";

const [obsPath, l, t, w, h, srcPath] = process.argv.slice(2);
const left = +l, top = +t, fw = +w, fh = +h;

const obs = PNG.sync.read(readFileSync(obsPath));
const load = (p) => {
  const buf = readFileSync(p);
  if (p.endsWith(".png")) return PNG.sync.read(buf);
  const raw = jpeg.decode(buf, { useTArray: true });
  return { width: raw.width, height: raw.height, data: raw.data };
};
const img = load(srcPath);
const px = (im, x, y) => { const i = (im.width * y + x) << 2; return [im.data[i], im.data[i + 1], im.data[i + 2]]; };

const N = 7;
const pts = [];
for (let i = 1; i <= N; i++) for (let j = 1; j <= N; j++) pts.push([i / (N + 1), j / (N + 1)]);

const tests = {
  "cover": (u, v) => [u, v],
  "cover-mirrorX": (u, v) => [1 - u, v],
  "cover-mirrorY": (u, v) => [u, 1 - v],
  "cover-rot180": (u, v) => [1 - u, 1 - v],
  "stretch": (u, v) => [u, v],
};

const cover = Math.max(fw / img.width, fh / img.height);
const sw = fw / cover, sh = fh / cover;

for (const [name, tf] of Object.entries(tests)) {
  let err = 0;
  for (const [u0, v0] of pts) {
    const [u, v] = tf(u0, v0);
    const fx = left + Math.round(u0 * fw), fy = top + Math.round(v0 * fh);
    const ref = px(obs, fx, fy);
    let sx, sy;
    if (name === "stretch") { sx = u * img.width; sy = v * img.height; }
    else { sx = (img.width - sw) / 2 + u * sw; sy = (img.height - sh) / 2 + v * sh; }
    const X = Math.max(0, Math.min(img.width - 1, Math.round(sx)));
    const Y = Math.max(0, Math.min(img.height - 1, Math.round(sy)));
    const a = px(img, X, Y);
    err += Math.abs(a[0] - ref[0]) + Math.abs(a[1] - ref[1]) + Math.abs(a[2] - ref[2]);
  }
  console.log(`${name.padEnd(14)} err=${err}`);
}
