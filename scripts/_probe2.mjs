import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox","--hide-scrollbars","--force-device-scale-factor=1"]});
const page = await browser.newPage();
await page.setViewport({width:1920,height:1200,deviceScaleFactor:1});
await page.goto("http://localhost:3000/",{waitUntil:"networkidle0",timeout:60000});
await new Promise(r=>setTimeout(r,1500));
const out = await page.evaluate(() => {
  const sec = document.querySelector("section#services");
  if (!sec) return {err:"no section#services"};
  const r = sec.getBoundingClientRect();
  const kids = [...sec.children].map(c=>{const b=c.getBoundingClientRect();return {tag:c.tagName, cls:(c.className||"").toString().slice(0,70), y:Math.round(b.y+window.scrollY), h:Math.round(b.height)};});
  const imgs = [...sec.querySelectorAll("img")].map(i=>{const b=i.getBoundingClientRect();return {src:i.getAttribute("src"), y:Math.round(b.y+window.scrollY), w:Math.round(b.width), h:Math.round(b.height), nw:i.naturalWidth, nh:i.naturalHeight};});
  return {sectionY: Math.round(r.y+window.scrollY), sectionH: Math.round(r.height), kids, imgs};
});
console.log(JSON.stringify(out,null,1).slice(0,4000));
await browser.close();
