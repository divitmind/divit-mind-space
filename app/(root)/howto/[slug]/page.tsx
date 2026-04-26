import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HOWTO_ARTICLES, type HowToArticle } from "@/lib/howto";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID, MEDICAL_CONTENT_REVIEW_BLOCK } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HOWTO_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const a = HOWTO_ARTICLES.find((x) => x.slug === slug);
  if (!a) return { title: "Not Found" };
  const url = `${SITE_URL}/howto/${a.slug}`;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    keywords: a.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: a.metaTitle,
      description: a.metaDescription,
      images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: a.title }],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title: a.metaTitle,
      description: a.metaDescription,
      images: ["/divit-mindspace-logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function HowToPage({ params }: PageProps) {
  const { slug } = await params;
  const a: HowToArticle | undefined = HOWTO_ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();

  const pageUrl = `${SITE_URL}/howto/${a.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "How-To", item: `${SITE_URL}/howto` },
          { "@type": "ListItem", position: 3, name: a.title, item: pageUrl },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: a.title,
        description: a.metaDescription,
        url: pageUrl,
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        totalTime: a.totalTime,
        publisher: ORGANIZATION_REF,
        ...MEDICAL_CONTENT_REVIEW_BLOCK,
        step: a.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${pageUrl}#step-${i + 1}`,
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
              <Link href="/howto" className="hover:text-green transition-colors">How-To</Link>
              <span>/</span>
              <span className="text-green font-medium">{a.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3 text-[#7A9A7D]" />
                {a.totalTimeLabel}
              </div>
              <h1
                className="text-4xl md:text-5xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {a.title}
              </h1>
              <p className="text-lg text-black/70 font-medium leading-relaxed">
                {a.lead}
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-6 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <ol className="space-y-6">
                {a.steps.map((s, i) => (
                  <li
                    key={i}
                    id={`step-${i + 1}`}
                    className="scroll-mt-24 bg-[#FAF9F5] rounded-2xl border border-black/5 p-6 lg:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#7A9A7D] text-white font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-serif italic text-black mb-2">
                          {s.name}
                        </h2>
                        <p className="text-black/70 font-medium leading-relaxed">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Related terms + pages */}
        <section className="py-8 lg:py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {a.relatedGlossarySlugs.length > 0 && (
                <div className="bg-white rounded-2xl border border-black/5 p-6 lg:p-8">
                  <div className="font-bold text-black/40 text-[10px] uppercase tracking-widest mb-3">
                    Glossary
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {a.relatedGlossarySlugs.map((g) => (
                      <Link
                        key={g}
                        href={`/glossary#${g}`}
                        className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-black/5 text-[11px] font-semibold text-black/70 hover:bg-[#7A9A7D]/10 hover:border-[#7A9A7D]/30 transition-colors"
                      >
                        {g}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {a.relatedPaths.length > 0 && (
                <div className="bg-white rounded-2xl border border-black/5 p-6 lg:p-8">
                  <div className="font-bold text-black/40 text-[10px] uppercase tracking-widest mb-3">
                    Related at Divit MindSpace
                  </div>
                  <ul className="space-y-2">
                    {a.relatedPaths.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#7A9A7D] hover:underline underline-offset-4"
                        >
                          {p.label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA — shared voice */}
        <section className="pt-6 pb-12 lg:pt-8 lg:pb-16 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
