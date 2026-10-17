import { readFileSync } from "node:fs";

const j = JSON.parse(readFileSync(new URL("../.figma/full-765-4866.json", import.meta.url)));
const root = process.argv[2];

function find(n, id) {
  if (n.id === id) return n;
  for (const k of n.children || []) {
    const r = find(k, id);
    if (r) return r;
  }
  return null;
}

const doc = Object.values(j.nodes)[0].document;
const node = find(doc, root);
if (!node) throw new Error("not found " + root);

function fmt(n, d) {
  const bb = n.absoluteBoundingBox
    ? `xy=${Math.round(n.absoluteBoundingBox.x - node.absoluteBoundingBox.x)},${Math.round(
        n.absoluteBoundingBox.y - node.absoluteBoundingBox.y,
      )} ${Math.round(n.absoluteBoundingBox.width)}x${Math.round(n.absoluteBoundingBox.height)}`
    : "";
  const layout = n.layoutMode
    ? ` flex-${n.layoutMode === "HORIZONTAL" ? "h" : "v"} gap=${n.itemSpacing ?? 0} pad=${[
        n.paddingTop,
        n.paddingRight,
        n.paddingBottom,
        n.paddingLeft,
      ].join("/")} ${n.primaryAxisAlignItems ?? ""}/${n.counterAxisAlignItems ?? ""} ${
        n.layoutSizingHorizontal ?? ""
      }/${n.layoutSizingVertical ?? ""}`
    : "";
  const fill =
    n.fills?.length && n.fills[0].type === "SOLID"
      ? ` fill=rgba(${(n.fills[0].color.r * 255) | 0},${(n.fills[0].color.g * 255) | 0},${(
          n.fills[0].color.b * 255
        ) | 0},${n.fills[0].opacity ?? 1})`
      : "";
  const txt = n.type === "TEXT" ? ` "${(n.characters ?? "").replace(/\n/g, "\\n")}"` : "";
  console.log(
    `${"  ".repeat(d)}${n.id} <${n.type}> ${n.name} ${bb}${layout}${fill}${txt}`,
  );
  for (const k of n.children || []) fmt(k, d + 1);
}
fmt(node, 0);
