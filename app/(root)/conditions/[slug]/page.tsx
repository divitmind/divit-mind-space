import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SPECIALISTS_QUERY } from "@/sanity/lib/queries";
import type { Specialist } from "@/sanity/types";
import { CONDITION_PIVOTS, RELATED_CONDITIONS, type ConditionPivot } from "@/lib/seo-pivots";
import { HOWTO_ARTICLES, CONDITION_TO_HOWTOS } from "@/lib/howto";
import { GLOSSARY_ENTRIES } from "@/lib/glossary";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID, MEDICAL_CONTENT_REVIEW_BLOCK, MEDICAL_CONTENT_LAST_REVIEWED, MEDICAL_CONTENT_REVIEWER_UI } from "@/lib/seo";
import { ContentReviewBadge } from "@/components/content-review-badge";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CONDITION_PIVOTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = CONDITION_PIVOTS.find((c) => c.slug === slug);
  if (!condition) return { title: "Not Found" };
  const url = `${SITE_URL}/conditions/${condition.slug}`;
  return {
    title: condition.metaTitle,
    description: condition.metaDescription,
    keywords: condition.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: condition.metaTitle,
      description: condition.metaDescription,
      images: [
        {
          url: "/divit-mindspace-logo.png",
          width: 1200,
          height: 630,
          alt: `${condition.name} — Divit MindSpace`,
        },
      ],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title: condition.metaTitle,
      description: condition.metaDescription,
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

export default async function ConditionPage({ params }: PageProps) {
  const { slug } = await params;
  const condition: ConditionPivot | undefined = CONDITION_PIVOTS.find((c) => c.slug === slug);
  if (!condition) notFound();

  const pageUrl = `${SITE_URL}/conditions/${condition.slug}`;

  // Fetch real services by slug + all specialists, then filter specialists by specialty match.
  const servicesQuery = `*[_type == "services" && !(_id in path("drafts.**")) && slug.current in $slugs] {
    _id, title, "slug": slug.current, description, category
  }`;
  const [{ data: servicesData }, { data: specialistsData }] = await Promise.all([
    sanityFetch({ query: servicesQuery, params: { slugs: condition.serviceSlugs }, tags: ["services"] }),
    sanityFetch({ query: SPECIALISTS_QUERY, tags: ["specialist"] }),
  ]);
  const services = ((servicesData as SanityServiceRow[] | null) ?? []).sort(
    (a, b) => condition.serviceSlugs.indexOf(a.slug) - condition.serviceSlugs.indexOf(b.slug),
  );
  const rawSpecialists = (specialistsData as Specialist[] | null) ?? [];
  const allSpecialists = Array.from(
    new Map(rawSpecialists.filter((s) => s?.slug?.current).map((s) => [s.slug!.current, s])).values(),
  );
  const tagsLower = condition.specialtyTags.map((t) => t.toLowerCase());
  const matchedSpecialists = allSpecialists.filter((s) =>
    (s.specialties || []).some((sp) => tagsLower.some((t) => sp.toLowerCase().includes(t) || t.includes(sp.toLowerCase()))),
  );

  // Topically-related conditions — curated graph in seo-pivots.ts.
  const relatedConditionSlugs = RELATED_CONDITIONS[condition.slug] || [];
  const relatedConditions = relatedConditionSlugs
    .map((s) => CONDITION_PIVOTS.find((c) => c.slug === s))
    .filter((c): c is ConditionPivot => Boolean(c));

  // Matching HowTo guides for this condition — closes condition ↔ howto graph.
  const howtoSlugs = CONDITION_TO_HOWTOS[condition.slug] || [];
  const matchingHowtos = howtoSlugs
    .map((slug) => HOWTO_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  // Matching glossary entries — we match by specialty tag being present in a glossary term
  // or by direct slug alias. Cheap, and only surfaces pages backed by real content.
  const glossaryMatches = GLOSSARY_ENTRIES.filter((g) => {
    const termLower = g.term.toLowerCase();
    if (tagsLower.some((t) => termLower.includes(t))) return true;
    // Slug alias matching (e.g. condition "adhd" → glossary "adhd" and "adult-adhd").
    if (g.slug === condition.slug) return true;
    if (condition.slug === "adhd" && (g.slug === "adult-adhd" || g.slug === "adhd")) return true;
    if (condition.slug === "autism" && (g.slug === "autism" || g.slug === "adult-autism")) return true;
    return false;
  });

  // Structured data graph — one script with MedicalCondition + MedicalWebPage +
  // BreadcrumbList + FAQPage + ItemList (services). All cross-reference canonical Organization.
  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Conditions", item: `${SITE_URL}/conditions` },
        { "@type": "ListItem", position: 3, name: condition.name, item: pageUrl },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: condition.metaTitle,
      description: condition.metaDescription,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: {
        "@type": "MedicalCondition",
        "@id": `${pageUrl}#condition`,
        name: condition.name,
        // Enrich MedicalCondition with possibleTreatment links to real services.
        // Link by @id (matches the `@id` each service page sets on its own
        // schema) so Google treats this as one canonical entity graph instead
        // of duplicating the MedicalTherapy node on every condition page.
        ...(services.length > 0 && {
          possibleTreatment: services.map((s) => ({
            "@id": `${SITE_URL}/services/${s.slug}#service`,
          })),
        }),
      },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      provider: ORGANIZATION_REF,
      // YMYL signal — Google weighs "who reviewed this health content and when".
      ...MEDICAL_CONTENT_REVIEW_BLOCK,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h3", "[data-speakable]"],
      },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#services`,
      name: `Services at Divit MindSpace for ${condition.name}`,
      numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/services/${s.slug}`,
        name: s.title,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: ORGANIZATION_REF,
      mainEntity: condition.faqs.map((f) => ({
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
            <nav className="flex items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <span className="text-green font-medium">{condition.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
                Condition Support
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                data-speakable
              >
                {condition.name} — Bangalore
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium" data-speakable>
                {condition.intro}
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

        {/* Services */}
        {services.length > 0 && (
          <section className="py-8 lg:py-10 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Services for {condition.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {services.map((s) => (
                    <Link
                      key={s._id}
                      href={`/services/${s.slug}`}
                      className="group block p-6 bg-[#FAF9F5] rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                    >
                      <h3 className="font-semibold text-black mb-2 group-hover:text-[#7A9A7D] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-sm text-black/60 line-clamp-3">{s.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                        Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Specialists */}
        {matchedSpecialists.length > 0 && (
          <section className="py-8 lg:py-10 bg-cream">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Specialists Supporting {condition.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedSpecialists.map((sp) => {
                    const imageUrl = sp.image?.asset?.url;
                    return (
                      <Link
                        key={sp._id}
                        href={`/specialists/${sp.slug?.current}`}
                        className="group flex gap-4 p-4 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                      >
                        {imageUrl && (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                            <Image src={imageUrl} alt={sp.name} fill sizes="64px" className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors line-clamp-1">
                            {sp.name}
                          </h3>
                          <p className="text-xs text-black/60 line-clamp-2">{sp.title}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {condition.faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-[#FAF9F5] rounded-2xl border border-black/5 open:shadow-lg transition-all"
                  >
                    <summary className="cursor-pointer p-6 font-semibold text-black flex items-start justify-between gap-4">
                      <span>{f.question}</span>
                      <span className="text-[#7A9A7D] text-xl group-open:rotate-45 transition-transform shrink-0">+</span>
                    </summary>
                    <p className="px-6 pb-6 text-black/70 leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Guides (matching HowTo articles) — closes condition ↔ howto graph */}
        {matchingHowtos.length > 0 && (
          <section className="py-8 lg:py-10 bg-cream">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Preparation Guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {matchingHowtos.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/howto/${a.slug}`}
                      className="group block p-6 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                    >
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest mb-3">
                        <Clock className="w-3 h-3" />
                        {a.totalTimeLabel}
                      </div>
                      <h3 className="text-lg font-serif italic text-black mb-2 group-hover:text-[#7A9A7D] transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-sm text-black/60 line-clamp-2">{a.lead}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                        Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Glossary terms — closes condition ↔ glossary graph */}
        {glossaryMatches.length > 0 && (
          <section className="py-8 lg:py-10 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Glossary &mdash; Terms to Know
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {glossaryMatches.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/glossary#${g.slug}`}
                      className="group flex items-start gap-3 p-5 bg-[#FAF9F5] rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:bg-white transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-[#7A9A7D] mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors mb-1">
                          {g.term}
                        </div>
                        <p className="text-sm text-black/60 line-clamp-2">{g.shortDef}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related conditions — topical adjacencies for deeper browsing */}
        {relatedConditions.length > 0 && (
          <section className="py-8 lg:py-10 bg-[#FAF9F5]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Related Conditions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedConditions.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/conditions/${c.slug}`}
                      className="group block p-5 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                    >
                      <h3 className="font-serif italic text-black group-hover:text-[#7A9A7D] transition-colors mb-1">
                        {c.name}
                      </h3>
                      <p className="text-sm text-black/60 line-clamp-2">{c.intro}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA — shared voice (Not ready to book?) */}
        <section className="pt-6 pb-12 lg:pt-8 lg:pb-16 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
