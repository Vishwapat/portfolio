import { getProject, projects } from "@/content/projects";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project case study by Vishwa Patel";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({
    sheet: "01",
    eyebrow: "Work",
    title: project?.title ?? "Work",
    subtitle: project?.summary,
  });
}
