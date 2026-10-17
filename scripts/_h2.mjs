import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox","--hide-scrollbars","--force-device-scale-factor=1"]});
const page = await browser.newPage();
await page.setViewport({width:1920,height:1200,deviceScaleFactor:1});
await page.goto("http://localhost:3000/",{waitUntil:"networkidle0",timeout:60000});
await new Promise(r=>setTimeout(r,1200));
const info = await page.evaluate(() => {
  const h2 = document.querySelector("section#services h2");
  const cs = getComputedStyle(h2);
  const tn = h2.firstChild;
  const r = document.createRange();
  r.selectNodeContents(h2);
  const rects = [...r.getClientRects()].map(q => ({x: Math.round(q.x*100)/100, w: Math.round(q.width*100)/100, y: Math.round(q.y*100)/100, h: Math.round(q.height*100)/100}));
  // per-word rects
  const words = [];
  const text = tn.textContent;
  let idx = 0;
  for (const w of text.split(/\s+/)) {
    const s = text.indexOf(w, idx);
    idx = s + w.length;
    const rr = document.createRange();
    rr.setStart(tn, s); rr.setEnd(tn, s + w.length);
    const q = rr.getBoundingClientRect();
    words.push({w, x: Math.round(q.x*100)/100, w2: Math.round(q.width*100)/100, y: Math.round(q.y*100)/100});
  }
  return {
    text: h2.textContent,
    font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, lh: cs.lineHeight,
    maxW: cs.maxWidth, smoothing: cs.webkitFontSmoothing,
    rect: (()=>{const q=h2.getBoundingClientRect();return {x:q.x,y:q.y,w:q.width,h:q.height};})(),
    lines: rects, words,
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
