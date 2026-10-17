import { readFileSync } from "node:fs";

const j = JSON.parse(readFileSync(new URL("../.figma/full-765-4866.json", import.meta.url)));
const out = [];
function walk(n) {
  if (!n || typeof n !== "object") return;
  const trf = n.boundVariables?.textRangeFills || n.textRangeFills;
  if (trf) {
    out.push({ id: n.id, name: n.name, chars: n.characters, fills: n.fills, trf: trf.map(Number) });
  }
  for (const k of n.children || []) walk(k);
}
walk(j);
for (const o of out) console.log(JSON.stringify(o));
