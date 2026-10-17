// Compare two PNGs and report how many pixels differ.
// Usage: node scripts/diff.mjs <a.png> <b.png> [diff-out.png] [threshold]
import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [aPath, bPath, outPath, thresholdArg] = process.argv.slice(2);
const threshold = Number(thresholdArg ?? 0.1);

const a = PNG.sync.read(readFileSync(aPath));
const b = PNG.sync.read(readFileSync(bPath));

const width = Math.min(a.width, b.width);
const height = Math.min(a.height, b.height);
const sizeMismatch = a.width !== b.width || a.height !== b.height;

const crop = (img) => {
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

const ca = crop(a);
const cb = crop(b);
const diff = new PNG({ width, height });
const mismatched = pixelmatch(ca.data, cb.data, diff.data, width, height, {
  threshold,
  includeAA: false,
});

const total = width * height;
console.log(`A: ${aPath} ${a.width}x${a.height}`);
console.log(`B: ${bPath} ${b.width}x${b.height}`);
if (sizeMismatch) console.log("!! size mismatch, compared top-left overlap only");
console.log(`mismatched pixels: ${mismatched} / ${total} (${((mismatched / total) * 100).toFixed(3)}%)`);
if (outPath) {
  writeFileSync(outPath, PNG.sync.write(diff));
  console.log(`diff written to ${outPath}`);
}
