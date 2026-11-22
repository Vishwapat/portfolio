import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 } as const;

const fontDir = join(process.cwd(), "src/assets/fonts");

/** satori wants an ArrayBuffer; cached reads come back as Uint8Array */
export function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

/** reads a font from src/assets/fonts once per build */
export async function loadFont(file: string): Promise<Uint8Array> {
  "use cache";
  return new Uint8Array(await readFile(join(fontDir, file)));
}

async function loadFonts() {
  const [serif, serifItalic, mono, sans] = (
    await Promise.all([
      loadFont("InstrumentSerif-Regular.ttf"),
      loadFont("InstrumentSerif-Italic.ttf"),
      loadFont("GeistMono-Regular.ttf"),
      loadFont("Geist-Regular.ttf"),
    ])
  ).map(toArrayBuffer);
  return [
    { name: "Serif", data: serif!, style: "normal" as const, weight: 400 as const },
    { name: "Serif", data: serifItalic!, style: "italic" as const, weight: 400 as const },
    { name: "Mono", data: mono!, style: "normal" as const, weight: 400 as const },
    { name: "Sans", data: sans!, style: "normal" as const, weight: 400 as const },
  ];
}

const ink = "#0b0e16";
const paper = "#ece7de";
const muted = "#959bad";
const rule = "#2a3040";
const amber = "#f2a33a";

interface OgOptions {
  sheet: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** shared 1200x630 share card in the title block style of the site */
export async function renderOg({ sheet, eyebrow, title, subtitle }: OgOptions) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: ink,
        color: paper,
        padding: "56px 64px",
        fontFamily: "Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Mono",
          fontSize: 20,
          letterSpacing: 3,
          color: muted,
          textTransform: "uppercase",
        }}
      >
        <span>{`Sheet ${sheet} / ${eyebrow}`}</span>
        <span>vishwapat.vercel.app</span>
      </div>
      <div style={{ display: "flex", height: 1, background: rule, marginTop: 24 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Serif",
            fontSize: title.length > 28 ? 84 : 112,
            lineHeight: 1,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              color: muted,
              maxWidth: 940,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", height: 1, background: rule }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              background: paper,
              color: ink,
              fontFamily: "Serif",
              fontSize: 26,
            }}
          >
            VP
          </div>
          <span style={{ marginLeft: 16, fontSize: 26 }}>Vishwa Patel</span>
        </div>
        <div style={{ display: "flex", width: 72, height: 6, background: amber }} />
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
