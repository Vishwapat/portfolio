import type { StaticImageData } from "next/image";
import dashboard from "@/assets/work/dashboard.png";
import optimizerForm from "@/assets/work/optimizer-form.png";
import optimizerResults from "@/assets/work/optimizer-results.png";
import portfolio from "@/assets/work/portfolio.png";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
  caption: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  /** one line, shown in lists and meta descriptions */
  summary: string;
  year: string;
  role: string;
  status: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
  cover?: ProjectImage;
  problem: string;
  built: readonly string[];
  decisions: readonly { title: string; body: string }[];
  outcome: string;
  gallery?: readonly ProjectImage[];
}

export const projects: readonly Project[] = [
  {
    slug: "registered-accounts-optimizer",
    title: "Registered Accounts Optimizer",
    summary:
      "A full stack planner that turns a licensed advisor's reasoning into a tested allocation engine.",
    year: "2026",
    role: "Solo, end to end",
    status: "Open source, CI on every push",
    stack: ["React", "Vite", "Express", "PostgreSQL", "JWT", "Jest", "GitHub Actions"],
    links: [
      { label: "Source", href: "https://github.com/Vishwapat/registered-accounts-optimizer" },
    ],
    cover: {
      src: optimizerResults,
      alt: "Optimizer results showing a recommended allocation, the reasoning behind it, and a twenty year growth chart.",
      caption: "Every recommendation ships with its reasoning, then a twenty year projection.",
    },
    problem:
      "Canadians juggle three tax advantaged accounts with different rules, and the right order depends on income, goals and employer benefits. That reasoning usually lives in an advisor's head. I wanted it in code, where it can be tested, explained and reused.",
    built: [
      "A pure calculation engine with no I/O: tax brackets, growth projection and the allocation heuristic are plain functions.",
      "A REST API in Express with JWT authentication and PostgreSQL storage for saved scenarios.",
      "A React client that collects inputs, shows the allocation with plain language reasons, and charts growth year by year.",
      "Eighteen automated tests (Jest unit tests for the engine, a Supertest integration test for the API) running in GitHub Actions on every push.",
    ],
    decisions: [
      {
        title: "Keep the math pure",
        body: "All financial logic sits in a module that never touches the network or the database. That made it trivial to test every branch and impossible for an API bug to silently change a number.",
      },
      {
        title: "Explain every output",
        body: "Each allocation step pushes a human readable reason. A number nobody understands is a number nobody trusts, so the reasoning is part of the response, not an afterthought.",
      },
      {
        title: "Isolate yearly constants",
        body: "Contribution limits and tax brackets change every year. They live in one constants file so an annual update is a one file change with tests to prove nothing else moved.",
      },
    ],
    outcome:
      "A working full stack app with an 18 test safety net and CI on every push. Next on the roadmap: a hosted deployment and a Monte Carlo mode that shows a range of outcomes instead of a single line.",
    gallery: [
      {
        src: optimizerForm,
        alt: "Optimizer input form with income, province, monthly savings and contribution room fields.",
        caption: "Inputs map one to one to what a client would bring to a planning meeting.",
      },
    ],
  },
  {
    slug: "stock-market-dashboard",
    title: "Stock Market Dashboard",
    summary:
      "A live analytics dashboard for any US or Canadian ticker, with trend, volatility and regression in one view.",
    year: "2026",
    role: "Solo, end to end",
    status: "Live on Streamlit Community Cloud",
    stack: ["Python", "Streamlit", "pandas", "NumPy", "scikit-learn", "matplotlib", "yfinance"],
    links: [
      {
        label: "Live demo",
        href: "https://stock-market-dashboard-b8yxfqbmw8yjd3gmcyiah6.streamlit.app/",
      },
      { label: "Source", href: "https://github.com/Vishwapat/stock-market-dashboard" },
    ],
    cover: {
      src: dashboard,
      alt: "Stock Market Dashboard showing price, total return, annualized volatility and a price chart with a 50 day moving average.",
      caption: "Headline metrics up top, then price against a configurable moving average.",
    },
    problem:
      "Checking whether a stock is trending or just noisy usually means a brokerage terminal or a spreadsheet. I wanted one link anyone could open, type a ticker into, and read in under a minute.",
    built: [
      "Live price history through the yfinance API for any US or Canadian ticker, over 6 months to 5 years.",
      "Moving average overlays with 20, 50, 100 and 200 day windows, plus a daily returns chart coloured by gain or loss.",
      "20 day rolling volatility, annualized with the square root of 252 trading days.",
      "A linear regression trend line that reports its slope and R squared score, so users can see how reliable the trend is.",
    ],
    decisions: [
      {
        title: "Ship a link, not a setup guide",
        body: "Streamlit Community Cloud turns a Python script into a public URL. Nobody has to install anything, which is the difference between a project people try and one they skip.",
      },
      {
        title: "Show confidence, not just a line",
        body: "A trend line alone can mislead. Reporting R squared next to it tells the reader how much of the movement the trend actually explains.",
      },
    ],
    outcome:
      "Live and public, used as the demo link on my resume. It taught me to design for a reader with thirty seconds, not thirty minutes.",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    summary:
      "The site you are on, engineered like production software, from CI gates to iPhone WebKit tests.",
    year: "2026",
    role: "Design and engineering",
    status: "Live, deployed on every push",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Playwright", "Vercel"],
    links: [
      { label: "Source", href: "https://github.com/Vishwapat/portfolio" },
      { label: "Live", href: "https://vishwapat.vercel.app" },
    ],
    cover: {
      src: portfolio,
      alt: "The portfolio home page shown split in two, the light paper theme on the left and the dark ink theme on the right.",
      caption: "One set of tokens, two themes: warm paper by day, deep ink by night.",
    },
    problem:
      "A portfolio that only claims engineering skill is easy to ignore. I wanted the site itself to be the evidence: something a reviewer can open on GitHub and find held to the same bar as production code.",
    built: [
      "A statically rendered, multi page Next.js 16 site with typed routes and typed content, so a broken link fails the build.",
      "A CI pipeline with ESLint at zero warnings, strict TypeScript, Prettier, unit tests, a production build and Playwright end to end tests on desktop Chromium and iPhone WebKit with axe accessibility checks.",
      "Supply chain hardening: CodeQL, OpenSSF Scorecard, dependency review, SHA pinned GitHub Actions and a strict Content Security Policy.",
      "A LaTeX resume compiled in CI, rendered to an optimized preview, and versioned alongside the site.",
    ],
    decisions: [
      {
        title: "Pages, not one endless scroll",
        body: "Recruiters skim. Separate routes give each idea its own address, a clear next step, and a URL worth sharing.",
      },
      {
        title: "Mobile is the primary target",
        body: "Most first visits come from a phone. Navigation sits in a thumb reach tab bar, layouts respect iPhone safe areas, and every change is tested in WebKit.",
      },
      {
        title: "No template look",
        body: "Ruled lines, numbered sheets and a serif display face instead of rounded cards and gradients. The design borrows from engineering drawings because that is the discipline the site is about.",
      },
    ],
    outcome:
      "Every push to main is checked, built and deployed automatically, and every pull request gets a preview URL. The repository is public, so the process is part of the portfolio.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
