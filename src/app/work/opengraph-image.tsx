import { ogSize, renderOg } from "@/lib/og";

export const alt = "Work, Vishwa Patel";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    sheet: "01",
    eyebrow: "Work",
    title: "Few projects. Finished properly.",
    subtitle: "Each one built end to end, tested and public.",
  });
}
