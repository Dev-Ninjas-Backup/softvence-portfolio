import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox","--hide-scrollbars","--force-device-scale-factor=1"]});
const page = await browser.newPage();
await page.setViewport({width:1920,height:1200,deviceScaleFactor:1});
await page.goto("http://localhost:3000/",{waitUntil:"networkidle0",timeout:60000});
await new Promise(r=>setTimeout(r,1200));
const out = await page.evaluate(async () => {
  await document.fonts.ready;
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  const res = [];
  for (const size of [24,26,28,30,32,34,36,37,38,40]) {
    for (const weight of [500,600,700]) {
      for (const ls of [-0.48, 0, -0.02]) {
        ctx.font = `${weight} ${size}px Manrope`;
        const m = ctx.measureText("Softvence");
        const lsPx = ls === -0.02 ? -0.02*size : ls;
        // letter-spacing adds n-1 gaps to the ink span (last gap trails)
        const extra = lsPx * ("Softvence".length - 1);
        const w = m.actualBoundingBoxRight + m.actualBoundingBoxLeft + extra;
        const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        res.push({size,weight,ls,inkW: Math.round(w*100)/100, inkH: Math.round(h*100)/100});
      }
    }
  }
  return {res, families: getComputedStyle(document.querySelector("header a")).fontFamily};
});
console.log("families:", out.families);
console.log("target  inkW=172  inkH=28");
for (const r of out.res) {
  const dw = Math.abs(r.inkW-172), dh = Math.abs(r.inkH-28);
  console.log(`size=${String(r.size).padStart(2)} w=${r.weight} ls=${String(r.ls).padStart(5)}  ink ${String(r.inkW).padStart(7)}x${String(r.inkH).padStart(6)}   err w=${dw.toFixed(1)} h=${dh.toFixed(1)} sum=${(dw+dh).toFixed(1)}`);
}
await browser.close();
