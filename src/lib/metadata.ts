import type { Metadata } from "next";
import { site } from "@/config/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: `/${string}`;
}

/** per page metadata with canonical url and matching open graph fields */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: `${title} | ${site.name}`,
      description,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
