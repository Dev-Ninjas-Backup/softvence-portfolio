import { readFileSync } from "node:fs";

const j = JSON.parse(readFileSync(new URL("../.figma/full-765-4866.json", import.meta.url)));
const ids = process.argv.slice(2);
const out = [];
function walk(n) {
  if (!n || typeof n !== "object") return;
  if (ids.includes(n.id)) {
    out.push({
      id: n.id,
      chars: n.characters,
      overrides: n.characterStyleOverrides,
      table: n.styleOverrideTable,
    });
  }
  for (const k of n.children || []) walk(k);
}
for (const node of Object.values(j.nodes || {})) walk(node.document ?? node);
for (const o of out) {
  console.log("=== " + o.id + " :: " + JSON.stringify(o.chars));
  console.log("overrides:", JSON.stringify(o.overrides));
  console.log("table:", JSON.stringify(o.table));
}
