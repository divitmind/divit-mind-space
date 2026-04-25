import type { NextConfig } from "next";

// Security + SEO HTTP headers, applied site-wide.
// HSTS + X-Content-Type-Options + Referrer-Policy + Permissions-Policy all contribute
// to the Core Web Vitals "trust" dimension that Google uses as a ranking signal.
// X-Robots-Tag reinforces indexability at the HTTP layer (belt-and-suspenders with robots.txt).
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Tell crawlers explicitly that this site is indexable (HTTP-level signal).
  {
    key: "X-Robots-Tag",
    value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "i.pravatar.cc", port: "", pathname: "/**" },
      { protocol: "https", hostname: "plus.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", port: "", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route except Studio (Sanity CMS iframe needs its own CSP).
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
      {
        // Long-cache the static LLM + crawler discovery files.
        source: "/(robots.txt|sitemap.xml|sitemap-images.xml|feed.xml|llms.txt|llms-full.txt|ai.txt|humans.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
