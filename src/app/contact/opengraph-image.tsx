import { ogSize, renderOg } from "@/lib/og";

export const alt = "Contact, Vishwa Patel";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    sheet: "04",
    eyebrow: "Contact",
    title: "Let's build something.",
    subtitle: "Open to 2027 internships and co-ops.",
  });
}
