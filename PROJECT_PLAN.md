# Standalone migration plan

Objective: reproduce the published staging website faithfully in a standalone Astro/Node application, then push to the provided GitHub repository and deploy Railway staging. WP Engine and production DNS remain read-only.

## Status
- AUDIT-01: Public REST, sitemap, link, metadata and asset inventory captured; responsive browser reference capture in progress.
- AUDIT-02: Read-only theme audit completed by specialist; no child theme or custom post types found.
- BUILD-01: Planned: Astro components, file-based public content, local assets, native interactions.
- FORM-01: Planned: standalone validation and real environment-configured delivery, honest unavailable state until configured.
- QA-01: Planned: build, types, lint, route/link/SEO checks and responsive comparisons.
- DEPLOY-01: Planned: GitHub push, Railway staging deployment and independent checks; no production cutover.

## Constraints and ownership
Project Orchestrator owns implementation and integration. Specialist theme audit is read-only and complete. No private database content, users, submissions, drafts, credentials, or backups enter the standalone implementation or Git. Existing imported files are retained locally and excluded from deployment.

## Decisions
Astro with Node standalone adapter supports meaningful server-rendered HTML, reusable components, file-based content, server-side form handling and Railway PORT binding. Existing WordPress source is a reference only. Public source markup will be normalized into editable page sections and shared navigation/footer components; all WordPress scripts and plugin runtime are replaced.

## Known risks
- Adobe font service and Font Awesome Pro kit cannot be copied under an assumed self-host license. Use independently licensed upstream fonts and original simple interface icons.
- Public source contains stale linked commercial route and duplicate homepage; final route resolution must distinguish redirects from actual pages.
- Mail delivery and Railway access need configured external accounts; no fabricated success states or unapproved purchases.
- Raw imported credentials/database were saved in the prior import; keep untouched, ignored, and excluded from Docker context.
