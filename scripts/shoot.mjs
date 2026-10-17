// Screenshot a selector (or the whole page) from the dev server at 1920px wide.
// Usage: node scripts/shoot.mjs <out.png> [selector] [width] [height]
//   HIDE="header footer"  hide matching elements before capture (hero-only shots)
//   SHOOT_URL=http://...  override the page URL
//
// Element captures are assembled from viewport-sized slices so that Chrome
// never has to rasterise "beyond the viewport" — that path re-draws images at
// a lower quality and silently corrupts pixel comparisons.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const [outArg, selector, widthArg, heightArg] = process.argv.slice(2);
const out = outArg ?? "shot.png";
const width = Number(widthArg ?? 1920);
const height = Number(heightArg ?? 1200);
const url = process.env.SHOOT_URL ?? "http://localhost:3000/";
const hide = process.env.HIDE ?? "";

mkdirSync(path.dirname(path.resolve(out)), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});

/** Best-effort wait for every <img> on the page to finish decoding. */
async function waitForImages(page) {
  await page
    .waitForFunction(
      () => [...document.images].every((i) => i.complete && i.naturalWidth > 0),
      { timeout: 30000, polling: 150 },
    )
    .catch(() => {});
}

/** Scroll through the document once so lazily-loaded images start loading. */
async function primeLazyImages(page) {
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
  });
  await waitForImages(page);
}

try {
  const page = await browser.newPage();

  // The dev server's HMR can reload the page mid-capture, which detaches the
  // frame; retry the whole capture when that happens.
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      await run(page);
      lastErr = undefined;
      break;
    } catch (err) {
      lastErr = err;
      console.warn(`capture attempt ${attempt} failed: ${err.message}`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  if (lastErr) throw lastErr;
} finally {
  await browser.close();
}

async function run(page) {
  page.on("framenavigated", (f) => console.log("  [nav]", f.url().slice(0, 50)));
  page.on("framedetached", (f) => console.log("  [detached]", String(f.url()).slice(0, 50)));
  page.on("pageerror", (e) => console.log("  [pageerror]", String(e).slice(0, 200)));
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  console.log("  [loaded]", page.url());
  // A Next.js dev compile can trigger an HMR full reload right after load;
  // give it a moment and let the page settle before touching it.
  await new Promise((r) => setTimeout(r, 1500));
  console.log("  [settled]", page.url());

  // Freeze animations so screenshots are deterministic.
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
  });

  // Hide overlapping elements (inline, deterministic) before capturing.
  if (hide) {
    const selectors = hide.split(/[ ,]+/).filter(Boolean);
    await page.evaluate((list) => {
      for (const s of list) {
        document.querySelectorAll(s).forEach((el) => {
          el.style.setProperty("display", "none", "important");
        });
      }
    }, selectors);
  }

  await page.evaluate(() => document.fonts.ready);
  await primeLazyImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));

  if (!selector) {
    await page.screenshot({ path: out, fullPage: true });
    console.log(`saved ${out}`);
  } else {
    const box = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.x,
        y: r.y + window.scrollY,
        width: r.width,
        height: r.height,
      };
    }, selector);
    if (!box) throw new Error(`selector not found: ${selector}`);

    const w = Math.round(box.width);
    const h = Math.round(box.height);
    const sheet = new PNG({ width: w, height: h });
    const sliceH = Math.max(200, Math.floor(height) - 1);
    for (let y = 0; y < h; y += sliceH) {
      const sh = Math.min(sliceH, h - y);
      await page.evaluate((top) => window.scrollTo(0, top), box.y + y);
      await new Promise((r) => setTimeout(r, 120));
      // Clip coordinates are absolute page coordinates; Puppeteer intersects
      // them with the visible viewport, so the slice must be on screen.
      const scrollTop = await page.evaluate(() => window.scrollY);
      const visTop = Math.max(box.y + y, scrollTop);
      const visBottom = Math.min(box.y + y + sh, scrollTop + height);
      const visH = Math.round(visBottom - visTop);
      if (visH <= 0) continue;
      const buf = await page.screenshot({
        clip: { x: box.x, y: visTop, width: w, height: visH },
        captureBeyondViewport: false,
      });
      const part = PNG.sync.read(buf);
      const destY = y + Math.round(visTop - (box.y + y));
      const rows = Math.min(part.height, sh - (destY - y));
      for (let py = 0; py < rows; py++)
        for (let px = 0; px < w; px++) {
          const si = (part.width * py + px) << 2;
          const di = (w * (destY + py) + px) << 2;
          sheet.data[di] = part.data[si];
          sheet.data[di + 1] = part.data[si + 1];
          sheet.data[di + 2] = part.data[si + 2];
          sheet.data[di + 3] = part.data[si + 3];
        }
    }
    writeFileSync(path.resolve(out), PNG.sync.write(sheet));
    console.log(`saved ${out} (${w}x${h})`);
  }
}
