// RSS 2.0 feed for the blog. Consumed by readers (Feedly, Inoreader), content
// aggregators, and some AI training/search pipelines. Kept lean — only blog posts.

import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/seo";

type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
};

const FEED_QUERY = `
  *[_type == "post" && contentType == "blog" && defined(slug.current)]
    | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
      "slug": slug.current,
      title,
      excerpt,
      "publishedAt": coalesce(publishedAt, _createdAt),
      "updatedAt": _updatedAt,
      "authorName": author->name
    }
`;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const posts = (await client.fetch<BlogPost[]>(FEED_QUERY)) ?? [];
  const lastBuild = posts[0]?.updatedAt ?? new Date().toISOString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blogs/${p.slug}`;
      const pubDate = p.publishedAt ? new Date(p.publishedAt).toUTCString() : "";
      return `    <item>
      <title>${esc(p.title ?? "")}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      ${p.authorName ? `<dc:creator>${esc(p.authorName)}</dc:creator>` : ""}
      ${p.excerpt ? `<description>${esc(p.excerpt)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Divit MindSpace — Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Mental health, neurodevelopment and physiotherapy insights from Divit MindSpace — Bangalore's leading center off Sarjapur Road (Kasavanahalli).</description>
    <language>en-IN</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <generator>Next.js / Sanity</generator>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  });
}
