import type { Metadata } from "next";
import Link from "next/link";
import { CONDITION_PIVOTS } from "@/lib/seo-pivots";
import { COMPARISON_PAIRS } from "@/lib/condition-comparisons";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Conditions — Autism, ADHD, LD & More | Divit MindSpace Bangalore",
  description:
    "Side-by-side comparisons of the conditions we support — Autism vs ADHD, ADHD vs Learning Disabilities, and more. Plain-English guides from Divit MindSpace Bangalore.",
  keywords: [
    "autism vs adhd",
    "adhd vs learning disability",
    "condition comparison bangalore",
    "is it autism or adhd",
    "divit mindspace compare",
  ],
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/compare`,
    title: "Compare Conditions — Autism, ADHD, LD & More",
    description: "Side-by-side comparisons of conditions.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "Compare Conditions" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Conditions | Divit MindSpace",
    description: "Side-by-side comparisons.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function CompareIndex() {
  const pageUrl = `${SITE_URL}/compare`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Conditions", item: `${SITE_URL}/conditions` },
          { "@type": "ListItem", position: 3, name: "Compare", item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "Condition Comparisons",
        description: "Side-by-side comparisons of the conditions Divit MindSpace supports.",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        numberOfItems: COMPARISON_PAIRS.length,
        itemListElement: COMPARISON_PAIRS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/compare/${p.slug}`,
          name: p.h1,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#FAF9F5] min-h-screen">
        <div className="bg-cream/50 border-b border-green/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <Link href="/conditions" className="hover:text-green transition-colors">Conditions</Link>
              <span>/</span>
              <span className="text-green font-medium">Compare</span>
            </nav>
          </div>
        </div>

        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                Condition comparisons
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Is it this, or that?
              </h1>
              <p className="text-lg text-black/70 font-medium">
                Side-by-side guides for the condition-vs-condition questions parents and adults
                ask us most. Plain-English, clinically reviewed.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              {COMPARISON_PAIRS.map((p) => {
                const a = CONDITION_PIVOTS.find((c) => c.slug === p.a);
                const b = CONDITION_PIVOTS.find((c) => c.slug === p.b);
                return (
                  <Link
                    key={p.slug}
                    href={`/compare/${p.slug}`}
                    className="group block p-6 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#7A9A7D] uppercase tracking-widest">
                      <span>{a?.name || p.a}</span>
                      <span className="text-black/30">vs</span>
                      <span>{b?.name || p.b}</span>
                    </div>
                    <h2 className="font-serif italic text-xl text-black mb-2 group-hover:text-[#7A9A7D] transition-colors leading-snug">
                      {p.h1}
                    </h2>
                    <p className="text-sm text-black/60 line-clamp-3">{p.lead}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                      Read comparison <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pt-4 pb-12 lg:pt-6 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
