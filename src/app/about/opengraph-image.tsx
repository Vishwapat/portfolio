import { ogSize, renderOg } from "@/lib/og";

export const alt = "About, Vishwa Patel";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    sheet: "02",
    eyebrow: "About",
    title: "Teacher first. Engineer next.",
    subtitle: "Four years teaching, a professional licence, and now Computer Science at Western.",
  });
}
