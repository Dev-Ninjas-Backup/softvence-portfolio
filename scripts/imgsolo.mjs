// Screenshot a single <img> from the page and compare it with the source file.
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] ?? "/tmp/imgsolo.png";
const index = Number(process.argv[3] ?? 4);
mkdirSync(path.dirname(path.resolve(out)), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(async () => {
  const step = 600;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
});
await page
  .waitForFunction(
    () => [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    { timeout: 30000, polling: 150 },
  )
  .catch(() => {});

const meta = await page.evaluate((i) => {
  const img = document.querySelectorAll("section#services img")[i];
  const r = img.getBoundingClientRect();
  const cs = getComputedStyle(img);
  return {
    src: img.getAttribute("src"),
    natural: [img.naturalWidth, img.naturalHeight],
    rect: [r.width, r.height],
    objectFit: cs.objectFit,
    width: cs.width,
    height: cs.height,
    transform: cs.transform,
    imageRendering: cs.imageRendering,
    parentTransform: getComputedStyle(img.parentElement).transform,
    gpTransform: getComputedStyle(img.parentElement.parentElement).transform,
  };
}, index);
console.log(JSON.stringify(meta, null, 2));

const el = (await page.$$("section#services img"))[index];
await el.screenshot({ path: out });
const shot = PNG.sync.read(readFileSync(out));
console.log("shot size", shot.width, shot.height);
await browser.close();
