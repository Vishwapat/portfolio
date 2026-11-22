"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeNav, nav } from "@/config/nav";
import { cn } from "@/lib/cn";

/** thumb reach navigation for phones, padded for the iphone home indicator */
export function MobileTabBar() {
  const current = activeNav(usePathname());

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule-strong bg-bg/[0.97] pb-[env(safe-area-inset-bottom)] backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] md:hidden"
    >
      <ul className="grid h-(--tab-bar-h) grid-cols-5">
        {nav.map((item) => {
          const active = current?.href === item.href;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 transition-colors",
                  active ? "text-fg" : "text-muted active:text-fg",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 top-0 h-0.5 transition-colors",
                    active ? "bg-accent" : "bg-transparent",
                  )}
                />
                <span className={cn("label tabular text-[0.62rem]", active && "text-accent")}>
                  {item.sheet}
                </span>
                <span className="text-[0.78rem] font-medium tracking-tight">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
