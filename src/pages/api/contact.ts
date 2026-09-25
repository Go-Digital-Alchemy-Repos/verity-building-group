import type { APIRoute } from "astro";
import { handleContact } from "../../lib/contact";

export const prerender = false;
export const ALL: APIRoute = async ({ request, clientAddress }) => {
  const result = await handleContact(
    request,
    {
      secret: process.env.CONTACT_FORM_SECRET,
      webhookUrl: process.env.CONTACT_WEBHOOK_URL,
      webhookToken: process.env.CONTACT_WEBHOOK_TOKEN,
      siteUrl: process.env.SITE_URL,
    },
    clientAddress,
  );
  return Response.json(result.body, {
    status: result.status,
    headers: {
      "Cache-Control": "no-store",
      ...(result.status === 405 ? { Allow: "POST" } : {}),
    },
  });
};
