// Condition-vs-Condition comparison pages — captures "is it X or Y?" search intent
// which Cadabam's CDC ranks heavily for but we had zero coverage on. 8 pages generated
// from COMPARISON_PAIRS in lib/condition-comparisons.ts.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { CONDITION_PIVOTS } from "@/lib/seo-pivots";
import { COMPARISON_PAIRS, type ComparisonPair } from "@/lib/condition-comparisons";
import {
  ORGANIZATION_REF,
  SITE_URL,
  SITE_LANGUAGE,
  WEBSITE_ID,
  MEDICAL_CONTENT_REVIEW_BLOCK,
  MEDICAL_CONTENT_LAST_REVIEWED,
  MEDICAL_CONTENT_REVIEWER_UI,
} from "@/lib/seo";
import { ContentReviewBadge } from "@/components/content-review-badge";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export function generateStaticParams() {
  return COMPARISON_PAIRS.map((c) => ({ pair: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const p = COMPARISON_PAIRS.find((c) => c.slug === pair);
  if (!p) return { title: "Not Found" };
  const url = `${SITE_URL}/compare/${p.slug}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: p.metaTitle,
      description: p.metaDescription,
      images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: p.h1 }],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
      images: ["/divit-mindspace-logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

type SanityServiceRow = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
};

export default async function ComparisonPage({ params }: PageProps) {
  const { pair } = await params;
  const p: ComparisonPair | undefined = COMPARISON_PAIRS.find((c) => c.slug === pair);
  if (!p) notFound();

  const condA = CONDITION_PIVOTS.find((c) => c.slug === p.a);
  const condB = CONDITION_PIVOTS.find((c) => c.slug === p.b);
  if (!condA || !condB) notFound();

  const pageUrl = `${SITE_URL}/compare/${p.slug}`;

  // Services relevant to EITHER condition — fetch real services from Sanity.
  // We then compute: shared (both need), A-only, B-only — a data-driven view.
  const allSlugs = Array.from(new Set([...condA.serviceSlugs, ...condB.serviceSlugs]));
  const servicesQuery = `*[_type == "services" && !(_id in path("drafts.**")) && slug.current in $slugs] {
    _id, title, "slug": slug.current, description, category
  }`;
  const { data: servicesData } = await sanityFetch({
    query: servicesQuery,
    params: { slugs: allSlugs },
    tags: ["services"],
  });
  const services = (servicesData as SanityServiceRow[] | null) ?? [];
  const slugMap = new Map(services.map((s) => [s.slug, s]));
  const shared = condA.serviceSlugs.filter((s) => condB.serviceSlugs.includes(s)).map((s) => slugMap.get(s)).filter(Boolean) as SanityServiceRow[];
  const onlyA = condA.serviceSlugs.filter((s) => !condB.serviceSlugs.includes(s)).map((s) => slugMap.get(s)).filter(Boolean) as SanityServiceRow[];
  const onlyB = condB.serviceSlugs.filter((s) => !condA.serviceSlugs.includes(s)).map((s) => slugMap.get(s)).filter(Boolean) as SanityServiceRow[];

  // @graph with BreadcrumbList + MedicalWebPage + 2 MedicalCondition + FAQPage.
  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Conditions", item: `${SITE_URL}/conditions` },
        { "@type": "ListItem", position: 3, name: "Compare", item: `${SITE_URL}/compare` },
        { "@type": "ListItem", position: 4, name: p.h1, item: pageUrl },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: p.metaTitle,
      description: p.metaDescription,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      provider: ORGANIZATION_REF,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      ...MEDICAL_CONTENT_REVIEW_BLOCK,
      about: [
        {
          "@type": "MedicalCondition",
          "@id": `${SITE_URL}/conditions/${condA.slug}#condition`,
          name: condA.name,
          url: `${SITE_URL}/conditions/${condA.slug}`,
        },
        {
          "@type": "MedicalCondition",
          "@id": `${SITE_URL}/conditions/${condB.slug}#condition`,
          name: condB.name,
          url: `${SITE_URL}/conditions/${condB.slug}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: ORGANIZATION_REF,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h3", "summary"] },
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen">
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <Link href="/conditions" className="hover:text-green transition-colors">Conditions</Link>
              <span>/</span>
              <span className="text-green font-medium">Compare</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                Side-by-side guide
              </div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {p.h1}
              </h1>
              <p className="text-lg text-black/70 font-medium leading-relaxed">
                {p.lead}
              </p>
              <div className="max-w-2xl mx-auto mt-6">
                <ContentReviewBadge
                  lastReviewedDate={MEDICAL_CONTENT_LAST_REVIEWED}
                  reviewer={MEDICAL_CONTENT_REVIEWER_UI}
                  compact
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key differences — side-by-side */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Key differences at a glance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-black/5">
                  <h3 className="text-lg font-semibold text-[#7A9A7D] mb-1">{condA.name}</h3>
                </div>
                <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-black/5">
                  <h3 className="text-lg font-semibold text-[#7A9A7D] mb-1">{condB.name}</h3>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {p.keyDifferences.map((d, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 bg-white rounded-2xl border border-black/5 p-5">
                    <div className="font-bold text-black/40 text-[10px] uppercase tracking-widest pt-1">
                      {d.label}
                    </div>
                    <p className="text-sm text-black/70 leading-relaxed">
                      <span className="font-semibold text-black/90 md:hidden">{condA.name}: </span>
                      {d.a}
                    </p>
                    <p className="text-sm text-black/70 leading-relaxed">
                      <span className="font-semibold text-black/90 md:hidden">{condB.name}: </span>
                      {d.b}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Overlaps */}
        <section className="py-8 lg:py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Where they overlap
              </h2>
              <ul className="space-y-3">
                {p.overlaps.map((o, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-black/5">
                    <CheckCircle2 className="w-5 h-5 text-[#7A9A7D] shrink-0 mt-0.5" />
                    <span className="text-black/70 font-medium leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Services matrix */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Services at Divit MindSpace
              </h2>

              {shared.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-black mb-4">Support both {condA.name} and {condB.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {shared.map((s) => (
                      <Link
                        key={s._id}
                        href={`/services/${s.slug}`}
                        className="group block p-4 bg-[#FAF9F5] rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 transition-all"
                      >
                        <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors">{s.title}</div>
                        <p className="text-sm text-black/60 line-clamp-2 mt-1">{s.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {onlyA.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Specific to {condA.name}</h3>
                    <div className="space-y-2">
                      {onlyA.map((s) => (
                        <Link key={s._id} href={`/services/${s.slug}`} className="group block p-3 bg-[#FAF9F5] rounded-xl border border-black/5 hover:border-[#7A9A7D]/30 transition-all">
                          <span className="font-medium text-black/80 text-sm group-hover:text-[#7A9A7D] transition-colors">{s.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {onlyB.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Specific to {condB.name}</h3>
                    <div className="space-y-2">
                      {onlyB.map((s) => (
                        <Link key={s._id} href={`/services/${s.slug}`} className="group block p-3 bg-[#FAF9F5] rounded-xl border border-black/5 hover:border-[#7A9A7D]/30 transition-all">
                          <span className="font-medium text-black/80 text-sm group-hover:text-[#7A9A7D] transition-colors">{s.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-8 lg:py-10 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {p.faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-white rounded-2xl border border-black/5 open:shadow-lg transition-all"
                  >
                    <summary className="cursor-pointer p-5 font-semibold text-black flex items-start justify-between gap-4 list-none">
                      <span>{f.question}</span>
                      <span className="text-[#7A9A7D] text-xl group-open:rotate-45 transition-transform shrink-0">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-black/70 leading-relaxed font-medium">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deeper dive links */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Go deeper
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/conditions/${condA.slug}`} className="group block p-6 bg-[#FAF9F5] rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all">
                  <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors text-lg">{condA.name}</div>
                  <p className="text-sm text-black/60 line-clamp-2 mt-1">{condA.intro}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                    Full overview <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href={`/conditions/${condB.slug}`} className="group block p-6 bg-[#FAF9F5] rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all">
                  <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors text-lg">{condB.name}</div>
                  <p className="text-sm text-black/60 line-clamp-2 mt-1">{condB.intro}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                    Full overview <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-6 pb-12 lg:pt-8 lg:pb-16 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <InlineCtaBlock heading="Not sure which assessment to book first?" />
          </div>
        </section>
      </div>
    </>
  );
}
