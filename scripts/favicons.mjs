// renders the vp mark at every icon size and writes favicon.ico, icon.svg and manifest pngs
// usage: node scripts/favicons.mjs
// the svg step needs satori, installed only for the run: npm i --no-save satori
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import sharp from "sharp";

const ink = "#12172a";
const paper = "#f6f3ec";
const amber = "#f2a33a";
const font = (await readFile("src/assets/fonts/InstrumentSerif-Regular.ttf")).toString("base64");

// small sizes get a heavier, larger mark so it survives 16px
const markup = (size) => {
  const small = size <= 32;
  const fontSize = Math.round(size * (small ? 0.74 : 0.6));
  const bar = Math.max(1, Math.round(size * (small ? 0.09 : 0.06)));
  return `<!doctype html><html><head><style>
    @font-face { font-family: Serif; src: url(data:font/ttf;base64,${font}); }
    html, body { margin: 0; width: ${size}px; height: ${size}px; }
    body { background: ${ink}; display: flex; flex-direction: column; align-items: center;
      justify-content: center; font-family: Serif; color: ${paper}; overflow: hidden; }
    span { font-size: ${fontSize}px; line-height: 0.8; letter-spacing: ${small ? "-0.06em" : "-0.02em"};
      ${small ? "-webkit-text-stroke: " + size / 64 + "px " + paper + ";" : ""} }
    i { display: block; width: ${Math.round(size * 0.38)}px; height: ${bar}px; background: ${amber};
      margin-top: ${Math.round(size * 0.07)}px; }
  </style></head><body><span>VP</span><i></i></body></html>`;
};

const browser = await chromium.launch();
const page = await browser.newPage();
const render = async (size) => {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(markup(size));
  await page.evaluate(() => document.fonts.ready);
  return page.screenshot({ type: "png" });
};

// render big and downsample for clean antialiasing at tiny sizes
const pngAt = async (size) =>
  sharp(await render(size * 4))
    .resize(size, size)
    .ensureAlpha()
    .png()
    .toBuffer();

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(pngAt));
const icon192 = await pngAt(192);
const icon512 = await sharp(await render(512))
  .png()
  .toBuffer();
await browser.close();

// ico container with embedded png frames
const header = Buffer.alloc(6 + 16 * icoImages.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = header.length;
icoImages.forEach((img, i) => {
  const entry = 6 + i * 16;
  header.writeUInt8(icoSizes[i] % 256, entry);
  header.writeUInt8(icoSizes[i] % 256, entry + 1);
  header.writeUInt8(0, entry + 2);
  header.writeUInt8(0, entry + 3);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(img.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += img.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...icoImages]));
await writeFile("public/icon-192.png", icon192);
await writeFile("public/icon-512.png", icon512);

// vector favicon: satori converts the serif glyphs to paths, so no font ships with the svg.
// kept out of package.json since it is a one off build tool with an open upstream advisory
const satori = await import("satori").then((m) => m.default).catch(() => null);
const fontData = await readFile("src/assets/fonts/InstrumentSerif-Regular.ttf");
if (satori) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 64,
          height: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: ink,
          color: paper,
          fontFamily: "Serif",
        },
        children: [
          {
            type: "span",
            props: {
              style: {
                fontSize: 40,
                lineHeight: 0.8,
                letterSpacing: -1.5,
                WebkitTextStroke: "0.9px #f6f3ec",
              },
              children: "VP",
            },
          },
          {
            type: "div",
            props: { style: { width: 24, height: 4, marginTop: 5, background: amber } },
          },
        ],
      },
    },
    {
      width: 64,
      height: 64,
      fonts: [{ name: "Serif", data: fontData, weight: 400, style: "normal" }],
    },
  );
  await writeFile("src/app/icon.svg", svg + "\n");
  console.log("wrote icon.svg");
} else {
  console.log("satori not installed, kept existing icon.svg");
}
console.log("wrote favicon.ico (16, 32, 48), icon-192.png, icon-512.png");
