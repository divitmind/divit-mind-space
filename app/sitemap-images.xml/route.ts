// Google Image Sitemap extension — https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
//
// IMPORTANT: Google Image Sitemaps are stricter than regular sitemaps about cross-domain
// image URLs. If an image is on a different host than the sitemap (e.g., Sanity CDN at
// cdn.sanity.io), Google flags the entry as invalid unless the image-host domain is ALSO
// verified in Search Console. We can't verify Sanity's CDN.
//
// So this sitemap only references images on divitmindspace.com itself — specialist
// photos, about-page photos, workshop photos from /public. That produces a clean,
// valid image sitemap. Sanity-hosted service/blog images are still discoverable via
// normal page crawling (Next.js <Image /> on each page has proper alt text).

import { NextResponse } from "next/server";

// Canonical host — use www to match the GSC-verified property. The non-www version
// redirects to www on Vercel, and GSC treats sitemap image URLs strictly by host.
const CANON_HOST = "https://www.divitmindspace.com";

type ImgEntry = {
  /** Page URL where this image appears. */
  pageUrl: string;
  /** Image URL (same domain as CANON_HOST). */
  imgPath: string;
  title?: string;
  caption?: string;
};

// Curated list — ONLY files that exist in /public and appear on a public page.
// All image paths are same-domain, so Google accepts them without cross-host verification.
const ENTRIES: ImgEntry[] = [
  // Homepage + About
  {
    pageUrl: `${CANON_HOST}/`,
    imgPath: "/divit-mindspace-logo.png",
    title: "Divit MindSpace",
    caption: "Divit MindSpace — Mental Health, Neurodevelopment & Physiotherapy Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/about_pic1.png",
    title: "Divit MindSpace — Our Space",
    caption: "Inside Divit MindSpace, Kasavanahalli, Off Sarjapur Road, Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/about_pic2.png",
    title: "Divit MindSpace — Care Environment",
    caption: "Therapy environment at Divit MindSpace Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/about_pic3.png",
    title: "Divit MindSpace — Our Team at Work",
    caption: "Clinical team at Divit MindSpace Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/about_pic4.png",
    title: "Divit MindSpace — Session in Progress",
    caption: "Therapy session at Divit MindSpace Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/about_pic5.png",
    title: "Divit MindSpace — Welcoming Space",
    caption: "Welcoming space at Divit MindSpace Kasavanahalli Bangalore",
  },

  // Specialist photos (each photo lives on /public, each has its own profile page)
  {
    pageUrl: `${CANON_HOST}/specialists/debarati-basak`,
    imgPath: "/Debarati.jpeg",
    title: "Dr. Debarati Basak",
    caption: "Dr. Debarati Basak, Psy.D · Founding Partner, Divit MindSpace Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/pavithra-lakshmi-narasimhan`,
    imgPath: "/pavithra-lakshmi.png",
    title: "Dr. Pavithra Lakshmi Narasimhan",
    caption:
      "Dr. Pavithra Lakshmi Narasimhan, PhD Clinical Psychologist, Divit MindSpace Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/dinesh-jayabalakrishnan`,
    imgPath: "/Dinesh.png",
    title: "Dinesh Jayabalakrishnan",
    caption:
      "Dinesh Jayabalakrishnan, B.O.Th. · Occupational Therapist & Table Tennis Coach, Divit MindSpace",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/akhila-r-n`,
    imgPath: "/akhila.png",
    title: "Akhila R N",
    caption: "Akhila R N, M.Sc. (ASLP) · RCI Licensed Speech Language Pathologist, Divit MindSpace",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/mohamed-nowful`,
    imgPath: "/mohmed.jpeg",
    title: "Dr. S. Mohamed Nowful",
    caption: "Dr. S. Mohamed Nowful, B.O.Th. · Licensed Occupational Therapist, Divit MindSpace",
  },

  // Awareness programs — confirmed past workshops
  {
    pageUrl: `${CANON_HOST}/awareness-program`,
    imgPath: "/awareness-jyoti-nivas.jpeg",
    title: "Awareness session at Jyoti Nivas College",
    caption: "Free awareness session delivered by Divit MindSpace at Jyoti Nivas College, Bangalore",
  },
  {
    pageUrl: `${CANON_HOST}/awareness-program`,
    imgPath: "/awareness-tisb.jpg",
    title: "Awareness session at TISB",
    caption: "Free awareness session delivered by Divit MindSpace at TISB, Bangalore",
  },

  // Key visual assets used across the site
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/welcome_to_neuroempower.png",
    title: "Welcome to Divit MindSpace",
    caption: "Welcome to Divit MindSpace — empowering every journey",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/child_development_journey_roadmap.png",
    title: "Child development journey roadmap",
    caption: "Divit MindSpace child development journey — Bangalore",
  },
];

const esc = (s: string) =>
  (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  // Group by page URL — an image sitemap supports multiple <image:image> under one <url>.
  const byPage = new Map<string, ImgEntry[]>();
  for (const e of ENTRIES) {
    const list = byPage.get(e.pageUrl) ?? [];
    list.push(e);
    byPage.set(e.pageUrl, list);
  }

  const urlsXml = Array.from(byPage.entries())
    .map(([pageUrl, items]) => {
      const images = items
        .map(
          (img) => `    <image:image>
      <image:loc>${esc(`${CANON_HOST}${img.imgPath}`)}</image:loc>
      ${img.title ? `<image:title>${esc(img.title)}</image:title>` : ""}
      ${img.caption ? `<image:caption>${esc(img.caption)}</image:caption>` : ""}
    </image:image>`,
        )
        .join("\n");
      return `  <url>
    <loc>${esc(pageUrl)}</loc>
${images}
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/0.9">
${urlsXml}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
