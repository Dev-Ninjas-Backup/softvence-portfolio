// Capture the whole page with fullPage:true, crop the services section out of
// it, and compare against the section baseline. Tests whether fullPage capture
// avoids the image re-rasterisation seen with clip/element captures.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync("/tmp", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.addStyleTag({
  content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
});
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 30));
  }
  window.scrollTo(0, 0);
});
await page
  .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), {
    timeout: 30000,
    polling: 150,
  })
  .catch(() => {});
await new Promise((r) => setTimeout(r, 300));

const box = await page.evaluate(() => {
  const r = document.querySelector("section#services").getBoundingClientRect();
  return { x: r.x, y: r.y + window.scrollY, width: r.width, height: r.height };
});
console.log("services box", box);

const buf = await page.screenshot({ fullPage: true });
const full = PNG.sync.read(buf);
console.log("fullPage size", full.width, full.height);

// Crop the services section.
const W = Math.round(box.width), H = Math.round(box.height);
const crop = new PNG({ width: W, height: H });
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const si = (full.width * (Math.round(box.y) + y) + Math.round(box.x) + x) << 2;
    const di = (W * y + x) << 2;
    crop.data[di] = full.data[si];
    crop.data[di + 1] = full.data[si + 1];
    crop.data[di + 2] = full.data[si + 2];
    crop.data[di + 3] = 255;
  }
writeFileSync("/tmp/services-fullpage.png", PNG.sync.write(crop));

const base = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));
const diff = new PNG({ width: W, height: H });
const n = pixelmatch(crop.data, base.data, diff.data, W, H, { threshold: 0.1 });
console.log(`TOTAL ${n} (${((n / (W * H)) * 100).toFixed(3)}%)`);

// Per-card image regions
const regions = [
  ["card1-image", 1079, 418, 1684, 883],
  ["card2-image", 1096, 1017, 1732, 1444],
  ["card3-image", 1168, 1658, 1656, 2146],
  ["card4-image", 1168, 2274, 1656, 2762],
  ["card5-image", 1168, 2890, 1656, 3378],
  ["card8-image", 1168, 4738, 1656, 5226],
];
for (const [name, x0, y0, x1, y1] of regions) {
  const rw = x1 - x0, rh = y1 - y0;
  const a = new PNG({ width: rw, height: rh });
  const b = new PNG({ width: rw, height: rh });
  for (let y = 0; y < rh; y++)
    for (let x = 0; x < rw; x++) {
      const ci = (W * (y0 + y) + x0 + x) << 2;
      const bi = (base.width * (y0 + y) + x0 + x) << 2;
      const ti = (rw * y + x) << 2;
      a.data[ti] = crop.data[ci]; a.data[ti + 1] = crop.data[ci + 1]; a.data[ti + 2] = crop.data[ci + 2]; a.data[ti + 3] = 255;
      b.data[ti] = base.data[bi]; b.data[ti + 1] = base.data[bi + 1]; b.data[ti + 2] = base.data[bi + 2]; b.data[ti + 3] = 255;
    }
  const d = new PNG({ width: rw, height: rh });
  const m = pixelmatch(a.data, b.data, d.data, rw, rh, { threshold: 0.1 });
  console.log(`  ${name}: ${m}/${rw * rh} (${((m / (rw * rh)) * 100).toFixed(2)}%)`);
}
await browser.close();
