import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { ArrowRight } from "@/components/ui/icons";

interface ProjectRowProps {
  project: Project;
  index: number;
}

/** one ruled row per project; the title morphs into the case study heading */
export function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <li className="border-b border-rule first:border-t">
      <Link
        href={`/work/${project.slug}`}
        className="group -mx-3 grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-4 px-3 py-6 transition-colors hover:bg-bg-sunk md:grid-cols-[3rem_1fr_16rem_6rem] md:gap-x-8 md:py-8"
      >
        <span className="label tabular pt-2">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0">
          <ViewTransition name={`title-${project.slug}`} share="title-morph" default="none">
            <span className="block font-serif text-3xl leading-tight transition-colors group-hover:text-accent md:text-4xl">
              {project.title}
            </span>
          </ViewTransition>
          <span className="mt-2 block max-w-[52ch] text-pretty text-fg-soft">
            {project.summary}
          </span>
        </span>
        <span className="label hidden pt-3 leading-relaxed md:block">
          {project.stack.slice(0, 4).join(" / ")}
        </span>
        <span className="flex items-center justify-end gap-3 pt-2">
          <span className="label tabular hidden md:inline">{project.year}</span>
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </li>
  );
}
