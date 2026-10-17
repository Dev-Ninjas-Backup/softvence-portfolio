import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const m = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const f = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));

const g = (img, x, y) => img.data[((img.width * y + x) << 2)];

// Card 1 interior: local y 40 (page 422) is clear of content top (426) barely;
// use local y 20..30 (page 402..412) which is empty background.
for (const localY of [20, 30]) {
  const y = 382 + localY;
  const out = [];
  const deltas = [];
  for (let lx = 40; lx <= 1460; lx += 60) {
    const x = 220 + lx;
    const a = g(m, x, y);
    const b = g(f, x, y);
    out.push(`${lx}:${a}/${b}`);
    deltas.push(b - a);
  }
  console.log(`localY=${localY} (page y=${y})  mine/figma`);
  console.log("  " + out.join(" "));
  console.log("  delta:", deltas.join(" "));
}

// vertical profile at local x=700 (page 920), y from 400..940 in steps
console.log("\nvertical (local x=700)");
const out = [];
for (let ly = 30; ly <= 550; ly += 40) {
  const y = 382 + ly;
  const x = 220 + 700;
  out.push(`${ly}:${g(m, x, y)}/${g(f, x, y)}`);
}
console.log("  " + out.join(" "));
