# Security policy

## Supported versions

Only the latest deployment of `main` (https://vishwapat.vercel.app) is supported.

## Reporting a vulnerability

Please **do not open a public issue**. Report privately through
[GitHub private vulnerability reporting](https://github.com/Vishwapat/portfolio/security/advisories/new).

Include the affected URL or file, steps to reproduce, and the impact you expect.

| Step                   | Target                    |
| ---------------------- | ------------------------- |
| Acknowledgement        | within 3 business days    |
| Initial assessment     | within 7 business days    |
| Fix or mitigation      | depends on severity       |
| Credit in the advisory | offered to every reporter |

## Scope

This is a static personal site. In scope: the deployed site, the build pipeline,
and GitHub Actions workflows in this repository. Out of scope: Vercel and GitHub
platform issues (report those to the vendors), denial of service, and findings
from automated scanners without a demonstrated impact.

## Hardening in place

- Every GitHub Action is pinned to a full commit SHA and updated by Dependabot.
- CodeQL (`security-extended`) and OpenSSF Scorecard run on every push to `main`.
- Dependency review blocks pull requests that add vulnerable or copyleft packages.
- Secret scanning with push protection is enabled on the repository.
- Strict security headers (CSP, HSTS, frame, referrer and permissions policies)
  are set in `next.config.ts`.
