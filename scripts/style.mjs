import { readFileSync } from "node:fs";

const j = JSON.parse(readFileSync(new URL("../.figma/full-765-4866.json", import.meta.url)));
const doc = Object.values(j.nodes)[0].document;

function find(n, id) {
  if (n.id === id) return n;
  for (const k of n.children || []) {
    const r = find(k, id);
    if (r) return r;
  }
  return null;
}

for (const id of process.argv.slice(2)) {
  const n = find(doc, id);
  if (!n) {
    console.log(id, "NOT FOUND");
    continue;
  }
  const s = n.style || {};
  console.log(
    id,
    JSON.stringify({
      chars: n.characters,
      font: s.fontFamily,
      style: s.fontStyle,
      weight: s.fontWeight,
      size: s.fontSize,
      ls: s.letterSpacing,
      lh: s.lineHeightPx,
      align: s.textAlignHorizontal,
      upper: s.textCase,
    }),
  );
}
