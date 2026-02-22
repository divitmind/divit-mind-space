import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  ALL_SERVICE_SLUGS_QUERY,
  ALL_POST_SLUGS_QUERY,
  ALL_CAREER_SLUGS_QUERY,
} from "@/sanity/lib/queries";

const BASE_URL = "https://divitmindspace.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from Sanity
  const [serviceSlugs, postSlugs, careerSlugs, newsSlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(ALL_SERVICE_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(
      `*[_type == "post" && contentType == "blog" && defined(slug.current)] { "slug": slug.current }`
    ),
    client.fetch<{ slug: string }[]>(ALL_CAREER_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(
      `*[_type == "post" && contentType == "news" && defined(slug.current)] { "slug": slug.current }`
    ),
  ]);

  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/awareness-program`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/affiliations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic service routes
  const serviceRoutes: MetadataRoute.Sitemap = (serviceSlugs || []).map(({ slug }) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = (postSlugs || []).map(({ slug }) => ({
    url: `${BASE_URL}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic news post routes
  const newsRoutes: MetadataRoute.Sitemap = (newsSlugs || []).map(({ slug }) => ({
    url: `${BASE_URL}/news/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic career routes
  const careerRoutes: MetadataRoute.Sitemap = (careerSlugs || []).map(({ slug }) => ({
    url: `${BASE_URL}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...newsRoutes,
    ...careerRoutes,
  ];
}
