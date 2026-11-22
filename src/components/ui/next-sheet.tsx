import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "./icons";

interface NextSheetProps {
  href: Route;
  label: string;
  sheet: string;
  note?: string;
}

/** oversized link to the next page, so every page ends with one clear step */
export function NextSheet({ href, label, sheet, note }: NextSheetProps) {
  return (
    <Link
      href={href}
      className="group mt-24 block border-t border-rule-strong py-10 md:mt-32 md:py-14"
    >
      <span className="label">
        Next sheet <span className="tabular">{sheet}</span>
        {note ? <> / {note}</> : null}
      </span>
      <span className="mt-3 flex items-center justify-between gap-6 font-serif text-title transition-colors group-hover:text-accent">
        {label}
        <ArrowRight className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2 md:size-12" />
      </span>
    </Link>
  );
}
