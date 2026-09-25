# Standalone migration plan

Objective: faithfully reproduce the published website as a standalone Astro/Node application, publish to the supplied GitHub repository, and deploy Railway staging. Production DNS and WP Engine remain unchanged.

## Status

- AUDIT-01/02 complete: public route/content/SEO/asset inventory and read-only theme audit.
- BUILD-01 complete: 34 routes, 65 public assets, shared chrome/forms, native interactions, file-based content.
- FORM-01 implementation complete: validation, spam controls and HTTPS delivery boundary; actual delivery awaits owner destination/provider configuration.
- REVIEW-01/FIX-02 complete: independent review corrected structured-data asset URLs, confirmation view, carousel behavior and reveal delays.
- QA-01: local build/check/lint/tests and route checks pass; all 34 routes compared in browsers at 1440, 768 and 390 pixels. Final deployment checks recorded in docs/VALIDATION.md.
- DEPLOY-01: implementation published to GitHub; Digital Alchemy Pro project uses isolated staging environment and generated Railway domain.

## Architecture and ownership

Orchestrator owns integration. Specialist work is completed and reviewed. Astro Node server renders primary content without client JavaScript; no database or CMS runtime. Content is maintained in repository JSON documents. Local imported WordPress files are ignored and excluded from Docker. Public asset mapping is explicit; only published referenced assets are deployed.

## Remaining owner input

Real inquiry destination/provider and private delivery variables. Source email address is a WP Engine staging address and remains unchanged pending correction. Production domain/DNS/indexing changes require explicit approval.

## Accepted differences

Owner-approved repairs of 12 missing gallery photos; licensed font distributions and simple interface glyphs; accessible focus/reduced-motion behavior; bounded combined attachment request. Minor legacy-page typography/spacing differences remain documented, not represented as pixel-perfect acceptance.
