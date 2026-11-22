import { ButtonLink } from "@/components/ui/button-link";
import { GitHub } from "@/components/ui/icons";
import { NextSheet } from "@/components/ui/next-sheet";
import { PageIntro } from "@/components/ui/page-intro";
import { ProjectRow } from "@/components/work/project-row";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Projects by Vishwa Patel: a full stack allocation engine, a live analytics dashboard and this portfolio, each built end to end.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro
        sheet="01"
        eyebrow="Work"
        title={
          <>
            Few projects. <em className="text-accent">Finished</em> properly.
          </>
        }
        lede="Each one is built end to end, tested, and public, so you can read the code behind every claim. Open any project for the problem, the decisions and the result."
      />
      <ul>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </ul>
      <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="max-w-[48ch] text-fg-soft">
          More is in progress. The fastest way to see what I am building right now is my GitHub.
        </p>
        <ButtonLink href={site.links.github} external variant="outline" icon={<GitHub />}>
          github.com/Vishwapat
        </ButtonLink>
      </div>
      <NextSheet href="/about" sheet="02" label="Who built these" note="About" />
    </>
  );
}
