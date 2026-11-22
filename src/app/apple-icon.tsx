import { ImageResponse } from "next/og";
import { loadFont, toArrayBuffer } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** ios masks the corners itself, so the tile stays square edge to edge */
export default async function AppleIcon() {
  const serif = toArrayBuffer(await loadFont("InstrumentSerif-Regular.ttf"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#12172a",
        color: "#f6f3ec",
        fontFamily: "Serif",
        fontSize: 96,
      }}
    >
      <span>VP</span>
      <div style={{ display: "flex", width: 56, height: 6, marginTop: 6, background: "#f2a33a" }} />
    </div>,
    { ...size, fonts: [{ name: "Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
