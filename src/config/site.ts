/** single source of truth for site-wide identity and urls */
export const site = {
  name: "Vishwa Patel",
  title: "Vishwa Patel | Software Engineer",
  description:
    "Computer Science student at Western University building software for how people manage money.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vishwapat.vercel.app",
  locale: "en_CA",
  /** set NEXT_PUBLIC_CONTACT_EMAIL in the environment; kept out of source on purpose */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  links: {
    github: "https://github.com/Vishwapat",
    linkedin: "https://www.linkedin.com/in/vishwa-p-518408328/",
    repo: "https://github.com/Vishwapat/portfolio",
  },
} as const;

export type Site = typeof site;
