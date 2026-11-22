@AGENTS.md

# Portfolio: project memory

Personal portfolio for Vishwa Patel. Live at https://vishwapat.vercel.app.
Repo https://github.com/Vishwapat/portfolio. Vercel project `vishwapat` (Hobby, free).

## Owner expectations (non negotiable)

- **Bar**: top 0.1% engineering and design. Act as lead design engineer, make decisions,
  do not ask the owner questions. Must stay free (Vercel Hobby, public GitHub repo).
- **Not vibe coded**: NO rounded cards, NO card grids, NO bento boxes, NO glassmorphism,
  NO purple gradients, NO emoji icons. Editorial, typographic, ruled lines, asymmetric layout.
- **Multi page, not one long scroll**: real routes with clear buttons between them
  (`/`, `/work`, `/work/[slug]`, `/about`, `/resume`, `/contact`).
- **Mobile first, iPhone first**: test at 390x844 and 430x932 in Chrome DevTools MCP
  (emulate) and Playwright `iPhone 15 Pro` WebKit. Respect WebKit specifics:
  `viewport-fit=cover` plus `env(safe-area-inset-*)`, `100dvh`/`svh` not `100vh`,
  `theme-color` per scheme, 16px minimum input font, 44px touch targets,
  `-webkit-tap-highlight-color`, `-webkit-backdrop-filter`, no hover only affordances.
- **Story first, NOT money centric**: hook a recruiter in under 7 seconds. Owner does
  not only build finance software and has few projects so far. Positioning is range plus
  rigour: full stack CS student who ships to production standards, taught for 4 years
  (martial arts TA, 50+ members), earned a professional licence (LLQP) while studying.
  Finance is one facet of the story, never the headline. The site itself is proof of rigour.
- **Design concept**: engineering spec sheet / editorial. Ruled lines, mono index numbers,
  title block details, serif display type. No finance or ledger metaphors.
- **Palette**: no green. Warm paper light theme, deep ink navy dark theme, amber accent.
  Tokens live in `src/app/globals.css`. Must work day and night (system default, toggle).
- **Images**: always `next/image`, static imports for blur placeholders.
- **Resume**: LaTeX in `resume/`, FontAwesome icons, clickable WYSIWYG links (show the
  actual handle, not "LinkedIn"), XYZ bullets, selective bold keywords, one page,
  not green. `npm run resume:build` copies the PDF to `public/resume.pdf`.

## Git rules

- Conventional Commits only (commitlint enforces). Commit and push often.
- NEVER add Claude attribution or `Co-Authored-By` trailers to commits or PRs.
- Push to `main` deploys production through the Vercel Git integration.

## Writing style for copy

Plain keyboard characters only: no em or en dashes, no curly quotes, no unicode symbols.
Code comments lowercase, brief, no filler.

## Privacy

The contact email is never committed. It comes from `NEXT_PUBLIC_CONTACT_EMAIL`
(set in Vercel project env). The resume PDF is the only place it appears.

## Pending from owner

- Profile photo for the hero section (ask once at the end of a work session).
