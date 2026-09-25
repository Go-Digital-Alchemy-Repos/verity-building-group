# Migration validation — 2026-09-25

## Evidence

- Astro production build succeeds; Node standalone server exercised locally on port 4322.
- Astro check: 20 files, zero errors/warnings/hints. ESLint passes. Seven contact endpoint tests pass (mock delivery only).
- Public inventory: 19 pages, 3 posts, 6 category archives, 6 tag archives = 34 rendered routes. Obsolete commercial service URL intentionally redirects to root. See route and redirect manifests.
- Browser comparisons across all 34 routes at 1440, 768 and 390 pixel widths: meaningful content present, no horizontal overflow or broken migrated images. Most route main-content heights match exactly; heading/image/layout reference screenshots were inspected at representative breakpoints.
- Mobile menu open/Escape, project dialog open/Escape, progressive fields, primary gallery filters and empty-category state verified in browser. Browser warning/error log was empty for checked local interactions.
- Expanded route checker covers server HTML, metadata, internal links, src/srcset, stylesheet assets, structured-data images, redirects, slash normalization, sitemap, robots, health and genuine 404 status. Railway independently passed: 34 routes, 104 asset references, 28 internal linked paths, zero failures.
- GitHub published tree matched reviewed local tree SHA `bcdd8fcda388a14bca566ce0ec2fa5646f90d973` before final spacing/documentation refinements. No database/backup/env/credential files staged.

## Limits and production gates

- The deployed HTTPS proxy required an exact trusted-host entry for Astro origin validation; fixed without disabling origin checks.
- No real inquiry was delivered: endpoint intentionally returns unavailable until private delivery configuration is supplied. Provider acceptance and actual mailbox receipt require an authorized end-to-end test after configuration.
- Contact compact field spacing was corrected to source measurements. Small remaining differences on homepage/legacy home are not certified pixel-perfect; independently licensed font rendering and interface glyphs can differ from the original kits.
- Reduced-motion behavior is implemented and reviewed in CSS/JS; OS-level preference switching was not exercised in this browser tool.
- Native carousel physics differs by browser from Swiper; slide sizing, gaps, free scrolling and single-slide controls are reproduced.
- No source form submitted, private record migrated, production setting changed, or production domain attached.
- Owner must approve production domain/DNS/indexing cutover separately, configure/test inquiry delivery. Business email was subsequently confirmed as info@veritybuildinggroup.com.

## Residential focus — September 25, 2026

Owner requested removal of commercial offerings from all public copy. Updated page text, metadata and structured data; removed the portfolio filter and legacy home service card. The 33 remaining content routes preserve the original structure. The former commercial category permanently redirects to `/insights/` (with and without trailing slash); the existing discontinued service redirect remains. Historical source audit records remain unchanged. `scripts/apply-content-overrides.py` reapplies these approved edits after future imports.

Validation for the residential-focus edit: production build, type check and lint passed. Local route validation passed for all 33 routes, 106 asset references and 35 links; every rendered page was scanned with no commercial references. Browser verification confirmed the remaining portfolio filters work.

## Services redesign — September 25, 2026

Replaced the duplicated title and dense opening with a split introduction, service jump navigation, three alternating photographic service sections, a coordinated-planning section, native FAQ disclosures and project inquiry calls to action. Existing service destinations, photographs and inquiry behavior remain. Editable HTML lives in `src/content/overrides/services.html`; scoped CSS uses the shared brand tokens. Import overrides preserve the design and revised metadata.

Verified in-browser at 320, 390, 768 and 1440 CSS px: no horizontal overflow or broken service images, one H1, working jump links, keyboard FAQ expansion, inquiry modal opening and Escape closing with focus restoration. Desktop and mobile screenshots inspected. Build, type checking, lint and local route checks passed. No new animation was introduced. Screen-reader and browser zoom testing were not performed.

## Legacy Projects redesign — September 25, 2026

Rebuilt the page with shared Services editorial styling, an introductory photograph, three focus-area rows, a four-step approach, native FAQs and contact links. Removed the entire confidential initiative announcement, its coming-soon line and the related private-project FAQ. Kept the image's editorial-concept disclosure and partnership qualifications. Existing `#focus`, `#approach` and `#faq` links remain.

Validated desktop layout, mobile/tablet reflow at 320, 390 and 768 CSS px, one H1, approach anchor navigation and keyboard FAQ expansion. Build, type checking, lint and local route validation passed. No new motion or form behavior introduced; screen-reader and browser zoom testing not performed. The editable override is `src/content/overrides/legacy-projects.html`, with page-specific styling in `src/styles/legacy.css`.

## Land Development redesign — September 25, 2026

Matched the Legacy Projects layout using shared hero, focus rows, numbered process, FAQ and contact styles. Preserved existing land-development copy, all six process steps, six FAQs, imagery/disclosure, metadata and anchor URLs. The editable override is `src/content/overrides/land-development-charlotte-nc.html`.

Build, type checking, lint and all 33 local route checks passed. Browser checks covered one H1, reflow without horizontal overflow at 320/390/768/1440px, process anchor navigation and keyboard FAQ expansion. Desktop and mobile screenshots inspected. No new motion or form behavior. Screen-reader and browser zoom testing not performed.

## Custom Homes redesign — September 25, 2026

Matched the shared service-detail layout, preserving all planning guidance, six construction stages, six FAQs, editorial image/disclosure, service-area link, metadata and original anchor targets. The editable override is `src/content/overrides/custom-home-builder-charlotte-nc.html`.

Build, type checking, lint and all 33 local route checks passed. Browser checks confirmed one H1, six stages, no horizontal overflow at 320/390/768/1440px, process-anchor navigation and keyboard FAQ expansion. Desktop and mobile screenshots reviewed. No new motion or form behavior; screen-reader and browser zoom testing not performed.

## About redesign and area navigation — September 25, 2026

Matched the service-page visual system, retaining approach copy, team placeholders, regional descriptions and service links. Rebuilt all three area cards as whole-card native links with accessible heading labels and visible focus/hover states. Added a working contact CTA where the original was plain text. Preserved `#areas-we-serve`.

Build, type checking, lint and all 33 local route checks passed. Browser keyboard activation reached the correct Charlotte, Lake Norman and North Mecklenburg & Iredell pages. Checked one H1 and no overflow at 320/390/768/1440px. Desktop/mobile screenshots inspected. No new motion or form behavior; screen-reader and browser zoom testing not performed. Editable source: `src/content/overrides/about.html`; scoped styling: `src/styles/about.css`.

## Area pages and SEO — September 25, 2026

Redesigned Charlotte, Lake Norman and North Mecklenburg & Iredell with the shared service visual system and region-specific content. Added visible breadcrumbs, unique metadata/social previews, WebPage/Service/BreadcrumbList schema and maintainable SEO overrides. Preserved old paths and anchors. Fixed duplicated meta content attributes in the shared renderer, which had exposed WordPress source URLs to social crawlers. Restored North Mecklenburg inquiry/nearby-area navigation and corrected the unrelated Duke resource destination.

Build, type checks, lint, seven tests, 33-route checks and focused rendered-SEO checks passed. SEO checks also passed in a local production indexing simulation; actual staging stays noindex. Browser reflow checks passed for all three routes at 320/768/1440px, with one H1 each, working native FAQ keyboard expansion, and the North Mecklenburg inquiry modal. See `docs/AREA_SEO.md` for exact checks, source guidance and production requirements. No external rich-result validation, screen-reader or browser-zoom testing was performed.

## Insights invitation — September 25, 2026

Removed the publication-schedule paragraph from `/insights/` and saved the page as an editable HTML override. Added a scoped navy/gold Field Guide invitation with a native archive link and visible keyboard focus. Corrected the duplicate page H1 to H2. Production build passed; desktop and 390px mobile browser checks confirmed the callout fits without horizontal overflow and Enter opens the published Field Guide archive.

## Field Guide blog layout — September 25, 2026

Replaced the Insights landing body and Field Guide category body with a shared server-rendered article index. The September 18 post is featured, followed by September 11 and September 4. Added combined topic/location filters and keyword search, derived from the three published posts, with result counts and empty/reset states. Local browser verification covered keyboard submission, topic filtering, incompatible topic/location empty results, reset, keyword search, and 320/390/768px reflow without horizontal overflow. Desktop/tablet/mobile visual checks completed. Build, type check, lint, 10 tests, and all 33 routes (106 assets, 40 links) passed. No production launch or DNS changes.

## Portfolio curation and viewer — September 25, 2026

Reviewed a contact sheet of all 47 source entries. Excluded four labeled AI concepts, thirteen digitally staged images, and two redundant waterfront variants; retained 28 distinct file hashes and visually reviewed photographs (25 Interior, 3 Exterior). Saved a deterministic shuffled order in the curated portfolio data. Replaced the source gallery, including its empty paragraph cells, with responsive columns preserving original image ratios. Added native dialog enlargement, filtered previous/next wrapping, five-second opt-in slideshow, pause, Escape and focus restoration. Social preview now uses the retained waterfront photograph.

Build, type check, lint and the 33-route/105-asset/42-link check passed. Browser checks verified both filters, toggle-off reset, 1→3 slideshow progression, pause, arrow-key wrap, Escape with focus restoration, 390px full-screen viewer sizing, and 768px gallery flow without horizontal overflow. Photos remain uncropped in the gallery and contained in the viewer. No new automatic motion. Original assets used elsewhere were not deleted.

## Case study card navigation and CTA — September 25, 2026

Converted the two published case-study cards to native full-card links with a single keyboard stop, descriptive accessible names and focus/hover treatment. The unpublished land-development placeholder is a compact pending note rather than a nonfunctional card. Rebuilt the closing CTA as a navy panel with a contrasting “Discuss your project” contact link. Browser verification confirmed keyboard card navigation, contact navigation, and 390px layout without overflow. Production build passed.
