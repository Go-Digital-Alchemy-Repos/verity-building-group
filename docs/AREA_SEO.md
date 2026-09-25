# Area pages: design and search preparation

The three existing URLs remain unchanged. Each page has a distinct local purpose:

- Charlotte: custom home construction, city/county coordination, infill feasibility and major renovations.
- Lake Norman: waterfront and other homesites, shoreline coordination, utilities, slope and lake living.
- North Mecklenburg & Iredell: Cornelius, Davidson, Huntersville, Mooresville and jurisdiction-specific planning.

The pages share design primitives with the service pages but retain their local content. All original section anchors and FAQs remain. Visible breadcrumbs, related-area links and service links help visitors and crawlers navigate. North Mecklenburg inquiry CTAs now open the shared project modal; no delivery configuration has changed.

## Metadata and structured data

Each `.seo.json` override defines a distinct title, description, matching Open Graph/Twitter title and description, local social image and image description. The shared renderer now emits one content attribute per meta tag; previously the duplicated attribute could leave the source WordPress URL as the effective social URL or image.

Each page has one H1, a self-canonical URL, WebPage, Service and BreadcrumbList JSON-LD. Service area coverage reflects visible content. No office addresses, reviews, ratings, credentials, business hours or completed projects were invented. Service markup describes the content; it is not a claim of eligibility for a special Google search appearance. FAQ content is retained without suggesting FAQ rich-result eligibility.

URLs are resolved to `SITE_URL` at runtime. Images are self-hosted. The pages remain in the generated sitemap. Source WordPress URLs in migration records are converted before rendering.

## Validation

`pnpm test:seo` checks the three rendered documents: unique titles/descriptions, one H1, one metadata content attribute, canonical/social URL consistency, social image availability, valid JSON-LD graph nodes, breadcrumb ordering, areaServed, sitemap entries, nearby links and indexing mode. Use `TEST_BASE_URL` for a deployed site. `EXPECT_SITE_URL` may differ from the fetch origin during a local production simulation; `EXPECT_INDEXABLE=true` checks production indexing behavior.

Local staging and production-mode simulations passed. Browser checks covered 320, 768 and 1440 CSS px, keyboard FAQ expansion, and the North Mecklenburg inquiry modal. Build, type checks, lint, seven existing tests and route validation passed. These checks do not substitute for a Google Rich Results Test or Search Console validation; neither external validation nor ranking measurement has been performed.

## Production launch remains separate

The owner has not approved launch. Railway staging remains `noindex, nofollow`, with robots disallow and X-Robots-Tag protection. It is not intended to attract organic traffic. At approved production cutover, set the canonical production `SITE_URL` and `INDEXABLE=true` on the production environment only, keep staging protected, verify redirects, and submit the production sitemap through the owner's verified Search Console property. Form delivery setup remains a separate outstanding requirement.

Search traffic depends on indexing, competition, content and other signals; these changes do not guarantee rankings. Page titles and descriptions follow Google's guidance on useful, distinct summaries rather than keyword repetition.

## Sources reviewed September 25, 2026

- [Google: title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: snippets and descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google: breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Charlotte Development Center](https://www.charlottenc.gov/Growth-and-Development/Getting-Started-on-Your-Project)
- [Mecklenburg County permitting](https://code.mecknc.gov/permitting)
- [Iredell Central Permitting](https://iredellcountync.gov/235/Central-Permitting-Division)
- [Lake Norman Marine Commission's official Duke shoreline referral](https://lnmc.org/faq-items/who-do-i-contact-about-docks-piers-shoreline-management-and-dredging/)

The unrelated eagle article formerly labeled as Duke shoreline guidance was replaced by the shoreline management destination identified by the Marine Commission. Duke's site blocked the automated fetch, so that destination's content was not independently inspected.
