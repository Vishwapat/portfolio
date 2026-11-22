import type { ReactNode } from "react";

interface PageIntroProps {
  sheet: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}

/** top of every inner page: sheet number, title and lede set like a drawing title */
export function PageIntro({ sheet, eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <header className="pt-10 pb-12 md:pt-20 md:pb-20">
      <div className="label rise flex items-center justify-between">
        <span>
          Sheet <span className="tabular">{sheet}</span> / {eyebrow}
        </span>
      </div>
      <h1
        className="rise mt-6 max-w-[16ch] font-serif text-title text-balance"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {title}
      </h1>
      {lede ? (
        <p
          className="rise mt-6 max-w-[58ch] text-lg leading-relaxed text-pretty text-fg-soft md:text-xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  );
}
