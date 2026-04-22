import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_SERVICE_QUERY, ALL_SERVICE_SLUGS_QUERY, RELATED_SERVICES_QUERY } from "@/sanity/lib/queries";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { ServiceExperts } from "@/components/services/service-experts";
import { ServiceFAQ } from "@/components/services/service-faq";
import { Clock } from "lucide-react";
import type { Specialist } from "@/sanity/types";
import { ORGANIZATION_REF, SITE_URL, MEDICAL_CONTENT_REVIEW_BLOCK } from "@/lib/seo";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { HOWTO_ARTICLES, SERVICE_TO_HOWTO } from "@/lib/howto";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { portableTextComponents } from "@/components/portable-text-components";
import { getServiceBySlug } from "@/lib/services-data";
import { AudienceTabs } from "@/components/services/audience-tabs";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

interface ServiceData {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  image?: {
    asset?: { url: string };
    alt?: string;
  };
  overview?: string;
  benefits?: string[];
  whatToExpect?: string[];
  whoIsItForTitle?: string;
  whoIsItFor?: string[];
  body?: PortableTextBlock[];
  duration?: string;
  format?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  faqs?: { question: string; answer: string }[];
  audienceSections?: {
    audienceType: "children" | "teens" | "adults";
    title?: string;
    overview?: string;
    whoIsItFor?: string[];
    benefits?: string[];
    expectations?: string[];
  }[];
  ctaOverride?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  onDemand?: boolean;
  specialists?: Specialist[];
  additionalSections?: { title: string; items: string[]; color: string }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: ALL_SERVICE_SLUGS_QUERY,
    tags: ["services"],
  }) as { data: { slug: string }[] | null };

  return (slugs || []).map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  }) as { data: ServiceData | null };

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const serviceUrl = `https://divitmindspace.com/services/${service.slug.current}`;
  const title = service.seo?.metaTitle || service.title;
  const description = service.seo?.metaDescription || service.description;
  const ogImage = service.image?.asset?.url || "https://divitmindspace.com/divit-mindspace-logo.png";
  const ogAlt = service.image?.alt || `${service.title} at Divit MindSpace`;

  return {
    title: `${title} | Divit MindSpace`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: serviceUrl,
      siteName: "Divit MindSpace",
      images: [{ url: ogImage, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
    },
    alternates: {
      canonical: serviceUrl,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  }) as { data: ServiceData | null };

  if (!service) {
    notFound();
  }

  // Merge with static data
  const staticService = getServiceBySlug(slug);
  if (staticService) {
    const staticContent = staticService.content as { faqs?: { question: string; answer: string }[]; duration?: string; format?: string };
    if (!service.faqs || service.faqs.length === 0) {
      if (staticContent.faqs) {
        service.faqs = staticContent.faqs;
      }
    }
    if (!service.duration) service.duration = staticContent.duration;
    if (!service.format) service.format = staticContent.format;
  }

  const { data: relatedData } = (await sanityFetch({
    query: RELATED_SERVICES_QUERY,
    params: { category: service.category, currentSlug: service.slug.current },
    tags: ["services"],
  })) as { data: { _id: string; title: string; slug: string; description: string; category: string }[] | null };
  const related = relatedData ?? [];

  const addressedConditions = CONDITION_PIVOTS.filter((c) =>
    c.serviceSlugs.includes(service.slug.current),
  );

  const howtoSlug = SERVICE_TO_HOWTO[service.slug.current];
  const howtoArticle = howtoSlug
    ? HOWTO_ARTICLES.find((a) => a.slug === howtoSlug)
    : undefined;

  const serviceUrl = `${SITE_URL}/services/${service.slug.current}`;

  const serviceTypeByCategory: Record<string, string> = {
    assessments: "MedicalProcedure",
    therapy: "MedicalTherapy",
    physiotherapy: "MedicalTherapy",
    guidance: "Service",
    programs: "EducationalOccupationalProgram",
  };
  const schemaType = serviceTypeByCategory[service.category] || "MedicalService";
  
  const hasAudienceSections = service.audienceSections && service.audienceSections.length > 0;

  // Logic to preserve Children/Teen distinction if data is only in legacy fields
  const displaySections = [...(service.audienceSections || [])];
  const hasChildrenSection = displaySections.some(s => s.audienceType === 'children');
  
  if (hasAudienceSections && !hasChildrenSection && (service.benefits?.length || service.whoIsItFor?.length)) {
    displaySections.unshift({
      audienceType: 'children',
      title: 'For Children & Teens',
      overview: '',
      benefits: service.benefits,
      expectations: service.whatToExpect,
      whoIsItFor: service.whoIsItFor
    });
  }

  const categoryLabels: Record<string, string> = {
    assessments: "Assessment",
    therapy: "Therapy",
    guidance: "Counselling",
    programs: "Program",
    physiotherapy: "Physiotherapy",
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cream/50 border-b border-green/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-green/60">
            <Link href="/" className="hover:text-green transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-green transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-green font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-0 lg:pt-10 lg:pb-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {service.category && (
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-purple" />
                {categoryLabels[service.category] || service.category}
              </div>
            )}

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-green mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-black/70 mb-4 max-w-3xl font-medium">
              {service.description}
            </p>

            {service.duration && (
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-green/60 uppercase tracking-widest bg-green/5 px-3 py-1.5 rounded-lg border border-green/5">
                  <Clock className="w-4 h-4 text-green" />
                  {service.duration}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-4 pb-6 lg:pt-6 lg:pb-8 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Global Overview */}
            {service.overview && (
              <div className="mb-12">
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Overview
                </h2>
                <p className="text-black/70 leading-relaxed font-medium">
                  {service.overview}
                </p>
              </div>
            )}

            {/* Main Content Flow: Audience Sections (Tabs) or Legacy Content */}
            {hasAudienceSections ? (
              <AudienceTabs sections={displaySections} />
            ) : (
              <>
                {service.benefits && service.benefits.length > 0 && (
                  <div className="mb-8 bg-white rounded-2xl p-6 lg:p-8 border border-green/10 shadow-sm">
                    <h2
                      className="text-2xl lg:text-3xl font-serif text-green mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                    >
                      What You&apos;ll Gain
                    </h2>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-black/70 font-medium leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.whatToExpect && service.whatToExpect.length > 0 && (
                  <div className="mb-8 bg-white rounded-2xl p-6 lg:p-8 border border-green/10 shadow-sm">
                    <h2
                      className="text-2xl lg:text-3xl font-serif text-green mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                    >
                      What to Expect
                    </h2>
                    <div className="space-y-4">
                      {service.whatToExpect.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D] flex-shrink-0 mt-[10px]" />
                          <p className="text-black/70 font-medium leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.whoIsItFor && service.whoIsItFor.length > 0 && (
                  <div className="mb-8 bg-white rounded-2xl p-6 lg:p-8 border border-green/10 shadow-sm">
                    <h2
                      className="text-2xl lg:text-3xl font-serif text-green mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                    >
                      {service.whoIsItForTitle || "Is This Right for You or Your Loved Ones?"}
                    </h2>
                    <ul className="space-y-4">
                      {service.whoIsItFor.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-black/70 font-medium leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Additional Sections - Dynamic blocks */}
            {service.additionalSections?.map((section, idx) => (
              <div
                key={idx}
                className="mb-8 bg-white rounded-2xl p-6 lg:p-8 border border-green/10 shadow-sm"
              >
                <h2
                  className="text-2xl lg:text-3xl font-serif text-green mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-4">
                      <div 
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[10px]" 
                        style={{ backgroundColor: section.color || '#7A9A7D' }}
                      />
                      <span className="text-black/70 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Additional Rich Text Content */}
            {service.body && service.body.length > 0 && (
              <div className="mt-12 prose prose-green max-w-none prose-p:text-black/70 prose-p:font-medium prose-headings:font-serif prose-headings:text-green prose-li:text-black/70 prose-li:font-medium prose-strong:text-black prose-strong:font-bold">
                <PortableText 
                  value={service.body} 
                  components={portableTextComponents} 
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Experts Section */}
      <ServiceExperts 
        specialists={service.specialists || []} 
        onDemand={service.onDemand} 
      />

      {/* Dynamic FAQ Section */}
      <ServiceFAQ faqs={service.faqs || []} />

      {/* Preparation guide */}
      {howtoArticle && (
        <section className="py-6 lg:py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                href={`/howto/${howtoArticle.slug}`}
                className="group flex items-center justify-between gap-4 p-6 rounded-2xl bg-[#FAF9F5] border border-green/10 hover:border-green/30 hover:shadow-lg transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-green/60 text-[10px] uppercase tracking-widest mb-2">
                    Preparation Guide
                  </div>
                  <div className="font-semibold text-green group-hover:text-green/80 transition-colors mb-1">
                    {howtoArticle.title}
                  </div>
                  <p className="text-sm text-black/60 line-clamp-2">{howtoArticle.lead}</p>
                </div>
                <span className="text-green text-sm font-semibold whitespace-nowrap">
                  Read guide →
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Conditions this service addresses */}
      {addressedConditions.length > 0 && (
        <section className="py-8 lg:py-10 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Conditions This Helps With
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {addressedConditions.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/conditions/${c.slug}`}
                    className="px-4 py-2 rounded-full bg-white border border-green/10 text-sm font-semibold text-green hover:bg-green hover:text-white transition-all"
                  >
                    {c.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Available near */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl lg:text-3xl font-serif text-green mb-6 text-center"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Available for families near
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {LOCATION_PIVOTS.map((l) => (
                <Link
                  key={l.slug}
                  href={`/near-me/${l.slug}`}
                  className="px-4 py-2 rounded-full bg-[#FAF9F5] border border-black/5 text-sm font-semibold text-black/70 hover:bg-green hover:text-white hover:border-green transition-all"
                >
                  {l.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-8 lg:py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-6 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Related {categoryLabels[service.category] || "Services"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r._id}
                    href={`/services/${r.slug}`}
                    className="block p-5 bg-white rounded-2xl border border-green/10 hover:border-green/30 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-green group-hover:text-green/80 transition-colors mb-1">
                          {r.title}
                        </h3>
                        <p className="text-sm text-black/60 line-clamp-2">{r.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="pt-6 pb-8 lg:pt-8 lg:pb-10 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 lg:p-10 border border-green/10 shadow-sm">
            <h2
              className="text-2xl lg:text-3xl font-serif text-green mb-4"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {service.ctaOverride?.title || "Take the Next Step Toward Your Wellbeing"}
            </h2>
            <p className="text-green/70 mb-6 font-medium">
              {service.ctaOverride?.description || 
                `Book a free consultation to explore how ${service.title} can help you achieve your clinical goals.`}
            </p>
            <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green text-white font-semibold hover:bg-green/90 transition-colors">
              Chat with Us
            </WhatsAppConsultationLink>
          </div>
        </div>
      </section>
    </div>
  );
}
