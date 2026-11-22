import { ogSize, renderOg } from "@/lib/og";

export const alt = "Resume, Vishwa Patel";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    sheet: "03",
    eyebrow: "Resume",
    title: "One page. Every line earned.",
    subtitle: "The same document I send to recruiters, typeset in LaTeX.",
  });
}
