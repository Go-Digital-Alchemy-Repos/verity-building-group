# Published website audit

Source: https://veritybuildstg.wpenginepowered.com/ (the abbreviated host in the brief resolves to this previously verified staging host). Audit date:2026-09-25. WP Engine was read-only throughout this migration.

## Public inventory

19 published pages,3 published posts,6 category archives and6 tag archives yield34 retained routes. One additional linked commercial-service path redirects to the homepage. Footer links without trailing slashes normalize to their existing slash routes. The older `/home-2/` page remains because it is separately published and has distinct content. No users, drafts, private posts, submissions or database options were migrated.

Menus: Services (Legacy Projects, Land Development, Custom Homes), About (Areas We Serve anchor), Field Guide, Portfolio, Case Studies, Contact; footer Terms & Conditions and Privacy Policy.

Public features: responsive dropdown/mobile navigation; sticky header; directional scroll reveals; source homepage/work carousel where present; two-level portfolio filters; native FAQ disclosures; project inquiry modal; progressive contact forms with file attachments; archive search. No active map or separate gallery lightbox was found. A source popup is the project inquiry dialog.

## Source installation and replacements

Public output confirms VBG assets and Gravity Forms. VBG is a standalone Underscores theme, not a Genesis child. No custom post types were found in theme declarations or the public REST type inventory. Case studies and services are ordinary published pages. ACF supplied theme fields; rendered public output was used instead of querying private configuration.

| Source function                   | Standalone replacement                                                  |
| --------------------------------- | ----------------------------------------------------------------------- |
| WordPress routing/content/menus   | Astro routes and repository JSON                                        |
| ACF template values               | Published content sections and shared chrome                            |
| WP-SCSS and custom theme CSS      | Build-time local design stylesheet                                      |
| Gravity Forms                     | Shared Astro form and server-side validation                            |
| WP Mail SMTP                      | Environment-configured HTTPS delivery boundary                          |
| Redirection                       | Explicit redirect manifest and canonical middleware                     |
| jQuery/Swiper reveal/menu scripts | Native browser interactions, CSS and scroll track                       |
| Adobe Fonts/Font Awesome kit      | Independently licensed local fonts; simple interface arrow/check glyphs |
| Editor/import/duplicate plugins   | No runtime replacement necessary                                        |

Installed plugins alone are not evidence of activation. Source Redirection database rules were not read: only observed public redirects are reproduced. No analytics tracker was identified as required, so WordPress/plugin/cloud-host tracking was not migrated.

## Visual source rules

Container max1280px; desktop margins80px, tablet32px, mobile20px. Header134px desktop/96px compact; compact menu breakpoint960px. Body Lato16px/1.55; Cormorant Garamond headings. Hero min903/760/640/560px across source breakpoints. Gold/ink/cream palette retained. Editorial inner width1120px and original nested margins retained.

Reveals: home20px translation/1s duration/400ms sequence; inner22px/.7s ease. Native reduced-motion override makes content immediately visible. Menu/modal/filter controls remain keyboard operable; dialog focus is trapped and restored.

## Asset findings

12 source portfolio references (`Brancer3.webp` through `Brancer25.webp`, odd numbers) returned404. User authorized repairs. A specialist visually matched all captions to corresponding published even-numbered files4–26; mapping is recorded in `src/content/asset-repairs.json`. Original missing binaries cannot be compared pixel-for-pixel.

Source font kit does not grant self-hosting rights to Adobe binaries. Independently licensed upstream font packages are used, with OFL files retained. There was no self-host license evidence for Font Awesome Pro, so it is not copied. User-provided site images are reused only when public content references them; their original ownership records were not supplied.

## SEO and routing

Source robots disallows all crawling and metadata marks staging noindex/nofollow; staging behavior preserved. Public sitemap lists page/post/category/tag routes and a user sitemap. User sitemap is deliberately excluded under the no-users requirement. Exact page metadata is in the inventory and page documents. Canonical origins are environment-configured to avoid runtime WP Engine links.

## Intentional differences and deployment gates

- Approved repair of missing gallery images.
- Accessible modal focus trapping and reduced-motion handling.
- Form rejects submissions with neither email nor phone; original fields were all optional.
- Multipart upload total is bounded52MiB rather than theoretical400MiB source maximum.
- No form success is claimed until real provider acceptance; private delivery configuration is required.
- Primary content remains in initial HTML without JavaScript.
- Production domain, DNS and indexing remain unchanged pending explicit approval.
