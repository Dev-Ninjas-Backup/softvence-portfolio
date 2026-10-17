// Inspect rendered geometry in the browser.
// Usage: node scripts/measure.mjs [selector] [width]
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [selectorArg, widthArg] = process.argv.slice(2);
const width = Number(widthArg ?? 1920);
const url = process.env.SHOOT_URL ?? "http://localhost:3000/";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1200, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 300));

  const result = await page.evaluate((selector) => {
    const scoped = selector ? document.querySelector(selector) : document.body;
    if (!scoped) return { error: `selector not found: ${selector}` };
    const base = scoped.getBoundingClientRect();
    const rows = [];

    const describe = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className || "").toString().slice(0, 70),
        x: Math.round(r.left - base.left),
        y: Math.round(r.top - base.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
        font: `${cs.fontSize}/${cs.lineHeight} ${cs.fontWeight}`,
        color: cs.color,
      };
    };

    rows.push({ kind: "container", ...describe(scoped) });

    scoped.querySelectorAll("img").forEach((img) => {
      rows.push({
        kind: "img",
        src: img.getAttribute("src"),
        natural: `${img.naturalWidth}x${img.naturalHeight}`,
        visible: img.complete && img.naturalWidth > 0,
        ...describe(img),
      });
    });

    scoped.querySelectorAll("h1,h2,h3,h4,p,span,a").forEach((el) => {
      if (el.children.length === 0 && el.textContent?.trim()) {
        rows.push({ kind: "text", text: el.textContent.trim().slice(0, 40), ...describe(el) });
      }
    });

    return { height: Math.round(base.height), rows };
  }, selectorArg);

  if (result.error) {
    console.error(result.error);
    process.exitCode = 1;
  } else {
    console.log(`container height: ${result.height}`);
    const broken = result.rows.filter((r) => r.kind === "img" && !r.visible);
    if (broken.length) console.log(`BROKEN IMAGES: ${broken.length}`);
    for (const r of result.rows) {
      const head = [r.kind.padEnd(9), String(r.x).padStart(6), String(r.y).padStart(6), String(r.w).padStart(6), String(r.h).padStart(6)].join(" ");
      if (r.kind === "img") console.log(`${head}  ${r.visible ? "ok " : "BAD"} ${r.natural.padEnd(11)} ${r.src}`);
      else if (r.kind === "text") console.log(`${head}  "${r.text}" [${r.font}]`);
      else console.log(`${head}  <${r.tag}> ${r.cls}`);
    }
  }
} finally {
  await browser.close();
}
