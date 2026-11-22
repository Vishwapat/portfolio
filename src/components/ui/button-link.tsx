import Link, { type LinkProps } from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "quiet";

const variants: Record<Variant, string> = {
  solid: "bg-fg text-bg hover:bg-accent hover:text-accent-ink border border-fg hover:border-accent",
  outline: "border border-rule-strong text-fg hover:bg-fg hover:text-bg",
  quiet: "border border-transparent text-fg hover:border-rule",
};

const shared =
  "group inline-flex min-h-11 items-center justify-between gap-6 px-5 py-3 text-sm font-medium tracking-tight transition-colors duration-200";

interface ButtonLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: LinkProps<string>["href"] | string;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
}

/** square edged call to action; internal routes use next/link, others a plain anchor */
export function ButtonLink({
  href,
  variant = "solid",
  icon,
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(shared, variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (external || typeof href !== "string" || !href.startsWith("/") || href.endsWith(".pdf")) {
    return (
      <a
        href={String(href)}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href as LinkProps<string>["href"]} className={classes} {...rest}>
      {inner}
    </Link>
  );
}
