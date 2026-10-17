// Locate a coloured shape and the contrasting glyph inside it.
// Usage: node scripts/glyph.mjs <a.png> <b.png>
// Prints, for both images: the bbox/ink of the brand-blue logo and the bbox of
// the white arrow inside the green CTA badge.
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const [aPath, bPath] = process.argv.slice(2);
const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));

const px = (im, x, y) => {
  const i = (im.width * y + x) << 2;
  return [im.data[i], im.data[i + 1], im.data[i + 2]];
};
const near = (p, c, tol = 60) =>
  Math.abs(p[0] - c[0]) < tol && Math.abs(p[1] - c[1]) < tol && Math.abs(p[2] - c[2]) < tol;

const BLUE = [56, 115, 255];
const GREEN = [0, 171, 12];
const WHITE = [255, 255, 255];

function bboxOf(im, x0, y0, x1, y1, test) {
  let mnx = 1e9, mny = 1e9, mxx = -1, mxy = -1, n = 0;
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++) {
      if (test(px(im, x, y))) {
        n++;
        if (x < mnx) mnx = x;
        if (x > mxx) mxx = x;
        if (y < mny) mny = y;
        if (y > mxy) mxy = y;
      }
    }
  return mxx < 0 ? null : { mnx, mny, mxx, mxy, w: mxx - mnx + 1, h: mxy - mny + 1, n };
}
const fmt = (r) =>
  r ? `x${r.mnx}..${r.mxx} y${r.mny}..${r.mxy}  ${r.w}x${r.h} n=${r.n}` : "none";

for (const [label, im] of [["MINE ", a], ["FIGMA", b]]) {
  const logo = bboxOf(im, 0, 0, 260, 83, (p) => near(p, BLUE, 70));
  console.log(`${label} logo(blue)   ${fmt(logo)}`);
}
// Find the green badge on the right, then the white arrow inside it.
for (const [label, im] of [["MINE ", a], ["FIGMA", b]]) {
  const badge = bboxOf(im, im.width - 320, 0, im.width, 83, (p) => near(p, GREEN, 60));
  console.log(`${label} badge(green) ${fmt(badge)}`);
  if (badge) {
    const inner = bboxOf(
      im,
      badge.mnx + 6,
      badge.mny + 6,
      badge.mxx - 6,
      badge.mxy - 6,
      (p) => near(p, WHITE, 110) && !near(p, GREEN, 60),
    );
    console.log(`${label} arrow(white) ${fmt(inner)}`);
  }
}
// Also the outlined pill (green stroke) on the right.
for (const [label, im] of [["MINE ", a], ["FIGMA", b]]) {
  const pill = bboxOf(im, im.width - 700, 0, im.width - 320, 83, (p) => near(p, GREEN, 60));
  console.log(`${label} pill-ink     ${fmt(pill)}`);
}
