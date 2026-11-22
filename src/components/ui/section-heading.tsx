import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  index: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
  id?: string;
}

/** ruled section header: mono index on the left, title, optional aside on the right */
export function SectionHeading({ index, children, aside, className, id }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-6 border-t border-rule-strong pt-4",
        className,
      )}
    >
      <h2 id={id} className="flex items-baseline gap-4 text-sm font-medium tracking-tight">
        <span className="label tabular">{index}</span>
        <span>{children}</span>
      </h2>
      {aside ? <div className="label hidden sm:block">{aside}</div> : null}
    </div>
  );
}
