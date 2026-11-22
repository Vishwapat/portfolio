import type { MetadataRoute } from "next";
import { nav } from "@/config/nav";
import { site } from "@/config/site";
import { projects } from "@/content/projects";

const lastModified = process.env.NEXT_PUBLIC_BUILD_DATE;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const work = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: project.cover ? [`${site.url}/work/${project.slug}/opengraph-image`] : undefined,
  }));

  return [...pages, ...work, { url: `${site.url}/resume.pdf`, lastModified, priority: 0.7 }];
}
