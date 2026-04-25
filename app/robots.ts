import type { MetadataRoute } from "next";

// Explicit per-crawler rules. We want major LLM + AI-search crawlers to index
// the public site so we can be cited in ChatGPT, Claude, Perplexity, Gemini etc.
// Studio admin area and Next.js internals are always blocked.
const DISALLOW = ["/studio/", "/studio", "/api/", "/_next/", "/preview"];

// LLM + AI-search crawlers we explicitly allow (even though "*" already allows them,
// listing them individually signals intent and avoids accidental blanket blocks later).
// Also: some services (e.g. OpenAI) distinguish between "training" bots and "search" bots;
// we allow all because our goal is visibility in LLM answers.
const AI_CRAWLERS = [
  "GPTBot",              // OpenAI training
  "OAI-SearchBot",        // ChatGPT search
  "ChatGPT-User",         // ChatGPT browsing
  "ClaudeBot",            // Anthropic training
  "Claude-Web",           // Anthropic web
  "anthropic-ai",         // Anthropic legacy
  "PerplexityBot",        // Perplexity
  "Perplexity-User",      // Perplexity user-triggered
  "Google-Extended",      // Google Gemini / Bard training
  "GoogleOther",          // Google experimental
  "CCBot",                // Common Crawl (used by many LLMs)
  "Applebot-Extended",    // Apple AI
  "Bytespider",           // ByteDance / Doubao
  "Amazonbot",            // Amazon Alexa / Q
  "DuckAssistBot",        // DuckDuckGo AI
  "cohere-ai",            // Cohere
  "Meta-ExternalAgent",   // Meta AI
  "FacebookBot",          // Meta
  "Diffbot",              // Diffbot (used by many AI search products)
  "Bingbot",              // Bing / Copilot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      // Explicit allows for LLM + AI-search crawlers — they can read everything public
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: [
      "https://divitmindspace.com/sitemap.xml",
      "https://divitmindspace.com/sitemap-images.xml",
    ],
    host: "https://divitmindspace.com",
  };
}
