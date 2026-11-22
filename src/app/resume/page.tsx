import { stat } from "node:fs/promises";
import { join } from "node:path";
import Image from "next/image";
import preview from "@/assets/resume-preview.webp";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRight, Download } from "@/components/ui/icons";
import { NextSheet } from "@/components/ui/next-sheet";
import { PageIntro } from "@/components/ui/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Vishwa Patel, Computer Science at Western University. One page, typeset in LaTeX, available as a PDF.",
  path: "/resume",
});

const pdfPath = "/resume.pdf";
const downloadName = "Vishwa-Patel-Resume.pdf";

/** file size is read once at build time and cached with the page */
async function getResumeSize(): Promise<number> {
  "use cache";
  const info = await stat(join(process.cwd(), "public", "resume.pdf"));
  return info.size;
}

export default async function ResumePage() {
  const size = await getResumeSize();
  const updated = process.env.NEXT_PUBLIC_BUILD_DATE;

  const facts = [
    { label: "Format", value: "PDF, 1 page, US Letter" },
    { label: "Size", value: `${Math.round(size / 1024)} KB` },
    { label: "Typeset", value: "LaTeX, ATS readable" },
    { label: "Updated", value: updated },
  ];

  return (
    <>
      <PageIntro
        sheet="03"
        eyebrow="Resume"
        title={
          <>
            One page. <em className="text-accent">Every</em> line earned.
          </>
        }
        lede="The same document I send to recruiters, typeset in LaTeX and versioned with this site. Open it in the browser or download a copy."
      />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <aside className="md:sticky md:top-24 md:col-span-4 md:self-start">
          <div className="flex flex-col gap-3">
            <ButtonLink href={pdfPath} external icon={<ArrowUpRight />}>
              Open PDF
            </ButtonLink>
            <ButtonLink
              href={pdfPath}
              download={downloadName}
              variant="outline"
              icon={<Download />}
            >
              Download
            </ButtonLink>
          </div>
          <dl className="mt-8 border-t border-rule-strong">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex justify-between gap-4 border-b border-rule py-3"
              >
                <dt className="label">{fact.label}</dt>
                <dd className="tabular text-right text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <figure className="md:col-span-8">
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="crop-marks group block"
            aria-label="Open the resume PDF in a new tab"
          >
            <Image
              src={preview}
              alt="Preview of Vishwa Patel's one page resume, covering education, projects, experience, leadership and skills."
              placeholder="blur"
              quality={90}
              sizes="(min-width: 1280px) 800px, (min-width: 768px) 66vw, 100vw"
              className="h-auto w-full border border-rule bg-white shadow-[0_1px_0_var(--rule),0_24px_48px_-24px_rgb(0_0_0/0.25)] transition-transform duration-500 group-hover:-translate-y-1"
            />
          </a>
          <figcaption className="label mt-4 flex justify-between">
            <span>Fig. 03 / Page 1 of 1</span>
            <span>Click to open</span>
          </figcaption>
        </figure>
      </div>

      <NextSheet href="/contact" sheet="04" label="Get in touch" note="Contact" />
    </>
  );
}
