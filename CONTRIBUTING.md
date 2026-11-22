# Contributing

This is a personal portfolio, so the content is not open to edits. Bug reports,
accessibility fixes, and performance improvements are very welcome.

## Getting started

```bash
nvm use            # Node 22, see .nvmrc
npm ci
npm run dev        # http://localhost:3000
```

Copy `.env.example` to `.env.local` if you want to override the site URL or contact address.

## Before you open a pull request

```bash
npm run validate   # lint, typecheck, format check, unit tests
npm run build
npm run test:e2e   # Playwright on desktop Chromium and iPhone WebKit
```

Git hooks run `lint-staged` on commit and `commitlint` on the message, so most
problems are caught before CI.

## Conventions

- **Commits and PR titles** follow [Conventional Commits](https://www.conventionalcommits.org):
  `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `refactor:`, `perf:`, `test:`, `style:`, `build:`.
  Copy and project changes use `docs(content):`.
- **One concern per PR.** Small and reviewable beats large and clever.
- **Server Components by default.** Add `"use client"` only to the leaf that needs it.
- **Images** go through `next/image` with explicit sizes and meaningful `alt` text.
- **Mobile first.** Check 390 x 844 in both colour schemes before asking for review.
- **Accessibility** is a merge requirement. The e2e suite runs axe on every page.

## Resume

The resume source is `resume/resume.tex`. Build it with `npm run resume:build`
(needs a TeX distribution with `latexmk`). CI compiles it and fails if it grows
past one page.
