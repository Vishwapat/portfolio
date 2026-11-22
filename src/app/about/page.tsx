import { ButtonLink } from "@/components/ui/button-link";
import { Download } from "@/components/ui/icons";
import { NextSheet } from "@/components/ui/next-sheet";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { chapters, profile, skills } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Vishwa Patel's story: four years teaching, two years in high volume retail, a professional licence, and now Computer Science at Western University.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        sheet="02"
        eyebrow="About"
        title={
          <>
            Teacher first. <em className="text-accent">Engineer</em> next.
          </>
        }
        lede="The short version: I like hard problems, I like explaining them, and I finish what I start. The long version took four chapters."
      />

      <div>
        {chapters.map((chapter) => (
          <section
            key={chapter.index}
            aria-labelledby={`chapter-${chapter.index}`}
            className="grid gap-6 border-t border-rule-strong py-10 md:grid-cols-12 md:gap-10 md:py-14"
          >
            <div className="md:sticky md:top-24 md:col-span-4 md:self-start">
              <p className="label tabular">
                Chapter {chapter.index} / {chapter.period}
              </p>
              <h2 id={`chapter-${chapter.index}`} className="mt-3 font-serif text-4xl md:text-5xl">
                {chapter.title}
              </h2>
            </div>
            <div className="space-y-5 md:col-span-7 md:col-start-6">
              {chapter.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-pretty text-fg-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="toolkit" className="mt-16 md:mt-24">
        <SectionHeading index="A" id="toolkit" aside="What I reach for">
          Toolkit
        </SectionHeading>
        <dl className="mt-6">
          {skills.map((group) => (
            <div
              key={group.label}
              className="grid gap-2 border-b border-rule py-5 md:grid-cols-12 md:gap-10"
            >
              <dt className="label pt-1 md:col-span-4">{group.label}</dt>
              <dd className="md:col-span-7 md:col-start-6">{group.items.join(", ")}</dd>
            </div>
          ))}
          <div className="grid gap-2 border-b border-rule py-5 md:grid-cols-12 md:gap-10">
            <dt className="label pt-1 md:col-span-4">Education</dt>
            <dd className="md:col-span-7 md:col-start-6">
              {profile.degree}, {profile.school}, expected {profile.graduation}
            </dd>
          </div>
        </dl>
        <div className="mt-8">
          <ButtonLink href="/resume" variant="outline" icon={<Download />}>
            Full resume
          </ButtonLink>
        </div>
      </section>

      <NextSheet href="/resume" sheet="03" label="The one page version" note="Resume" />
    </>
  );
}
