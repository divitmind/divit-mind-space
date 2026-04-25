import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCATION_PIVOTS, type LocationPivot, CONDITION_PIVOTS } from "@/lib/seo-pivots";
import { ORGANIZATION_REF, SITE_URL, SITE_LANGUAGE, WEBSITE_ID } from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, MapPin, Phone } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LOCATION_PIVOTS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATION_PIVOTS.find((l) => l.slug === slug);
  if (!loc) return { title: "Not Found" };
  const url = `${SITE_URL}/near-me/${loc.slug}`;
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: loc.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: loc.metaTitle,
      description: loc.metaDescription,
      images: [
        {
          url: "/divit-mindspace-logo.png",
          width: 1200,
          height: 630,
          alt: `Divit MindSpace — near ${loc.name}`,
        },
      ],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title: loc.metaTitle,
      description: loc.metaDescription,
      images: ["/divit-mindspace-logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

// Curated set of high-intent "umbrella" services shown on every location page.
// These are the real Sanity slugs — we keep the list small to avoid thin content risk.
const LOCATION_SERVICE_CARDS: { title: string; slug: string; blurb: string }[] = [
  {
    title: "Clinical Assessments",
    slug: "psychometric-assessments",
    blurb: "Autism, ADHD, Learning Disabilities, Adult Autism, Adult ADHD.",
  },
  {
    title: "Speech Therapy",
    slug: "speech-therapy",
    blurb: "RCI-licensed speech-language pathology for all ages.",
  },
  {
    title: "Occupational Therapy",
    slug: "occupational-therapy",
    blurb: "Sensory, motor, and daily-living-skills support.",
  },
  {
    title: "Counseling for Teens & Adults",
    slug: "counselling",
    blurb: "Stress, anxiety, depression, adult ADHD, adult autism.",
  },
  {
    title: "Special Education & NIOS",
    slug: "special-education--remedial-sessions",
    blurb: "Remedial sessions and NIOS support for academic progress.",
  },
  {
    title: "Physiotherapy — Pain Management",
    slug: "pain-management",
    blurb: "Chronic and acute pain, post-surgical rehab, sports injuries.",
  },
];

export default async function NearMePage({ params }: PageProps) {
  const { slug } = await params;
  const loc: LocationPivot | undefined = LOCATION_PIVOTS.find((l) => l.slug === slug);
  if (!loc) notFound();

  const pageUrl = `${SITE_URL}/near-me/${loc.slug}`;

  // LocalBusiness variant with areaServed focused on this neighborhood — tells
  // Google "we specifically serve this area" without creating a fake second location.
  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Near Me", item: `${SITE_URL}/near-me` },
        { "@type": "ListItem", position: 3, name: loc.name, item: pageUrl },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: loc.metaTitle,
      description: loc.metaDescription,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: ORGANIZATION_REF,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    },
    {
      // A lightweight "Place" entity for this neighborhood, referencing the Organization
      // that serves it. This creates the "business ← serves → place" graph edge.
      "@type": "Place",
      "@id": `${pageUrl}#place`,
      name: loc.name,
      containedInPlace: {
        "@type": "City",
        name: "Bangalore",
        containedInPlace: { "@type": "AdministrativeArea", name: "Karnataka" },
      },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#services`,
      name: `Services available near ${loc.name}`,
      numberOfItems: LOCATION_SERVICE_CARDS.length,
      itemListElement: LOCATION_SERVICE_CARDS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/services/${s.slug}`,
        name: s.title,
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
              <Link href="/near-me" className="hover:text-green transition-colors">Near Me</Link>
              <span>/</span>
              <span className="text-green font-medium">{loc.name}</span>
            </nav>
          </div>
        </div>

        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-[#7A9A7D]" />
                Serving {loc.name}
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Mental Health, Neurodevelopment & Physiotherapy near {loc.name}
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium mb-4">
                {loc.intro}
              </p>
              <p className="text-sm text-[#7A9A7D] font-bold uppercase tracking-widest">
                {loc.proximity}
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-8 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Services available for {loc.name} residents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {LOCATION_SERVICE_CARDS.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group block p-6 bg-[#FAF9F5] rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold text-black mb-2 group-hover:text-[#7A9A7D] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-black/60">{s.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9A7D] uppercase tracking-widest">
                      Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm text-[#7A9A7D] font-semibold underline underline-offset-4 decoration-2 decoration-[#7A9A7D]/30 hover:decoration-[#7A9A7D] transition-colors"
                >
                  See all services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions supported — closes near-me ↔ condition entity graph */}
        <section className="py-8 lg:py-10 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Conditions we support for {loc.name} families
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {CONDITION_PIVOTS.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/conditions/${c.slug}`}
                    className="px-4 py-2 rounded-full bg-white border border-black/5 text-sm font-semibold text-black/70 hover:bg-[#7A9A7D] hover:text-white hover:border-[#7A9A7D] transition-all"
                  >
                    {c.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Directions + Contact */}
        <section className="py-8 lg:py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] p-8 lg:p-10">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                How to reach us from {loc.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-bold text-[#7A9A7D] text-[10px] uppercase tracking-widest mb-2">Address</div>
                  <p className="text-black/70 font-medium leading-relaxed">
                    Aadeshwar Chambers,<br />
                    Kasavanahalli, Off Sarjapur Road,<br />
                    Bengaluru 560035, Karnataka
                  </p>
                  <a
                    href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-[#7A9A7D] font-semibold underline underline-offset-4 decoration-2 decoration-[#7A9A7D]/30"
                  >
                    Get directions <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <div className="font-bold text-[#7A9A7D] text-[10px] uppercase tracking-widest mb-2">Hours &amp; Contact</div>
                  <p className="text-black/70 font-medium leading-relaxed mb-3">
                    Monday – Saturday<br />
                    9:00 AM – 6:00 PM
                  </p>
                  <a
                    href="tel:+919901666139"
                    className="inline-flex items-center gap-2 text-sm text-[#7A9A7D] font-semibold"
                  >
                    <Phone className="w-4 h-4" /> +91 99016 66139
                  </a>
                </div>
              </div>
              {loc.nearby.length > 0 && (
                <div className="mt-8 pt-6 border-t border-black/5">
                  <div className="font-bold text-black/40 text-[10px] uppercase tracking-widest mb-3">
                    Also serving nearby
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {loc.nearby.map((n) => (
                      <Link
                        key={n}
                        href={`/near-me/${n.toLowerCase().replace(/\s+/g, "-")}`}
                        className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-black/5 text-[11px] font-semibold text-black/70 hover:bg-[#7A9A7D]/10 hover:border-[#7A9A7D]/30 transition-colors"
                      >
                        {n}
                      </Link>
                    ))}
                  </div>
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
