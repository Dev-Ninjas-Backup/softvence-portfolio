// Capture the services section as several tall clips to test whether the
// full-element capture is what introduces image resampling artifacts.
// Usage: node scripts/clipshot.mjs <outPrefix> <clipHeight>
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const prefix = process.argv[2] ?? "/tmp/svc-clip";
const clipH = Number(process.argv[3] ?? 1000);

mkdirSync(path.dirname(path.resolve(prefix)), { recursive: true });

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
  const step = 600;
  const max = document.body.scrollHeight;
  for (let y = 0; y < max; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await page
  .waitForFunction(
    () => [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    { timeout: 30000, polling: 150 },
  )
  .catch(() => {});
await new Promise((r) => setTimeout(r, 400));

const box = await page.evaluate(() => {
  const el = document.querySelector("section#services");
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y + window.scrollY, width: r.width, height: r.height };
});
console.log("section box", box);

const base = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));
let total = 0;
for (let y = 0; y < box.height; y += clipH) {
  const h = Math.min(clipH, box.height - y);
  const out = `${prefix}-${y}.png`;
  await page.screenshot({
    path: out,
    clip: { x: box.x, y: box.y + y, width: box.width, height: h },
  });
  const clip = PNG.sync.read(readFileSync(out));
  // compare against the matching band of the baseline
  const a = new PNG({ width: 1920, height: h });
  const b = new PNG({ width: 1920, height: h });
  for (let yy = 0; yy < h; yy++)
    for (let xx = 0; xx < 1920; xx++) {
      const si = (clip.width * yy + xx) << 2;
      const bi = (base.width * (y + yy) + xx) << 2;
      const ti = (1920 * yy + xx) << 2;
      a.data[ti] = clip.data[si];
      a.data[ti + 1] = clip.data[si + 1];
      a.data[ti + 2] = clip.data[si + 2];
      a.data[ti + 3] = 255;
      b.data[ti] = base.data[bi];
      b.data[ti + 1] = base.data[bi + 1];
      b.data[ti + 2] = base.data[bi + 2];
      b.data[ti + 3] = 255;
    }
  const diff = new PNG({ width: 1920, height: h });
  const n = pixelmatch(a.data, b.data, diff.data, 1920, h, { threshold: 0.1 });
  total += n;
  console.log(`clip y=${y} h=${h}: ${n} (${((n / (1920 * h)) * 100).toFixed(3)}%)`);
}
console.log(`TOTAL ${total} (${((total / (1920 * box.height)) * 100).toFixed(3)}%)`);
await browser.close();
