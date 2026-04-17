import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY, ALL_SERVICES_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings, FAQ } from "@/lib/types";
import { CONDITION_PIVOTS } from "@/lib/seo-pivots";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All FAQs | Divit MindSpace Bangalore",
  description:
    "Every frequently asked question about Divit MindSpace in one place — autism, ADHD, learning disabilities, counseling, physiotherapy, and more. Serving Kasavanahalli, Sarjapur Road, HSR Layout, Bellandur, and Bengaluru.",
  keywords: [
    "Divit MindSpace FAQ",
    "autism FAQ Bangalore",
    "ADHD FAQ Bangalore",
    "therapy FAQ Sarjapur Road",
    "physiotherapy FAQ Kasavanahalli",
    "mental health FAQ Bengaluru",
  ],
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
    title: "All FAQs | Divit MindSpace Bangalore",
    description:
      "Every frequently asked question about Divit MindSpace services, team, and location — in one searchable page.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "FAQs — Divit MindSpace" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "All FAQs | Divit MindSpace Bangalore",
    description: "Every Divit MindSpace FAQ, in one place.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

type ServiceWithFaqs = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  faqs?: { question: string; answer: string }[];
};

type Section = { title: string; href?: string; faqs: FAQ[] };

export default async function FaqAggregatorPage() {
  const [{ data: siteSettings }, { data: servicesData }] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: ALL_SERVICES_QUERY, tags: ["services"] }),
  ]);

  const settings = siteSettings;
  const services = (servicesData as ServiceWithFaqs[] | null) ?? [];

  const sections: Section[] = [];

  if (settings?.aboutPage?.faqs?.length) {
    sections.push({ title: "About Divit MindSpace", href: "/about-us", faqs: settings.aboutPage.faqs });
  }
  if (settings?.contactPage?.faqs?.length) {
    sections.push({ title: "Contact & Booking", href: "/contact-us", faqs: settings.contactPage.faqs });
  }
  if (settings?.homepage?.faqs?.length) {
    sections.push({ title: "General Questions", href: "/", faqs: settings.homepage.faqs });
  }
  if (settings?.careersPage?.faqs?.length) {
    sections.push({ title: "Careers", href: "/careers", faqs: settings.careersPage.faqs });
  }

  // Condition pivots — already authored for SEO, highest-intent content on the site.
  CONDITION_PIVOTS.forEach((c) => {
    sections.push({
      title: c.name,
      href: `/conditions/${c.slug}`,
      faqs: c.faqs,
    });
  });

  // Service-level FAQs — only include services that actually have faq entries.
  services
    .filter((s) => s.faqs && s.faqs.length > 0)
    .forEach((s) => {
      sections.push({
        title: s.title,
        href: `/services/${s.slug.current}`,
        faqs: s.faqs || [],
      });
    });

  // Dedupe FAQs across sections by question text (case-insensitive).
  const seen = new Set<string>();
  const dedupedSections: Section[] = [];
  for (const sec of sections) {
    const unique = sec.faqs.filter((f) => {
      const key = f.question.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (unique.length > 0) {
      dedupedSections.push({ ...sec, faqs: unique });
    }
  }

  const allFaqs = dedupedSections.flatMap((s) => s.faqs);

  const pageUrl = `${SITE_URL}/faq`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "FAQs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        name: "All FAQs | Divit MindSpace Bangalore",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["summary"],
        },
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen">
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <span className="text-green font-medium">FAQs</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                All FAQs — {allFaqs.length} answers
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium">
                Every answer about Divit MindSpace — our services, team, location, and what to
                expect — in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Section TOC */}
        {dedupedSections.length > 1 && (
          <section className="pb-6">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
                {dedupedSections.map((s, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-semibold text-black/70 hover:bg-[#7A9A7D]/10 hover:border-[#7A9A7D]/30 transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ sections */}
        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-10">
              {dedupedSections.map((s, i) => (
                <div key={i} id={`section-${i}`} className="scroll-mt-24">
                  <div className="flex items-baseline justify-between mb-4 gap-3">
                    <h2
                      className="text-2xl lg:text-3xl font-serif text-black"
                      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                    >
                      {s.title}
                    </h2>
                    {s.href && (
                      <Link
                        href={s.href}
                        className="text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest hover:underline underline-offset-4 shrink-0"
                      >
                        Go to page →
                      </Link>
                    )}
                  </div>
                  <div className="space-y-3">
                    {s.faqs.map((f, j) => (
                      <details
                        key={j}
                        className="group bg-white rounded-2xl border border-black/5 open:shadow-lg transition-all"
                      >
                        <summary className="cursor-pointer p-5 font-semibold text-black flex items-start justify-between gap-4 list-none">
                          <span>{f.question}</span>
                          <span className="text-[#7A9A7D] text-xl group-open:rotate-45 transition-transform shrink-0">
                            +
                          </span>
                        </summary>
                        <p className="px-5 pb-5 text-black/70 leading-relaxed font-medium">
                          {f.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — shared voice */}
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock heading="Question not answered here?" />
          </div>
        </section>
      </div>
    </>
  );
}
