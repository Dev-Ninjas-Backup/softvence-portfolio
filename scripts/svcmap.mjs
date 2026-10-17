import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const mine = PNG.sync.read(readFileSync("/tmp/services-mine.png"));
const base = PNG.sync.read(readFileSync(".figma/shots/765-6379.png"));

const X0 = 1168, Y0 = 2890, S = 488, N = 24, C = S / N;

console.log("Mismatch map for card5 image (each cell = 20x20px). # >60%, + >25%, . >5%, ' ' <=5%");
for (let gy = 0; gy < N; gy++) {
  let row = "";
  for (let gx = 0; gx < N; gx++) {
    let bad = 0;
    for (let y = 0; y < C; y++)
      for (let x = 0; x < C; x++) {
        const i = (mine.width * (Y0 + gy * C + y) + X0 + gx * C + x) << 2;
        let d = 0;
        for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(mine.data[i + c] - base.data[i + c]));
        if (d > 8) bad++;
      }
    const f = bad / (C * C);
    row += f > 0.6 ? "#" : f > 0.25 ? "+" : f > 0.05 ? "." : " ";
  }
  console.log(`  ${String(gy * C).padStart(3)} ${row}`);
}
