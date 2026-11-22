import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg pt-[env(safe-area-inset-top)]">
      <nav
        aria-label="Primary"
        className="gutter mx-auto flex h-14 max-w-7xl items-center justify-between"
      >
        <Link href="/" className="group flex min-h-11 items-center gap-3">
          <span
            aria-hidden
            className="grid size-7 place-items-center bg-fg font-serif text-[15px] leading-none text-bg transition-colors group-hover:bg-accent group-hover:text-accent-ink"
          >
            VP
          </span>
          <span className="text-sm font-medium tracking-tight">Vishwa Patel</span>
        </Link>
        <div className="flex items-center gap-1">
          <NavLinks />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
