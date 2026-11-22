import { site } from "@/config/site";
import { loadPortrait, ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name}, software engineer`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg({
    photo: await loadPortrait(),
    sheet: "00",
    eyebrow: "Portfolio",
    title: "Vishwa Patel",
    subtitle:
      "Computer Science at Western. Full stack software, built and shipped to production standards.",
  });
}
