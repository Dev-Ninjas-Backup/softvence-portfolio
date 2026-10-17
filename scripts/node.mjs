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
  const b = n.absoluteBoundingBox;
  const out = {
    id: n.id,
    name: n.name,
    box: [b.x, b.y, b.width, b.height].map((v) => Math.round(v * 100) / 100),
    fills: n.fills,
    strokes: n.strokes,
    strokeWeight: n.strokeWeight,
    strokeAlign: n.strokeAlign,
    cornerRadius: n.cornerRadius,
    rectangleCornerRadii: n.rectangleCornerRadii,
    effects: n.effects,
    layoutMode: n.layoutMode,
    itemSpacing: n.itemSpacing,
    paddingLeft: n.paddingLeft,
    paddingRight: n.paddingRight,
    paddingTop: n.paddingTop,
    paddingBottom: n.paddingBottom,
    primaryAxisAlignItems: n.primaryAxisAlignItems,
    counterAxisAlignItems: n.counterAxisAlignItems,
    characters: n.characters,
    style: n.style,
  };
  console.log(JSON.stringify(out));
}
