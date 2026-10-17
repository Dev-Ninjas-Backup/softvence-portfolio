import { readFileSync } from "node:fs";

const txt = readFileSync(0, "utf8");
for (const line of txt.trim().split("\n")) {
  if (!line.startsWith("{")) {
    console.log(line);
    continue;
  }
  const o = JSON.parse(line);
  const fill = (o.fills || [])
    .map((f) =>
      f.type === "SOLID"
        ? `#${[f.color.r, f.color.g, f.color.b]
            .map((v) => Math.round(v * 255).toString(16).padStart(2, "0"))
            .join("")}@${f.color.a ?? 1}`
        : f.type === "GRADIENT_LINEAR"
          ? `lin[${f.gradientStops.map((s) => `${s.position}:#${Math.round(s.color.r * 255).toString(16).padStart(2, "0")}${Math.round(s.color.g * 255).toString(16).padStart(2, "0")}${Math.round(s.color.b * 255).toString(16).padStart(2, "0")}@${s.color.a ?? 1}`).join(",")}]`
          : f.type,
    )
    .join("+");
  const stroke = (o.strokes || [])
    .map((f) =>
      f.type === "SOLID"
        ? `#${[f.color.r, f.color.g, f.color.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("")}`
        : f.type,
    )
    .join("+");
  const st = o.style || {};
  const txtBit = o.characters
    ? `"${o.characters.slice(0, 24)}" [${st.fontFamily} ${st.fontStyle} ${st.fontSize} lh${st.lineHeightPx} ls${st.letterSpacing}]`
    : "";
  console.log(
    [
      o.id.padEnd(9),
      (o.name || "").slice(0, 18).padEnd(19),
      `[${o.box.map((v) => Math.round(v)).join(",")}]`.padEnd(24),
      o.layoutMode || "",
      o.cornerRadius ? `r${Math.round(o.cornerRadius * 100) / 100}` : "",
      fill ? `fill=${fill}` : "",
      o.strokes && o.strokes.length ? `st=${stroke}/${o.strokeWeight ?? ""}` : "",
      o.effects && o.effects.length ? `fx=${JSON.stringify(o.effects)}` : "",
      txtBit,
    ]
      .filter(Boolean)
      .join(" "),
  );
}
