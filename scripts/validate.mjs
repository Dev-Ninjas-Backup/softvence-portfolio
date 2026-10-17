import { readFileSync, readdirSync, statSync } from "node:fs";
import { PNG } from "pngjs";

const dir = "public/figma";
const bad = [];
for (const name of readdirSync(dir)) {
  if (!name.endsWith(".png")) continue;
  const p = `${dir}/${name}`;
  const size = statSync(p).size;
  try {
    const img = PNG.sync.read(readFileSync(p));
    if (!img || !img.width) throw new Error("no dims");
  } catch (e) {
    bad.push([name, size, e.message]);
  }
}
console.log(`checked ${readdirSync(dir).filter((n) => n.endsWith(".png")).length} png files`);
if (bad.length === 0) console.log("all decodable");
for (const [n, s, m] of bad) console.log(`BROKEN  ${n}  ${s}B  ${m}`);
