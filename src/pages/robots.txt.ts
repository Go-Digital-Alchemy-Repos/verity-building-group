export const GET = () =>
  new Response(
    process.env.INDEXABLE === "true"
      ? `User-agent: *\nAllow: /\nSitemap: ${process.env.SITE_URL}/sitemap.xml\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain" } },
  );
