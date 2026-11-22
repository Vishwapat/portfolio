import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAdjacentProjects, getProject, projects, type ProjectImage } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${slug}`,
  });
}

function Figure({ image, preload = false }: { image: ProjectImage; preload?: boolean }) {
  return (
    <figure className="mt-10">
      <div className="overflow-hidden border border-rule-strong bg-bg-sunk">
        <Image
          src={image.src}
          alt={image.alt}
          placeholder="blur"
          preload={preload}
          quality={90}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="label mt-3 normal-case">{image.caption}</figcaption>
    </figure>
  );
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const number = String(projects.indexOf(project) + 1).padStart(2, "0");
  const { previous, next } = getAdjacentProjects(slug);

  const spec = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status },
    { label: "Stack", value: project.stack.join(", ") },
  ];

  return (
    <article>
      <header className="pt-10 pb-10 md:pt-20">
        <Link href="/work" className="label inline-flex min-h-11 items-center gap-2 hover:text-fg">
          <ArrowLeft className="size-4" /> Sheet 01 / Work / {number}
        </Link>
        <ViewTransition name={`title-${project.slug}`} share="title-morph" default="none">
          <h1 className="mt-6 max-w-[18ch] font-serif text-title text-balance">{project.title}</h1>
        </ViewTransition>
        <p className="rise mt-6 max-w-[58ch] text-lg leading-relaxed text-fg-soft md:text-xl">
          {project.summary}
        </p>

        <dl className="mt-10 grid grid-cols-2 border-t border-rule-strong md:grid-cols-4">
          {spec.map((item) => (
            <div
              key={item.label}
              className="border-b border-rule py-3 pr-3 odd:border-r even:pl-3 md:border-r md:pl-3 md:first:pl-0 md:last:border-r-0"
            >
              <dt className="label">{item.label}</dt>
              <dd className="mt-1 text-sm leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium"
            >
              <span className="link-draw">{link.label}</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </header>

      {project.cover ? <Figure image={project.cover} preload /> : null}

      <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-10">
        <section aria-labelledby="problem" className="md:col-span-12">
          <SectionHeading index="A" id="problem">
            The problem
          </SectionHeading>
          <p className="mt-6 max-w-[62ch] font-serif text-2xl leading-snug text-pretty md:ml-[25%] md:text-3xl">
            {project.problem}
          </p>
        </section>

        <section aria-labelledby="built" className="md:col-span-12">
          <SectionHeading index="B" id="built">
            What I built
          </SectionHeading>
          <ol className="mt-6 md:ml-[25%]">
            {project.built.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-rule py-4 first:pt-0 last:border-b-0"
              >
                <span className="label tabular pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="max-w-[62ch] leading-relaxed text-fg-soft">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {project.gallery?.map((image) => (
          <div key={image.alt} className="md:col-span-12 md:-mt-6">
            <Figure image={image} />
          </div>
        ))}

        <section aria-labelledby="decisions" className="md:col-span-12">
          <SectionHeading index="C" id="decisions">
            Decisions worth noting
          </SectionHeading>
          <div className="mt-6 md:ml-[25%]">
            {project.decisions.map((decision) => (
              <div
                key={decision.title}
                className="border-b border-rule py-6 first:pt-0 last:border-b-0"
              >
                <h3 className="font-serif text-2xl">{decision.title}</h3>
                <p className="mt-2 max-w-[62ch] leading-relaxed text-fg-soft">{decision.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="outcome" className="md:col-span-12">
          <SectionHeading index="D" id="outcome">
            Outcome
          </SectionHeading>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-fg-soft md:ml-[25%]">
            {project.outcome}
          </p>
        </section>
      </div>

      <nav
        aria-label="More projects"
        className="mt-24 grid grid-cols-1 border-t border-rule-strong md:mt-32 md:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="group border-b border-rule py-8 md:border-r md:border-b-0 md:pr-8"
          >
            <span className="label inline-flex items-center gap-2">
              <ArrowLeft className="size-4" /> Previous project
            </span>
            <span className="mt-3 block font-serif text-3xl transition-colors group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/work"
            className="group border-b border-rule py-8 md:border-r md:border-b-0 md:pr-8"
          >
            <span className="label inline-flex items-center gap-2">
              <ArrowLeft className="size-4" /> All work
            </span>
            <span className="mt-3 block font-serif text-3xl transition-colors group-hover:text-accent">
              Back to the index
            </span>
          </Link>
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="group py-8 md:pl-8 md:text-right">
            <span className="label inline-flex items-center gap-2">
              Next project <ArrowRight className="size-4" />
            </span>
            <span className="mt-3 block font-serif text-3xl transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link href="/about" className="group py-8 md:pl-8 md:text-right">
            <span className="label inline-flex items-center gap-2">
              Next sheet 02 <ArrowRight className="size-4" />
            </span>
            <span className="mt-3 block font-serif text-3xl transition-colors group-hover:text-accent">
              About the builder
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
