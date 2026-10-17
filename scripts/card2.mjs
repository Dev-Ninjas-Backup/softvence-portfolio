import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/showreel-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-4983.png"));
const src = PNG.sync.read(readFileSync("public/figma/765-6268.png"));

const hex = (n) => n.toString(16).padStart(2, "0");
const at = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return `#${hex(img.data[i])}${hex(img.data[i + 1])}${hex(img.data[i + 2])}`;
};

// card2 image box in the page: x 845..1402, y 358..728
const X0 = 845, Y0 = 358, W = 557, H = 370;
console.log("src.png", src.width, "x", src.height);
for (const [ux, uy] of [[10, 10], [280, 100], [280, 200], [280, 300], [500, 360], [100, 350], [400, 350]]) {
  const px = X0 + ux, py = Y0 + uy;
  const sx = Math.round((ux / W) * src.width), sy = Math.round((uy / H) * src.height);
  console.log(
    `u(${ux},${uy})  MINE ${at(m, px, py)}  FIGMA ${at(f, px, py)}  SRC ${at(src, sx, sy)}`,
  );
}
