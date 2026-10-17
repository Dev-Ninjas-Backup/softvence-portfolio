import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const mine = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const one = PNG.sync.read(readFileSync("/tmp/765-6464-1x.png"));

const X0 = 1168, Y0 = 2890, S = 488;

function darkest(img, ox, oy) {
  let best = 1e9, bx = -1, by = -1;
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const i = (img.width * (oy + y) + ox + x) << 2;
      const l = img.data[i] * 0.299 + img.data[i + 1] * 0.587 + img.data[i + 2] * 0.114;
      if (l < best) {
        best = l;
        bx = x;
        by = y;
      }
    }
  return `(${bx},${by}) lum=${best.toFixed(1)}`;
}

console.log("darkest in page region:", darkest(mine, X0, Y0));
console.log("darkest in 1x export  :", darkest(one, 0, 0));

// min/max per channel
function rng(img, ox, oy) {
  const mn = [255, 255, 255], mx = [0, 0, 0];
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const i = (img.width * (oy + y) + ox + x) << 2;
      for (let c = 0; c < 3; c++) {
        mn[c] = Math.min(mn[c], img.data[i + c]);
        mx[c] = Math.max(mx[c], img.data[i + c]);
      }
    }
  return `min ${mn} max ${mx}`;
}
console.log("page range:", rng(mine, X0, Y0));
console.log("1x   range:", rng(one, 0, 0));
