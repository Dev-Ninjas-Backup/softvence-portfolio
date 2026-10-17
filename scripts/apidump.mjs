// Print condensed Figma API style info for given node ids.
// Usage: node scripts/apidump.mjs <id> [<id> ...]
import { readFileSync } from "node:fs";

const j = JSON.parse(readFileSync(new URL("../.figma/full-765-4866.json", import.meta.url)));
const doc = Object.values(j.nodes)[0].document;

const all = new Map();
(function walk(n) {
  all.set(n.id, n);
  for (const c of n.children || []) walk(c);
})(doc);

const rgb = (f) => {
  if (!f || f.type !== "SOLID") return f?.type ?? "none";
  const c = f.color;
  return `#${[c.r, c.g, c.b]
    .map((v) => Math.round(v * 255).toString(16).padStart(2, "0"))
    .join("")}@${f.opacity ?? 1}`;
};

for (const id of process.argv.slice(2)) {
  const n = all.get(id);
  if (!n) {
    console.log(id, "MISSING");
    continue;
  }
  const st = n.style || {};
  const parts = [
    id,
    n.name,
    `${n.type}`,
    n.absoluteBoundingBox
      ? `${Math.round(n.absoluteBoundingBox.x)},${Math.round(n.absoluteBoundingBox.y)} ${Math.round(
          n.absoluteBoundingBox.width,
        )}x${Math.round(n.absoluteBoundingBox.height)}`
      : "",
    n.rotation ? `rot=${n.rotation}` : "",
    st.fontFamily ? `${st.fontFamily} ${st.fontWeight} ${st.fontSize}px lh${st.lineHeightPx} ls${st.letterSpacing} ${st.textCase ?? ""} ${st.textAlignHorizontal}` : "",
    (n.fills || []).map(rgb).filter((x) => x !== "none").join(",") ? `fill=${(n.fills || []).map(rgb).join(",")}` : "",
    n.strokes?.length ? `stroke=${(n.strokes || []).map(rgb).join(",")} w${n.strokeWeight} ${n.strokeAlign}` : "",
    n.cornerRadius ? `r=${n.cornerRadius}` : "",
    (n.effects || []).map((e) => `${e.type} ${e.x},${e.y} ${e.radius} ${e.spread ?? ""} ${rgb(e.color ?? {})}`).join(" | "),
    n.layoutMode ? `flex-${n.layoutMode === "HORIZONTAL" ? "h" : "v"} gap=${n.itemSpacing} pad=${n.paddingTop}/${n.paddingRight}/${n.paddingBottom}/${n.paddingLeft} ${n.primaryAxisAlignItems ?? ""}/${n.counterAxisAlignItems ?? ""}` : "",
    n.characters ? JSON.stringify(n.characters) : "",
    n.opacity !== 1 ? `op=${n.opacity}` : "",
  ].filter(Boolean);
  console.log(parts.join("  "));
}
