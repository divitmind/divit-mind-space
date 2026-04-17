// Programmatic SEO landing pages: every condition × every location.
// 7 conditions × 6 locations = 42 highly-targeted long-tail URLs like
//   /conditions/adhd/hsr-layout
//   /conditions/pain-management/sarjapur-road
// Each page is data-driven from CONDITION_PIVOTS + LOCATION_PIVOTS — no fabrication.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import {
  ORGANIZATION_REF,
  SITE_URL,
  SITE_LANGUAGE,
  WEBSITE_ID,
  MEDICAL_CONTENT_REVIEW_BLOCK,
} from "@/lib/seo";
import { InlineCtaBlock } from "@/components/inline-cta-block";
import { ArrowRight, MapPin, Phone } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string; location: string }>;
}

export function generateStaticParams() {
  const params: { slug: string; location: string }[] = [];
  for (const c of CONDITION_PIVOTS) {
    for (const l of LOCATION_PIVOTS) {
      params.push({ slug: c.slug, location: l.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, location } = await params;
  const c = CONDITION_PIVOTS.find((x) => x.slug === slug);
  const l = LOCATION_PIVOTS.find((x) => x.slug === location);
  if (!c || !l) return { title: "Not Found" };

  const url = `${SITE_URL}/conditions/${c.slug}/${l.slug}`;
  const title = `${c.name} Support near ${l.name}, Bangalore | Divit MindSpace`;
  const description = `${c.name} assessments, therapy, and care near ${l.name}, Bangalore. ${c.intro}`;

  return {
    title,
    description,
    keywords: [
      `${c.name} ${l.name}`,
      `${c.name} near ${l.name}`,
      ...c.keywords.slice(0, 4),
      ...l.keywords.slice(0, 4),
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: "/divit-mindspace-logo.png", width: 1200, height: 630, alt: title }],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

export default async function ConditionInLocationPage({ params }: PageProps) {
  const { slug, location } = await params;
  const c = CONDITION_PIVOTS.find((x) => x.slug === slug);
  const l = LOCATION_PIVOTS.find((x) => x.slug === location);
  if (!c || !l) notFound();

  const pageUrl = `${SITE_URL}/conditions/${c.slug}/${l.slug}`;

  // Real services relevant to the condition (filtered from Sanity by slug list).
  const servicesQuery = `*[_type == "services" && !(_id in path("drafts.**")) && slug.current in $slugs] {
    _id, title, "slug": slug.current, description, category
  }`;
  const { data: servicesData } = await sanityFetch({
    query: servicesQuery,
    params: { slugs: c.serviceSlugs },
    tags: ["services"],
  });
  const services = ((servicesData as SanityServiceRow[] | null) ?? []).sort(
    (a, b) => c.serviceSlugs.indexOf(a.slug) - c.serviceSlugs.indexOf(b.slug),
  );

  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Conditions", item: `${SITE_URL}/conditions` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/conditions/${c.slug}` },
        { "@type": "ListItem", position: 4, name: `Near ${l.name}`, item: pageUrl },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${c.name} Support near ${l.name}, Bangalore`,
      description: c.intro,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { "@id": WEBSITE_ID },
      about: {
        "@type": "MedicalCondition",
        "@id": `${SITE_URL}/conditions/${c.slug}#condition`,
        name: c.name,
      },
      provider: ORGANIZATION_REF,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      ...MEDICAL_CONTENT_REVIEW_BLOCK,
      spatialCoverage: {
        "@type": "Place",
        name: l.name,
        containedInPlace: {
          "@type": "City",
          name: "Bangalore",
          containedInPlace: { "@type": "AdministrativeArea", name: "Karnataka" },
        },
      },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#services`,
      name: `${c.name} services available near ${l.name}`,
      numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
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
            <nav className="flex flex-wrap items-center gap-2 text-sm text-green/60">
              <Link href="/" className="hover:text-green transition-colors">Home</Link>
              <span>/</span>
              <Link href="/conditions" className="hover:text-green transition-colors">Conditions</Link>
              <span>/</span>
              <Link href={`/conditions/${c.slug}`} className="hover:text-green transition-colors">
                {c.name}
              </Link>
              <span>/</span>
              <span className="text-green font-medium">Near {l.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-6 lg:pt-12 lg:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-[#7A9A7D]" />
                Serving {l.name}
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {c.name} Support near {l.name}
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium mb-3">
                {c.intro}
              </p>
              <p className="text-sm text-[#7A9A7D] font-bold uppercase tracking-widest">
                {l.proximity} · Aadeshwar Chambers, Kasavanahalli
              </p>
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
                  {c.name} services available for {l.name} families
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

        {/* Directions */}
        <section className="py-8 lg:py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] p-8 lg:p-10">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                How to reach us from {l.name}
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
                    10:00 AM – 7:00 PM
                  </p>
                  <a
                    href="tel:+919901666139"
                    className="inline-flex items-center gap-2 text-sm text-[#7A9A7D] font-semibold"
                  >
                    <Phone className="w-4 h-4" /> +91 99016 66139
                  </a>
                </div>
              </div>
              {l.nearby.length > 0 && (
                <div className="mt-8 pt-6 border-t border-black/5">
                  <div className="font-bold text-black/40 text-[10px] uppercase tracking-widest mb-3">
                    Also serving nearby
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {l.nearby.map((n) => (
                      <Link
                        key={n}
                        href={`/conditions/${c.slug}/${n.toLowerCase().replace(/\s+/g, "-")}`}
                        className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-black/5 text-[11px] font-semibold text-black/70 hover:bg-[#7A9A7D]/10 hover:border-[#7A9A7D]/30 transition-colors"
                      >
                        {c.name} near {n}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related landing pages — help crawlers discover siblings */}
        <section className="py-8 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-black mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Explore more
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={`/conditions/${c.slug}`}
                  className="group block p-5 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                >
                  <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors">
                    {c.name} — full overview
                  </div>
                  <p className="text-sm text-black/60 mt-1">
                    Assessments, therapies, specialists, FAQs.
                  </p>
                </Link>
                <Link
                  href={`/near-me/${l.slug}`}
                  className="group block p-5 bg-white rounded-2xl border border-black/5 hover:border-[#7A9A7D]/30 hover:shadow-lg transition-all"
                >
                  <div className="font-semibold text-black group-hover:text-[#7A9A7D] transition-colors">
                    All services near {l.name}
                  </div>
                  <p className="text-sm text-black/60 mt-1">
                    Directions, hours, services, specialists.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-6 pb-12 lg:pt-8 lg:pb-16 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <InlineCtaBlock />
          </div>
        </section>
      </div>
    </>
  );
}
