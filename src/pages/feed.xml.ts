import type { APIRoute } from "astro";
import inventory from "../../docs/public-inventory.json";
const xml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
export const GET: APIRoute = ({ url }) => {
  const base = process.env.SITE_URL || url.origin;
  const items = inventory.content.posts
    .map(
      (p) =>
        `<item><title>${xml(p.title.rendered)}</title><link>${base + new URL(p.link).pathname}</link><guid>${base + new URL(p.link).pathname}</guid></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0"?><rss version="2.0"><channel><title>Verity Building Group</title><link>${base}</link><description>The Verity Field Guide</description>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml" } },
  );
};
