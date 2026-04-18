// Google Image Sitemap extension — https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
//
// STRICT RULES this sitemap follows (learned from GSC errors):
//
// 1. SAME DOMAIN — every <image:loc> must be on www.divitmindspace.com.
//    Google needs to verify ownership of the image host; our Sanity CDN
//    (cdn.sanity.io) can't be verified, so Sanity images go via normal
//    page crawl, not this sitemap.
//
// 2. REAL PHOTOS ONLY — illustrations and designed graphics (about_pic*,
//    welcome_to_neuroempower, child_development_journey_roadmap) are
//    removed. Google Image Search ranks real photos of real places/people
//    significantly higher. Illustrations dilute image-search authority.
//
// 3. FILE SIZE — each image is well under 1 MB (Google's sweet spot).
//    Oversized files are excluded until they're compressed.
//
// 4. CANONICAL HOST — all page <loc> URLs use www.divitmindspace.com to
//    match the GSC-verified property exactly (no redirect hops).

import { NextResponse } from "next/server";

const CANON_HOST = "https://www.divitmindspace.com";

type ImgEntry = {
  /** Page URL where this image appears. */
  pageUrl: string;
  /** Image URL (same domain as CANON_HOST). */
  imgPath: string;
  title?: string;
  caption?: string;
};

const ENTRIES: ImgEntry[] = [
  // ==================================================================
  // BRAND
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/`,
    imgPath: "/divit-mindspace-logo.png",
    title: "Divit MindSpace",
    caption: "Divit MindSpace — Mental Health, Neurodevelopment & Physiotherapy Bangalore",
  },

  // ==================================================================
  // BUILDING & LOCATION (strongest for local SEO + "near me" queries)
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/contact-us`,
    imgPath: "/sitemap/divit-building-exterior-main.jpg",
    title: "Divit MindSpace — Building Exterior",
    caption:
      "Divit MindSpace clinic building at Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/contact-us`,
    imgPath: "/sitemap/divit-building-side-view.jpg",
    title: "Divit MindSpace — Building Side View",
    caption:
      "Side view of the Divit MindSpace clinic building in Kasavanahalli, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/contact-us`,
    imgPath: "/sitemap/divit-clinic-entrance.jpg",
    title: "Divit MindSpace — Clinic Entrance",
    caption: "Main entrance of Divit MindSpace, Aadeshwar Chambers, Kasavanahalli.",
  },
  {
    pageUrl: `${CANON_HOST}/contact-us`,
    imgPath: "/sitemap/divit-location-signboard.jpg",
    title: "Divit MindSpace — Location Signboard",
    caption:
      "Divit MindSpace signboard at Aadeshwar Chambers, Kasavanahalli — Off Sarjapur Road, Bangalore.",
  },

  // ==================================================================
  // INTERIOR SPACES (hero + about + services context)
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/sitemap/divit-reception-area.jpg",
    title: "Divit MindSpace — Reception Area",
    caption: "Reception area at Divit MindSpace, Kasavanahalli, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/services`,
    imgPath: "/sitemap/divit-services-board.jpg",
    title: "Divit MindSpace — Services Board",
    caption: "Services offered at Divit MindSpace — Kasavanahalli, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/about-us`,
    imgPath: "/sitemap/divit-consultation-room-wide.jpg",
    title: "Divit MindSpace — Consultation Space",
    caption:
      "Consultation space at Divit MindSpace — Kasavanahalli, Off Sarjapur Road, Bangalore.",
  },

  // ==================================================================
  // CONSULTATION ROOMS (counselling, assessments)
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/services/counselling`,
    imgPath: "/sitemap/divit-consultation-room-1.jpg",
    title: "Counselling Room — Divit MindSpace",
    caption:
      "Counselling room at Divit MindSpace Kasavanahalli — for children, teens, adults and parents.",
  },
  {
    pageUrl: `${CANON_HOST}/services/cognitive-therapy`,
    imgPath: "/sitemap/divit-consultation-room-2.jpg",
    title: "Cognitive Therapy Room — Divit MindSpace",
    caption:
      "Cognitive therapy room at Divit MindSpace, Kasavanahalli, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/services/psychometric-assessments`,
    imgPath: "/sitemap/divit-consultation-room-3.jpg",
    title: "Assessment Room — Divit MindSpace",
    caption:
      "Clinical assessment room for psychometric and psychoeducational assessments — Divit MindSpace, Bangalore.",
  },

  // ==================================================================
  // CHILD & PLAY THERAPY SPACES
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/services/play-therapy`,
    imgPath: "/sitemap/divit-therapy-play-room.jpg",
    title: "Play Therapy Room — Divit MindSpace",
    caption:
      "Play therapy room at Divit MindSpace Kasavanahalli — child-led therapy for neurodevelopmental and emotional support.",
  },
  {
    pageUrl: `${CANON_HOST}/services/behavioral-therapy`,
    imgPath: "/sitemap/divit-child-therapy-posters.jpg",
    title: "Child Therapy Space — Divit MindSpace",
    caption:
      "Child therapy space with learning posters at Divit MindSpace, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/services/speech-therapy`,
    imgPath: "/sitemap/divit-child-therapy-wall.jpg",
    title: "Speech Therapy Area — Divit MindSpace",
    caption:
      "Speech-language therapy area at Divit MindSpace, Kasavanahalli.",
  },

  // ==================================================================
  // SPECIALIST HEADSHOTS (real, all under 1MB — compressed variants
  // live in /sitemap/ where needed)
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/specialists/debarati-basak`,
    imgPath: "/Debarati.jpeg",
    title: "Dr. Debarati Basak",
    caption:
      "Dr. Debarati Basak, Psy.D · Founding Partner, Carpediem EdPsych Consultancy LLP · Chief Growth Officer, Divit MindSpace.",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/pavithra-lakshmi-narasimhan`,
    imgPath: "/pavithra-lakshmi.png",
    title: "Dr. Pavithra Lakshmi Narasimhan",
    caption:
      "Dr. Pavithra Lakshmi Narasimhan, PhD Clinical Psychologist · Child & Adolescent Behaviour Intervention Specialist · Certified Art Therapist, Divit MindSpace.",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/dinesh-jayabalakrishnan`,
    imgPath: "/Dinesh.png",
    title: "Dinesh Jayabalakrishnan",
    caption:
      "Dinesh Jayabalakrishnan, B.O.Th. · Occupational Therapist & Table Tennis Coach, Divit MindSpace.",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/akhila-r-n`,
    imgPath: "/sitemap/akhila.png",
    title: "Akhila R N",
    caption:
      "Akhila R N, M.Sc. (Audiology & Speech-Language Pathology) · RCI Licensed Speech Language Pathologist, Divit MindSpace.",
  },
  {
    pageUrl: `${CANON_HOST}/specialists/mohamed-nowful`,
    imgPath: "/mohmed.jpeg",
    title: "Dr. S. Mohamed Nowful",
    caption:
      "Dr. S. Mohamed Nowful, B.O.Th. · Licensed Occupational Therapist · IOTR, NCAHP, AIOTA Life Member, Divit MindSpace.",
  },

  // ==================================================================
  // AWARENESS WORKSHOP PHOTOS (real past events)
  // ==================================================================
  {
    pageUrl: `${CANON_HOST}/awareness-program`,
    imgPath: "/awareness-jyoti-nivas.jpeg",
    title: "Awareness session at Jyoti Nivas College",
    caption:
      "Free awareness session delivered by Divit MindSpace at Jyoti Nivas College, Bangalore.",
  },
  {
    pageUrl: `${CANON_HOST}/awareness-program`,
    imgPath: "/awareness-tisb.jpg",
    title: "Awareness session at TISB",
    caption: "Free awareness session delivered by Divit MindSpace at TISB, Bangalore.",
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
  // Group by page URL — the sitemap spec allows multiple <image:image> per <url>.
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
