import type { Route } from "next";

export interface NavItem {
  href: Route;
  label: string;
  /** sheet number shown in the title block and nav */
  sheet: string;
}

export const nav: readonly NavItem[] = [
  { href: "/", label: "Home", sheet: "00" },
  { href: "/work", label: "Work", sheet: "01" },
  { href: "/about", label: "About", sheet: "02" },
  { href: "/resume", label: "Resume", sheet: "03" },
  { href: "/contact", label: "Contact", sheet: "04" },
];

/** resolves the active nav item for a pathname, nested routes match their section */
export function activeNav(pathname: string): NavItem | undefined {
  if (pathname === "/") return nav[0];
  return nav.find((item) => item.href !== "/" && pathname.startsWith(item.href));
}
