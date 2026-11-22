import Link from "next/link";
import { site } from "@/config/site";
import { profile } from "@/content/profile";
import { GitHub, LinkedIn } from "@/components/ui/icons";
import { SheetNumber } from "./sheet-number";

const revision = (process.env.VERCEL_GIT_COMMIT_SHA ?? "local").slice(0, 7);
const built = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";

/** engineering drawing title block: who drew it, which sheet, which revision */
export function SiteFooter() {
  const cells = [
    { label: "Drawn by", value: site.name },
    { label: "Location", value: `${profile.location}, ${profile.coordinates}` },
    { label: "Sheet", value: <SheetNumber /> },
    {
      label: "Revision",
      value: (
        <a className="link-draw tabular" href={`${site.links.repo}/commit/${revision}`}>
          {revision}
        </a>
      ),
    },
    { label: "Issued", value: <span className="tabular">{built}</span> },
  ];

  return (
    <footer className="gutter mx-auto mt-auto w-full max-w-7xl pt-16 pb-[calc(var(--tab-bar-h)+env(safe-area-inset-bottom)+2rem)] md:pb-10">
      <div className="grid grid-cols-2 border-t border-rule-strong md:grid-cols-5">
        {cells.map((cell, i) => (
          <div
            key={cell.label}
            className={`border-b border-rule py-3 pr-3 md:border-r md:pl-3 md:first:pl-0 md:last:border-r-0 ${
              i === 0 ? "col-span-2 md:col-span-1" : i % 2 === 1 ? "border-r" : "pl-3"
            }`}
          >
            <div className="label">{cell.label}</div>
            <div className="mt-1 text-sm">{cell.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>
          Built with Next.js, set in Instrument Serif and Geist.{" "}
          <Link className="link-draw text-fg" href={site.links.repo}>
            Read the source
          </Link>
          .
        </p>
        <div className="flex items-center gap-1">
          <a
            href={site.links.github}
            aria-label="GitHub"
            className="inline-flex size-11 items-center justify-center hover:text-fg"
          >
            <GitHub />
          </a>
          <a
            href={site.links.linkedin}
            aria-label="LinkedIn"
            className="inline-flex size-11 items-center justify-center hover:text-fg"
          >
            <LinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
