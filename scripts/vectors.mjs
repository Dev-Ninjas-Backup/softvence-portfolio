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

function walk(n) {
  const b = n.absoluteBoundingBox;
  const geo = n.fillGeometry || n.strokeGeometry;
  const paths = geo ? geo.map((g) => g.path).join(" | ") : "";
  const fill = n.fills
    ? n.fills
        .map((f) =>
          f.type === "SOLID"
            ? JSON.stringify(f.color)
            : f.type === "GRADIENT_LINEAR"
              ? `lin(${f.gradientStops
                  .map((s) => `${s.position}:${JSON.stringify(s.color)}`)
                  .join(",")})`
              : f.type,
        )
        .join("+")
    : "";
  console.log(
    n.id.padEnd(9),
    (n.name || "").slice(0, 22).padEnd(23),
    `${Math.round(b.x - rx)},${Math.round(b.y - ry)} ${Math.round(b.width)}x${Math.round(b.height)}`.padEnd(22),
    (n.strokes ? "S" : " "),
    fill.slice(0, 90),
  );
  if (paths) console.log("    path:", paths);
  for (const k of n.children || []) walk(k);
}

walk(root);
