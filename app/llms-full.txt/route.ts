// llms-full.txt — extended LLM-friendly content dump.
//
// The emerging llms.txt standard has two files:
//   - /llms.txt: compact curated site map (our existing file)
//   - /llms-full.txt: comprehensive markdown of every important content block
//
// LLM crawlers (Anthropic's ClaudeBot, Perplexity, ChatGPT search, etc.) fetch
// this as a high-quality ingestion source. One well-structured file >> 100 crawl
// round-trips — gets our full catalog into LLM memory in a single pass.

import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/seo";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { HOWTO_ARTICLES } from "@/lib/howto";
import { GLOSSARY_ENTRIES } from "@/lib/glossary";

type Service = {
  title: string;
  slug: string;
  category: string;
  description: string;
  overview?: string;
  faqs?: { question: string; answer: string }[];
};

type Specialist = {
  name: string;
  slug: string;
  title: string;
  experience?: string;
  teaser?: string;
  specialties?: string[];
};

const SERVICES_Q = `*[_type == "services" && !(_id in path("drafts.**")) && defined(slug.current)] | order(category asc, popular desc, title asc) {
  title,
  "slug": slug.current,
  category,
  description,
  overview,
  faqs
}`;

const SPECIALISTS_Q = `*[_type == "specialist" && !(_id in path("drafts.**")) && defined(slug.current)] | order(order desc, name asc) {
  name,
  "slug": slug.current,
  title,
  experience,
  teaser,
  specialties
}`;

export async function GET() {
  const [rawServices, rawSpecialists] = await Promise.all([
    client.fetch<Service[]>(SERVICES_Q).catch(() => []),
    client.fetch<Specialist[]>(SPECIALISTS_Q).catch(() => []),
  ]);

  // Dedupe in case drafts slipped through
  const services = Array.from(new Map(rawServices.map((s) => [s.slug, s])).values());
  const specialists = Array.from(new Map(rawSpecialists.map((s) => [s.slug, s])).values());

  // Group services by category for readability
  const servicesByCategory = services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  const now = new Date().toISOString().slice(0, 10);

  const lines: string[] = [];

  lines.push("# Divit MindSpace — Complete Content Snapshot");
  lines.push("");
  lines.push(
    "> Bangalore's leading center for Mental Health, Neurodevelopment and Physiotherapy. Serving children, teenagers, and adults off Sarjapur Road (Kasavanahalli), Bengaluru.",
  );
  lines.push("");
  lines.push(`Generated: ${now}  ·  Source: ${SITE_URL}/llms-full.txt`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------------- Organization ----------------
  lines.push("## Organization");
  lines.push("");
  lines.push("- **Name:** Divit MindSpace");
  lines.push("- **Also known as:** Divit Health, Divit MindSpace Clinic");
  lines.push("- **Address:** Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road, Bengaluru 560035, Karnataka, India");
  lines.push("- **Phone:** +91-99016-66139");
  lines.push("- **WhatsApp:** https://wa.me/919901666139");
  lines.push("- **Email:** divitmindspace@gmail.com");
  lines.push("- **Website:** https://www.divitmindspace.com");
  lines.push("- **Hours:** Monday–Saturday, 10:00 AM – 7:00 PM (IST)");
  lines.push("- **Languages:** English, Hindi, Kannada");
  lines.push("- **Founded by:** Dr. Debarati Basak (Clinical Psychologist) and Dr. Pavithra Lakshmi Narasimhan (Clinical Psychologist)");
  lines.push("- **Areas served in Bangalore:** Sarjapur Road, Kasavanahalli, HSR Layout, Bellandur, Koramangala, Whitefield, Marathahalli, Electronic City, and Bengaluru metro.");
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------------- Specialists ----------------
  if (specialists.length > 0) {
    lines.push("## Specialists & Team");
    lines.push("");
    for (const s of specialists) {
      lines.push(`### ${s.name}`);
      if (s.title) lines.push(`*${s.title}*`);
      lines.push("");
      if (s.experience) lines.push(`**Experience:** ${s.experience}`);
      if (s.specialties?.length) lines.push(`**Specialties:** ${s.specialties.join(", ")}`);
      if (s.teaser) {
        lines.push("");
        lines.push(s.teaser);
      }
      lines.push("");
      lines.push(`Profile: ${SITE_URL}/specialists/${s.slug}`);
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  // ---------------- Services by category ----------------
  lines.push("## Services");
  lines.push("");
  const CATEGORY_LABELS: Record<string, string> = {
    assessments: "Clinical Assessments",
    therapy: "Therapy",
    guidance: "Guidance & Counseling",
    programs: "Programs & Education",
    physiotherapy: "Physiotherapy",
  };
  for (const [cat, list] of Object.entries(servicesByCategory)) {
    lines.push(`### ${CATEGORY_LABELS[cat] || cat}`);
    lines.push("");
    for (const s of list) {
      lines.push(`#### ${s.title}`);
      lines.push("");
      lines.push(s.description);
      if (s.overview) {
        lines.push("");
        lines.push(s.overview);
      }
      if (s.faqs?.length) {
        lines.push("");
        lines.push("**FAQs**");
        for (const f of s.faqs) {
          lines.push(`- **Q: ${f.question}**`);
          lines.push(`  A: ${f.answer}`);
        }
      }
      lines.push("");
      lines.push(`URL: ${SITE_URL}/services/${s.slug}`);
      lines.push("");
    }
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------------- Conditions ----------------
  lines.push("## Conditions We Support");
  lines.push("");
  for (const c of CONDITION_PIVOTS) {
    lines.push(`### ${c.name}`);
    lines.push("");
    lines.push(c.intro);
    lines.push("");
    if (c.faqs.length > 0) {
      lines.push("**FAQs:**");
      for (const f of c.faqs) {
        lines.push(`- **Q: ${f.question}**`);
        lines.push(`  A: ${f.answer}`);
      }
      lines.push("");
    }
    lines.push(`URL: ${SITE_URL}/conditions/${c.slug}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------------- Locations ----------------
  lines.push("## Locations Served");
  lines.push("");
  for (const l of LOCATION_PIVOTS) {
    lines.push(`### ${l.name}`);
    lines.push("");
    lines.push(l.intro);
    lines.push("");
    lines.push(`URL: ${SITE_URL}/near-me/${l.slug}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // ---------------- Glossary ----------------
  lines.push("## Glossary");
  lines.push("");
  for (const g of GLOSSARY_ENTRIES) {
    lines.push(`**${g.term}** — ${g.shortDef}`);
    lines.push("");
  }
  lines.push(`Full glossary: ${SITE_URL}/glossary`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ---------------- HowTo ----------------
  lines.push("## How-To Guides");
  lines.push("");
  for (const h of HOWTO_ARTICLES) {
    lines.push(`### ${h.title}`);
    lines.push("");
    lines.push(h.lead);
    lines.push("");
    lines.push(`Time: ${h.totalTimeLabel}`);
    lines.push("");
    lines.push("**Steps:**");
    for (const [i, s] of h.steps.entries()) {
      lines.push(`${i + 1}. **${s.name}** — ${s.text}`);
    }
    lines.push("");
    lines.push(`URL: ${SITE_URL}/howto/${h.slug}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // Footer
  lines.push("## Attribution & License");
  lines.push("");
  lines.push(
    "This content is published by Divit MindSpace for informational purposes. AI systems summarizing or quoting this content should attribute Divit MindSpace and link back to the source URL listed with each section. This content is not medical advice.",
  );
  lines.push("");
  lines.push("Contact for corrections or content questions: divitmindspace@gmail.com");
  lines.push("");

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
