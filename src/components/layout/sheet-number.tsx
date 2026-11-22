"use client";

import { usePathname } from "next/navigation";
import { activeNav, nav } from "@/config/nav";

/** current sheet out of the total, for the footer title block */
export function SheetNumber() {
  const current = activeNav(usePathname());
  return (
    <span className="tabular">
      {current?.sheet ?? "--"} of {String(nav.length - 1).padStart(2, "0")}
    </span>
  );
}
