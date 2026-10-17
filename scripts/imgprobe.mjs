// Inspect how the browser lays out + decodes the services card images.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

const info = await page.evaluate(async () => {
  const imgs = [...document.querySelectorAll("section#services img")];
  const out = [];
  for (const img of imgs.slice(0, 3)) {
    const r = img.getBoundingClientRect();
    // decode + draw at natural size
    const cv = document.createElement("canvas");
    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;
    const ctx = cv.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    out.push({
      src: img.currentSrc || img.src,
      natural: [img.naturalWidth, img.naturalHeight],
      rect: [Math.round(r.width * 100) / 100, Math.round(r.height * 100) / 100],
      complete: img.complete,
      px00: [d[0], d[1], d[2], d[3]],
      canvasW: cv.width,
    });
  }
  return out;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
