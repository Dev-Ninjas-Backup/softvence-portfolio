// Coarse diff heat map between two PNGs, printed as a text grid.
// Usage: node scripts/diffgrid.mjs <a.png> <b.png> [cols] [rows] [threshold]
import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [aPath, bPath, colsArg, rowsArg, thresholdArg] = process.argv.slice(2);
const cols = Number(colsArg ?? 16);
const rows = Number(rowsArg ?? 20);
const threshold = Number(thresholdArg ?? 0.1);

const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));
const width = Math.min(a.width, b.width);
const height = Math.min(a.height, b.height);
console.log(`A ${a.width}x${a.height}  B ${b.width}x${b.height}  compared ${width}x${height}`);

const normalize = (img) => {
  if (img.width === width && img.height === height) return img;
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const from = (img.width * y + x) << 2;
      const to = (width * y + x) << 2;
      out.data[to] = img.data[from];
      out.data[to + 1] = img.data[from + 1];
      out.data[to + 2] = img.data[from + 2];
      out.data[to + 3] = img.data[from + 3];
    }
  }
  return out;
};

const na = normalize(a);
const nb = normalize(b);
const diff = new PNG({ width, height });
const mismatched = pixelmatch(na.data, nb.data, diff.data, width, height, {
  threshold,
  includeAA: false,
});

const cellW = Math.ceil(width / cols);
const cellH = Math.ceil(height / rows);
const scale = " .:-=+*#%@";

console.log(`total mismatch ${((mismatched / (width * height)) * 100).toFixed(2)}%`);
console.log(`cell ${cellW}x${cellH}px  (row = y range, col = x range)`);

// column ruler
let ruler = "     ";
for (let c = 0; c < cols; c++) ruler += String(c % 10);
console.log(ruler);

for (let r = 0; r < rows; r++) {
  const y0 = r * cellH;
  const y1 = Math.min(y0 + cellH, height);
  let line = "";
  for (let c = 0; c < cols; c++) {
    const x0 = c * cellW;
    const x1 = Math.min(x0 + cellW, width);
    let bad = 0;
    let count = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (width * y + x) << 2;
        // pixelmatch paints mismatching pixels red-ish in the diff buffer
        if (diff.data[i] > 200 && diff.data[i + 1] < 80) bad++;
        count++;
      }
    }
    const pct = count ? bad / count : 0;
    line += scale[Math.min(scale.length - 1, Math.round(pct * 12))];
  }
  console.log(`${String(y0).padStart(5)} ${line}`);
}
