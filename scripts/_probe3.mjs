import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:true,args:["--no-sandbox","--hide-scrollbars","--force-device-scale-factor=1"]});
const page = await browser.newPage();
await page.setViewport({width:1920,height:1200,deviceScaleFactor:1});
await page.goto("http://localhost:3000/",{waitUntil:"networkidle0",timeout:60000});
const H = async (tag) => {
  const r = await page.evaluate(() => {
    const s = document.querySelector("section#services");
    const rows = [...s.querySelectorAll(":scope > div > div")].map(d=>Math.round(d.getBoundingClientRect().height));
    return {h: Math.round(s.getBoundingClientRect().height), rows, fonts: document.fonts.status};
  });
  console.log(tag.padEnd(28), "sectionH=", r.h, "fonts=", r.fonts, "rows=", JSON.stringify(r.rows));
};
await H("t=0 (just loaded)");
await new Promise(r=>setTimeout(r,1500));
await H("t=1500ms");
await page.evaluate(()=>document.fonts.ready);
await H("after fonts.ready");
await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}window.scrollTo(0,0);});
await new Promise(r=>setTimeout(r,800));
await H("after scroll-through");
await new Promise(r=>setTimeout(r,2000));
await H("after extra settle");
await browser.close();
