// Isolate why full-section captures wash out images.
// Tests: canvas readback in-page, then several capture strategies for the same
// 488x488 image, comparing each against the source file.
import { readFileSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const file = PNG.sync.read(readFileSync("/tmp/765-6464-1x.png"));

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

// 1) Canvas readback: does Chrome's decoded bitmap equal the file?
const canvasPx = await page.evaluate(() => {
  const img = document.querySelectorAll("section#services img")[4];
  const cv = document.createElement("canvas");
  cv.width = img.naturalWidth;
  cv.height = img.naturalHeight;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(122, 366, 1, 1).data;
  const e = ctx.getImageData(366, 122, 1, 1).data;
  return {
    natural: [img.naturalWidth, img.naturalHeight],
    a: [d[0], d[1], d[2]],
    b: [e[0], e[1], e[2]],
  };
});
const hex = (a) => a.map((v) => v.toString(16).padStart(2, "0")).join("");
console.log("canvas readback natural", canvasPx.natural);
console.log("  canvas(122,366)", hex(canvasPx.a), "file", hex([file.data[((488 * 366 + 122) << 2)], file.data[((488 * 366 + 122) << 2) + 1], file.data[((488 * 366 + 122) << 2) + 2]]));
console.log("  canvas(366,122)", hex(canvasPx.b));

const box = await page.evaluate(() => {
  const img = document.querySelectorAll("section#services img")[4];
  const r = img.getBoundingClientRect();
  return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height };
});
console.log("img absolute box", box);

async function capture(label, { waitMs, mode, offset }) {
  await page.evaluate((top) => window.scrollTo(0, top), box.y - offset);
  await new Promise((r) => setTimeout(r, waitMs));
  const out = `/tmp/cap-${label}.png`;
  if (mode === "clip") {
    await page.screenshot({
      path: out,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      captureBeyondViewport: false,
    });
  } else if (mode === "beyond") {
    await page.screenshot({
      path: out,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      captureBeyondViewport: true,
    });
  } else {
    const el = (await page.$$("section#services img"))[4];
    await el.screenshot({ path: out });
  }
  const shot = PNG.sync.read(readFileSync(out));
  let n = 0;
  for (let y = 0; y < 488; y++)
    for (let x = 0; x < 488; x++)
      for (let c = 0; c < 3; c++)
        if (Math.abs(shot.data[((shot.width * y + x) << 2) + c] - file.data[((488 * y + x) << 2) + c]) > 8) {
          n++;
          break;
        }
  const p = (x, y) => hex([0, 1, 2].map((c) => shot.data[((shot.width * y + x) << 2) + c]));
  console.log(
    `${label.padEnd(22)} ${mode.padEnd(7)} off=${String(offset).padStart(4)} wait=${String(waitMs).padStart(4)}  diff=${n}/238144  px(122,366)=${p(122, 366)} file=d6cbfc`,
  );
}

await capture("clip-top-120ms", { waitMs: 120, mode: "clip", offset: 0 });
await capture("clip-top-2000ms", { waitMs: 2000, mode: "clip", offset: 0 });
await capture("clip-center-500ms", { waitMs: 500, mode: "clip", offset: 300 });
await capture("clip-top-500-beyond", { waitMs: 500, mode: "beyond", offset: 0 });
await capture("element", { waitMs: 500, mode: "element", offset: 0 });

await browser.close();
