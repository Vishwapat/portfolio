import { ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "@/components/ui/icons";
import { PageIntro } from "@/components/ui/page-intro";
import { site } from "@/config/site";
import { profile } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Vishwa Patel about internships, co-ops and projects. Reach out on LinkedIn, GitHub or by email.",
  path: "/contact",
});

export default function ContactPage() {
  const channels = [
    ...(site.email
      ? [{ label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <Mail /> }]
      : []),
    {
      label: "LinkedIn",
      value: "in/vishwa-p-518408328",
      href: site.links.linkedin,
      icon: <LinkedIn />,
    },
    { label: "GitHub", value: "github.com/Vishwapat", href: site.links.github, icon: <GitHub /> },
    { label: "Resume", value: "Vishwa-Patel-Resume.pdf", href: "/resume.pdf", icon: <Download /> },
  ];

  return (
    <>
      <PageIntro
        sheet="04"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build <em className="text-accent">something.</em>
          </>
        }
        lede={`${profile.availability}. If you are hiring, building something interesting, or just want to compare notes, I would like to hear from you.`}
      />

      <ul className="border-t border-rule-strong">
        {channels.map((channel, i) => (
          <li key={channel.label} className="border-b border-rule">
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group -mx-3 grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 px-3 py-6 transition-colors hover:bg-bg-sunk md:grid-cols-[3rem_12rem_1fr_auto] md:gap-8 md:py-8"
            >
              <span className="label tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="label hidden md:block">{channel.label}</span>
              <span className="min-w-0 truncate font-serif text-2xl transition-colors group-hover:text-accent md:text-4xl">
                <span className="label block md:hidden">{channel.label}</span>
                {channel.value}
              </span>
              <span className="flex items-center gap-3 text-muted transition-colors group-hover:text-fg">
                <span className="hidden md:inline">{channel.icon}</span>
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[52ch] text-muted">
        Based in {profile.location}, studying in London, Ontario. Happy to work on site, hybrid or
        remote.
      </p>
    </>
  );
}
