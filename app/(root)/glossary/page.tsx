import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY_ENTRIES } from "@/lib/glossary";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Glossary | Divit MindSpace — Autism, ADHD, NIOS, Sensory Integration & More",
  description:
    "Plain-English definitions of key clinical terms: Autism, ADHD, Learning Disabilities, NIOS, Sensory Integration, Early Intervention, Cognitive Therapy, Occupational Therapy, Pain Modalities, Shadow Teachers and more — from Divit MindSpace Bangalore.",
  keywords: [
    "autism definition",
    "ADHD definition",
    "NIOS meaning",
    "sensory integration explained",
    "occupational therapy explained",
    "cognitive therapy CBT Bangalore",
    "special education glossary",
    "physiotherapy terms Bangalore",
    "Divit MindSpace glossary",
  ],
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/glossary`,
    title: "Glossary | Divit MindSpace Bangalore",
    description:
      "Plain-English definitions of key clinical terms used in neurodevelopment, mental health, education, and physiotherapy.",
    images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: "Divit MindSpace Glossary" }],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary | Divit MindSpace Bangalore",
    description: "Clinical term definitions — plain English.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function GlossaryPage() {
  const pageUrl = `${SITE_URL}/glossary`;

  // DefinedTermSet + DefinedTerm — Google supports DefinedTerm for glossaries;
  // each term can surface as a separate entity in LLM training and search.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Glossary", item: pageUrl },
        ],
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${pageUrl}#termset`,
        url: pageUrl,
        name: "Divit MindSpace Clinical Glossary",
        description:
          "Definitions of key terms in neurodevelopment, mental health, education, and physiotherapy.",
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": WEBSITE_ID },
        about: ORGANIZATION_REF,
        hasDefinedTerm: GLOSSARY_ENTRIES.map((e) => ({
          "@type": "DefinedTerm",
          "@id": `${pageUrl}#${e.slug}`,
          name: e.term,
          description: e.shortDef,
          url: `${pageUrl}#${e.slug}`,
          inDefinedTermSet: `${pageUrl}#termset`,
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
              <span className="text-green font-medium">Glossary</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                Clinical Glossary
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Key Terms, Plain English
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium">
                Definitions of the conditions, therapies, and programs we work with every day —
                written to answer a question fast and point you to the right resource.
              </p>
            </div>
          </div>
        </section>

        {/* A–Z jump bar */}
        <section className="pb-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
              {GLOSSARY_ENTRIES.map((e) => (
                <a
                  key={e.slug}
                  href={`#${e.slug}`}
                  className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-semibold text-black/70 hover:bg-[#7A9A7D]/10 hover:border-[#7A9A7D]/30 transition-colors"
                >
                  {e.term.split(" ")[0].replace(/[()]/g, "")}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Term list */}
        <section className="pb-10 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-5">
              {GLOSSARY_ENTRIES.map((e) => (
                <article
                  key={e.slug}
                  id={e.slug}
                  className="scroll-mt-24 bg-white rounded-2xl border border-black/5 p-6 lg:p-8 shadow-sm shadow-black/[0.02]"
                >
                  <h2 className="text-xl lg:text-2xl font-serif italic text-black mb-3">
                    {e.term}
                  </h2>
                  <p className="text-black/70 font-medium leading-relaxed mb-4">
                    {e.shortDef}
                  </p>
                  {e.relatedPaths.length > 0 && (
                    <div className="pt-4 border-t border-black/5">
                      <div className="font-bold text-black/40 text-[10px] uppercase tracking-widest mb-2">
                        Related at Divit MindSpace
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {e.relatedPaths.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-black/5 text-[11px] font-semibold text-[#7A9A7D] hover:bg-[#7A9A7D] hover:text-white hover:border-[#7A9A7D] transition-colors"
                          >
                            {p.label}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — shared voice */}
        <section className="pb-12 lg:pb-16">
          <div className="container mx-auto px-4">
            <InlineCtaBlock heading="Term you&rsquo;re looking for isn&rsquo;t listed?" />
          </div>
        </section>
      </div>
    </>
  );
}
