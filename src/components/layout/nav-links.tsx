"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeNav, nav } from "@/config/nav";
import { cn } from "@/lib/cn";

/** desktop navigation with sheet numbers */
export function NavLinks() {
  const current = activeNav(usePathname());

  return (
    <ul className="hidden items-center md:flex">
      {nav.slice(1).map((item) => {
        const active = current?.href === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex min-h-11 items-center gap-2 px-3 text-sm transition-colors",
                active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              <span className={cn("label tabular", active && "text-accent")}>{item.sheet}</span>
              <span className={cn("link-draw", active && "bg-[length:100%_1px]")}>
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
