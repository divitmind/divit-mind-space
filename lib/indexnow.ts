// IndexNow client — pings Bing (which syndicates to ChatGPT search, Copilot,
// DuckDuckGo, Yandex, Seznam, Naver, Yep) that specific URLs need re-crawling.
// Google does not participate; Google auto-discovers via sitemap.xml anyway.

import { SITE_URL } from "@/lib/seo";

// Static key — lives at /<INDEXNOW_KEY>.txt so IndexNow can verify ownership.
// If you rotate this, regenerate the public/<key>.txt file and update .env.local.
const DEFAULT_KEY = "0512d7470ecd49be85b4cd789ac7f948";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || DEFAULT_KEY;

// Bing is the canonical endpoint; it syndicates to all IndexNow partners.
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export type IndexNowResult = {
  ok: boolean;
  status: number;
  urlsSent: number;
  error?: string;
};

/**
 * Notify IndexNow of one or more URLs. All URLs must be on divitmindspace.com.
 * Silently no-ops in development if NEXT_PUBLIC_VERCEL_ENV !== "production".
 */
export async function notifyIndexNow(urls: string[]): Promise<IndexNowResult> {
  // Filter + de-dup + absolute-ify
  const unique = Array.from(
    new Set(
      urls
        .filter(Boolean)
        .map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`)),
    ),
  );

  if (unique.length === 0) {
    return { ok: true, status: 200, urlsSent: 0 };
  }

  // Skip calls in dev/preview — avoid polluting Bing's index with preview URLs.
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV;
  if (env !== "production" && process.env.FORCE_INDEXNOW !== "1") {
    return { ok: true, status: 200, urlsSent: unique.length, error: "skipped: non-production" };
  }

  const body = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: unique,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, urlsSent: unique.length };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      urlsSent: unique.length,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
