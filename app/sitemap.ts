import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { HOWTO_ARTICLES } from "@/lib/howto";

const BASE_URL = "https://divitmindspace.com";

type SlugWithUpdated = { slug: string; updatedAt?: string };

const toDate = (v?: string) => (v ? new Date(v) : new Date());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch slugs AND _updatedAt per document — freshness signal for Google + LLMs.
  // Filter drafts (Sanity stores them as drafts.*).
  const [serviceRows, postRows, newsRows, careerRows, specialistRows, latestUpdate] = await Promise.all([
    client.fetch<SlugWithUpdated[]>(
      `*[_type == "services" && !(_id in path("drafts.**")) && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    ),
    client.fetch<SlugWithUpdated[]>(
      `*[_type == "post" && !(_id in path("drafts.**")) && contentType == "blog" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    ),
    client.fetch<SlugWithUpdated[]>(
      `*[_type == "post" && !(_id in path("drafts.**")) && contentType == "news" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    ),
    client.fetch<SlugWithUpdated[]>(
      `*[_type == "career" && !(_id in path("drafts.**")) && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    ),
    client.fetch<SlugWithUpdated[]>(
      `*[_type == "specialist" && !(_id in path("drafts.**")) && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    ),
    client.fetch<string | null>(
      `*[_updatedAt != null && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]._updatedAt`
    ),
  ]);

  const now = new Date();
  const siteLastMod = toDate(latestUpdate ?? undefined);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: siteLastMod, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about-us`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: siteLastMod, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: siteLastMod, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: siteLastMod, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/careers`, lastModified: siteLastMod, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact-us`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/awareness-program`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/affiliations`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/reviews`, lastModified: siteLastMod, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/specialists`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/conditions`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/near-me`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: siteLastMod, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/glossary`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/howto`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.7 },
  ];

  const howtoRoutes: MetadataRoute.Sitemap = HOWTO_ARTICLES.map((a) => ({
    url: `${BASE_URL}/howto/${a.slug}`,
    lastModified: siteLastMod,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const conditionRoutes: MetadataRoute.Sitemap = CONDITION_PIVOTS.map((c) => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: siteLastMod,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_PIVOTS.map((l) => ({
    url: `${BASE_URL}/near-me/${l.slug}`,
    lastModified: siteLastMod,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = (serviceRows || []).map((r) => ({
    url: `${BASE_URL}/services/${r.slug}`,
    lastModified: toDate(r.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (postRows || []).map((r) => ({
    url: `${BASE_URL}/blogs/${r.slug}`,
    lastModified: toDate(r.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = (newsRows || []).map((r) => ({
    url: `${BASE_URL}/news/${r.slug}`,
    lastModified: toDate(r.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const careerRoutes: MetadataRoute.Sitemap = (careerRows || []).map((r) => ({
    url: `${BASE_URL}/careers/${r.slug}`,
    lastModified: toDate(r.updatedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Dedupe specialist slugs (Sanity token queries can return drafts + published pairs).
  const uniqSpecialists = Array.from(
    new Map((specialistRows || []).map((r) => [r.slug, r])).values(),
  );
  const specialistRoutes: MetadataRoute.Sitemap = uniqSpecialists.map((r) => ({
    url: `${BASE_URL}/specialists/${r.slug}`,
    lastModified: toDate(r.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...newsRoutes,
    ...careerRoutes,
    ...specialistRoutes,
    ...conditionRoutes,
    ...locationRoutes,
    ...howtoRoutes,
  ];
}
