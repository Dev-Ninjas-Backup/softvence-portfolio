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

const root = find(doc, process.argv[2]);
const rx = root.absoluteBoundingBox.x;
const ry = root.absoluteBoundingBox.y;
for (const id of process.argv.slice(3)) {
  const n = find(doc, id);
  if (!n) {
    console.log(id, "NOT FOUND");
    continue;
  }
  const b = n.absoluteBoundingBox;
  console.log(
    id.padEnd(10),
    n.name.slice(0, 28).padEnd(30),
    `x=${Math.round(b.x - rx)} y=${Math.round(b.y - ry)} w=${Math.round(b.width)} h=${Math.round(b.height)}`,
  );
}
