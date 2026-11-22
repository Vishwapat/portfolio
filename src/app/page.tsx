import type { Metadata } from "next";
import portrait from "@/assets/portrait.webp";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight, Download } from "@/components/ui/icons";
import { NextSheet } from "@/components/ui/next-sheet";
import { PortraitPlate } from "@/components/ui/portrait-plate";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectRow } from "@/components/work/project-row";
import { site } from "@/config/site";
import { profile, stats } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: { absolute: site.title },
  alternates: { canonical: "/" },
};

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="grid min-h-[calc(100svh-3.5rem-var(--tab-bar-h))] grid-cols-1 content-center gap-12 py-10 md:min-h-[calc(100svh-3.5rem)] md:grid-cols-12 md:gap-10 md:py-16"
      >
        <div className="md:col-span-8">
          <div className="label rise flex flex-wrap items-center gap-x-6 gap-y-2" style={delay(0)}>
            <span className="inline-flex items-center gap-2 text-fg">
              <span aria-hidden className="pulse-dot size-2 bg-accent" />
              {profile.availability}
            </span>
            <span className="hidden sm:inline">{profile.coordinates}</span>
          </div>

          <h1
            id="hero-title"
            className="rise mt-8 font-serif text-display text-balance"
            style={delay(1)}
          >
            I build software like it&apos;s already in <em className="text-accent">production.</em>
          </h1>

          <p
            className="rise mt-8 max-w-[54ch] text-lg leading-relaxed text-pretty text-fg-soft md:text-xl"
            style={delay(2)}
          >
            I&apos;m Vishwa, a Computer Science student at Western. Four years teaching a room full
            of students, a professional licence earned while studying full time, and a habit of
            testing everything. I learn fast, ship carefully and explain clearly.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={delay(3)}>
            <ButtonLink href="/work" icon={<ArrowRight />} className="sm:min-w-56">
              See the work
            </ButtonLink>
            <ButtonLink
              href="/resume"
              variant="outline"
              icon={<Download />}
              className="sm:min-w-56"
            >
              Resume
            </ButtonLink>
          </div>
        </div>

        <div className="rise md:col-span-4 md:pt-24" style={delay(4)}>
          <PortraitPlate photo={portrait} className="ml-auto w-[62%] max-w-80 md:w-full" />
        </div>
      </section>

      <section aria-labelledby="numbers" className="mt-8 md:mt-16">
        <SectionHeading index="A" id="numbers" aside="Counted, not estimated">
          By the numbers
        </SectionHeading>
        <dl className="mt-6 grid grid-cols-2 border-t border-rule md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col border-b border-rule py-6 pr-4 md:border-b-0 md:py-8 ${
                i % 2 === 0 ? "border-r" : "md:border-r"
              } ${i === stats.length - 1 ? "md:border-r-0" : ""} ${i % 2 === 1 ? "pl-4" : ""} ${
                i > 0 ? "md:pl-6" : ""
              }`}
            >
              <dt className="order-2 mt-3 text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="tabular order-1 font-serif text-5xl leading-none md:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="selected-work" className="mt-24 md:mt-32">
        <SectionHeading index="B" id="selected-work" aside={`${projects.length} projects`}>
          Selected work
        </SectionHeading>
        <ul className="mt-6">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </ul>
      </section>

      <NextSheet href="/about" sheet="02" label="The longer story" note="About" />
    </>
  );
}
