// Log bounding boxes of elements inside a root selector.
// Usage: node scripts/boxes.mjs <rootSelector> [childSelector]
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const rootSel = process.argv[2] ?? "body";
const childSel = process.argv[3] ?? "img";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1200));

const data = await page.evaluate(
  (root, child) => {
    const r = document.querySelector(root);
    if (!r) return { error: "no root " + root };
    const rb = r.getBoundingClientRect();
    const out = [];
    for (const el of r.querySelectorAll(child)) {
      const b = el.getBoundingClientRect();
      out.push({
        tag: el.tagName,
        src: (el.getAttribute("src") ?? "").slice(0, 46),
        text: (el.textContent ?? "").trim().slice(0, 34),
        x: Math.round(b.x - rb.x),
        y: Math.round(b.y - rb.top),
        w: Math.round(b.width),
        h: Math.round(b.height),
      });
    }
    return { root: `${Math.round(rb.width)}x${Math.round(rb.height)}`, out };
  },
  rootSel,
  childSel,
);

console.log("ROOT " + data.root);
for (const o of data.out) {
  console.log(
    [
      String(o.y).padStart(5),
      String(o.x).padStart(5),
      `${o.w}x${o.h}`.padEnd(10),
      o.tag.padEnd(5),
      (o.src || o.text).replace(/\s+/g, " ").slice(0, 44),
    ].join(" "),
  );
}
await browser.close();
