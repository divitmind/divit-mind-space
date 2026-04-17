// Google Image Sitemap extension — https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
// Separate from main sitemap.xml (linked from robots.txt) so image indexing
// has its own crawl budget. Pulls every image we host that matters for search.

import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/seo";

type Row = {
  slug: string;
  title: string;
  imageUrl?: string;
  alt?: string;
};

const SERVICES_Q = `*[_type == "services" && !(_id in path("drafts.**")) && defined(slug.current) && defined(image.asset)] {
  "slug": slug.current,
  title,
  "imageUrl": image.asset->url,
  "alt": image.alt
}`;

const SPECIALISTS_Q = `*[_type == "specialist" && !(_id in path("drafts.**")) && defined(slug.current) && defined(image.asset)] {
  "slug": slug.current,
  "title": name,
  "imageUrl": image.asset->url,
  "alt": image.alt
}`;

const POSTS_Q = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && defined(mainImage.asset)] {
  "slug": slug.current,
  title,
  "imageUrl": mainImage.asset->url,
  "alt": mainImage.alt,
  "contentType": contentType
}`;

const esc = (s: string) =>
  (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const [services, specialists, posts] = await Promise.all([
    client.fetch<Row[]>(SERVICES_Q).catch(() => []),
    client.fetch<Row[]>(SPECIALISTS_Q).catch(() => []),
    client.fetch<(Row & { contentType?: string })[]>(POSTS_Q).catch(() => []),
  ]);

  type UrlEntry = {
    loc: string;
    images: { loc: string; title?: string; caption?: string }[];
  };

  const entries: UrlEntry[] = [];

  // Dedupe by slug to avoid draft-shadow duplicates slipping through
  const uniq = <T extends { slug: string }>(rows: T[]) =>
    Array.from(new Map(rows.map((r) => [r.slug, r])).values());

  uniq(services).forEach((s) => {
    if (!s.imageUrl) return;
    entries.push({
      loc: `${SITE_URL}/services/${s.slug}`,
      images: [{ loc: s.imageUrl, title: s.title, caption: s.alt || s.title }],
    });
  });

  uniq(specialists).forEach((s) => {
    if (!s.imageUrl) return;
    entries.push({
      loc: `${SITE_URL}/specialists/${s.slug}`,
      images: [{ loc: s.imageUrl, title: s.title, caption: s.alt || s.title }],
    });
  });

  uniq(posts).forEach((p) => {
    if (!p.imageUrl) return;
    const base = p.contentType === "news" ? "news" : "blogs";
    entries.push({
      loc: `${SITE_URL}/${base}/${p.slug}`,
      images: [{ loc: p.imageUrl, title: p.title, caption: p.alt || p.title }],
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${esc(e.loc)}</loc>
${e.images
  .map(
    (img) => `    <image:image>
      <image:loc>${esc(img.loc)}</image:loc>
      ${img.title ? `<image:title>${esc(img.title)}</image:title>` : ""}
      ${img.caption ? `<image:caption>${esc(img.caption)}</image:caption>` : ""}
    </image:image>`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
