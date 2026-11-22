// renders page one of public/resume.pdf to an optimized webp preview
// usage: node scripts/resume-preview.mjs  (needs poppler's pdftoppm locally)
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const pdf = "public/resume.pdf";
const out = "src/assets/resume-preview.webp";
const dir = mkdtempSync(join(tmpdir(), "resume-"));

try {
  execFileSync("pdftoppm", ["-png", "-r", "220", "-f", "1", "-l", "1", pdf, join(dir, "page")]);
  const info = await sharp(join(dir, "page-1.png")).webp({ quality: 88, effort: 6 }).toFile(out);
  console.log(`wrote ${out} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
