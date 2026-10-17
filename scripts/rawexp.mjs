// Decisive test: render a PNG at 1:1 in a bare page and screenshot it.
// If Chrome's output != the file bytes, the difference is in decode/colour
// management, not in our page's CSS.
// Usage: node scripts/rawexp.mjs <image> <out> [width height]
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [imgArg, outArg, wArg, hArg] = process.argv.slice(2);
const out = outArg ?? "/tmp/rawexp.png";
mkdirSync(path.dirname(path.resolve(out)), { recursive: true });

const src = PNG.sync.read(readFileSync(imgArg));
const w = Number(wArg ?? src.width);
const h = Number(hArg ?? src.height);

// Serve the file straight from the dev server's /figma path when possible.
const publicPath = imgArg.startsWith("public/") ? imgArg.slice("public".length) : null;
const url = publicPath
  ? `http://localhost:3000${publicPath}`
  : `data:image/png;base64,${readFileSync(imgArg).toString("base64")}`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
await page.setContent(
  `<html><body style="margin:0;padding:0;background:#ff00ff">
     <img id="i" src="${url}" width="${w}" height="${h}"
          style="display:block;width:${w}px;height:${h}px;image-rendering:auto">
   </body></html>`,
  { waitUntil: "networkidle0" },
);
await page
  .waitForFunction(() => {
    const i = document.getElementById("i");
    return i && i.complete && i.naturalWidth > 0;
  }, { timeout: 15000 })
  .catch(() => {});
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: out });

const shot = PNG.sync.read(readFileSync(out));
const hex = (n) => n.toString(16).padStart(2, "0");
const at = (im, x, y) => {
  const i = (im.width * y + x) << 2;
  return `${hex(im.data[i])}${hex(im.data[i + 1])}${hex(im.data[i + 2])}`;
};
console.log(`rendered ${w}x${h} of ${imgArg} -> ${out}`);
let n = 0, maxd = 0;
for (let y = 0; y < Math.min(h, src.height); y++)
  for (let x = 0; x < Math.min(w, src.width); x++) {
    let d = 0;
    for (let c = 0; c < 3; c++)
      d = Math.max(d, Math.abs(shot.data[((shot.width * y + x) << 2) + c] - src.data[((src.width * y + x) << 2) + c]));
    if (d > 8) n++;
    if (d > maxd) maxd = d;
  }
console.log(`pixels differing >8: ${n} / ${w * h}   max delta ${maxd}`);
for (const [x, y] of [[122, 366], [366, 122], [244, 244], [50, 50]])
  if (x < w && y < h)
    console.log(`  (${x},${y}) file ${at(src, x, y)}  chrome ${at(shot, x, y)}`);
await browser.close();
