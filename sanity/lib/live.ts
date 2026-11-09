import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

const live = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});

// Safe sanityFetch that returns empty data when Sanity isn't configured
export async function sanityFetch<T = unknown>(
  options: Parameters<typeof live.sanityFetch>[0]
): Promise<{ data: T | null }> {
  if (!isSanityConfigured) {
    // Return empty data for local development without Sanity
    return { data: null };
  }
  try {
    return (await live.sanityFetch(options)) as { data: T | null };
  } catch {
    try {
      const data = await client.fetch<T>(options.query, options.params || {});
      return { data };
    } catch (clientErr) {
      console.warn("Sanity fetch failed, returning empty data:", clientErr);
      return { data: null };
    }
  }
}

// Re-export SanityLive - it will be conditionally rendered in layout
export const SanityLive = isSanityConfigured ? live.SanityLive : () => null;