import { ImageResponse } from "next/og";
import { loadFont, toArrayBuffer } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const serif = toArrayBuffer(await loadFont("InstrumentSerif-Regular.ttf"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#12172a",
        color: "#f6f3ec",
        fontFamily: "Serif",
        fontSize: 38,
        borderBottom: "6px solid #f2a33a",
      }}
    >
      VP
    </div>,
    { ...size, fonts: [{ name: "Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
