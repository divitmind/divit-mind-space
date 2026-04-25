// Manual + webhook-triggered IndexNow submission.
//
// Two ways to use this:
//
//   1. Manual — POST { "urls": ["/services/pain-management", ...] }
//      with header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
//
//   2. Sanity webhook — POST with `?from=sanity` and Sanity's webhook body.
//      Extracts the slug from the changed document and pings IndexNow.
//      Same Authorization header required.
//
// The secret is shared with the existing Sanity revalidate pattern so you
// can configure ONE webhook in Sanity that hits this endpoint and it'll
// handle both IndexNow pings + any future cache invalidation.

import { NextRequest, NextResponse } from "next/server";
import { notifyIndexNow } from "@/lib/indexnow";
import { SITE_URL } from "@/lib/seo";

export const runtime = "edge";

// Given a Sanity document body, compute the public URL(s) that page shows at.
function urlsForSanityDoc(doc: {
  _type?: string;
  slug?: { current?: string };
  contentType?: string;
}): string[] {
  const slug = doc?.slug?.current;
  if (!doc?._type) return [];
  switch (doc._type) {
    case "services":
      return slug ? [`/services/${slug}`, `/services`] : [`/services`];
    case "specialist":
      return slug ? [`/specialists/${slug}`, `/specialists`, `/about-us`] : [`/specialists`];
    case "post":
      if (!slug) return [];
      return doc.contentType === "news" ? [`/news/${slug}`, `/news`] : [`/blogs/${slug}`, `/blogs`];
    case "career":
      return slug ? [`/careers/${slug}`, `/careers`] : [`/careers`];
    case "review":
      return [`/reviews`, `/`];
    case "aboutUs":
      return [`/about-us`];
    case "awareness":
      return [`/awareness-program`];
    case "siteSettings":
      return [`/`]; // touches homepage + many pages; homepage ping is enough
    default:
      return [];
  }
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return unauthorized();
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");

  let urls: string[] = [];

  if (from === "sanity") {
    // Sanity webhook body is the document itself.
    urls = urlsForSanityDoc(body as Record<string, unknown>);
    // Sitemap + LLM discovery files benefit from always being re-fetched.
    urls.push("/sitemap.xml", "/sitemap-images.xml", "/llms.txt");
  } else if (body && typeof body === "object" && Array.isArray((body as { urls?: unknown }).urls)) {
    urls = (body as { urls: string[] }).urls;
  }

  const result = await notifyIndexNow(urls);
  return NextResponse.json({ ok: result.ok, urls: urls.length, indexnow: result });
}

// GET is useful for local verification — lists the key URLs currently in scope.
export async function GET() {
  return NextResponse.json({
    ok: true,
    note: "POST URLs here to trigger IndexNow. See route.ts for Sanity webhook shape.",
    siteUrl: SITE_URL,
  });
}
