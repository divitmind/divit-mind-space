import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_SERVICE_QUERY, ALL_SERVICE_SLUGS_QUERY, RELATED_SERVICES_QUERY } from "@/sanity/lib/queries";
import { ServiceExperts } from "@/components/services/service-experts";
import { ServiceFAQ } from "@/components/services/service-faq";
import { CheckCircle2, Sparkles } from "lucide-react";
import type { Specialist } from "@/sanity/types";
import { CONDITION_PIVOTS, LOCATION_PIVOTS } from "@/lib/seo-pivots";
import { HOWTO_ARTICLES, SERVICE_TO_HOWTO } from "@/lib/howto";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { portableTextComponents } from "@/components/portable-text-components";
import { getServiceBySlug, type ServiceData as StaticServiceData } from "@/lib/services-data";
import { AudienceTabs } from "@/components/services/audience-tabs";
import { InlineCtaBlock } from "@/components/inline-cta-block";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

interface ServiceData {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  demographics?: string[];
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
    audienceType: "children" | "teens" | "adults" | "geriatrics";
    title: string;
    shortDescription?: string;
    overview?: string;
    whoIsItForIntro?: string;
    whoIsItFor?: string[];
    benefits?: string[];
    expectationsIntro?: string;
    expectations?: string[];
    supportedItemsTitle?: string;
    supportedItemsIntro?: string;
    supportedItems?: (string | { heading?: string; items: string[] })[];
    approachItems?: string[];
    whyChooseItems?: string[];
    additionalSections?: { title: string; intro?: string; items: string[]; color?: string }[];
  }[];
  ctaOverride?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
  onDemand?: boolean;
  specialists?: Specialist[];
  approachItems?: string[];
  whyChooseItems?: string[];
  additionalSections?: { title: string; items: string[]; color?: string }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: ALL_SERVICE_SLUGS_QUERY,
    tags: ["services"],
  }) as { data: { slug: string }[] | null };

  const sanitySlugs = (slugs || []).map((item) => item.slug);
  
  // We need to get all static slugs. Since we don't have a direct export of the array,
  // we can use the REQUIRE approach but let's make it more robust if possible.
  // Actually, let's just add "physiotherapy-services" manually if we have to, 
  // or better, export the services array from services-data.ts.
  
  // Let's try to see if we can just import it.
  const allSlugs = new Set([...sanitySlugs]);
  
  // Group Therapy is our primary static one for now
  allSlugs.add("group-therapy-sessions");

  return Array.from(allSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  }) as { data: ServiceData | null };

  const staticService = getServiceBySlug(slug);

  if (!service && !staticService) {
    return {
      title: "Service Not Found",
    };
  }

  // Create a minimal service object if Sanity data is missing
  if (!service && staticService) {
    service = {
      _id: `static-${slug}`,
      title: staticService.title,
      slug: { current: slug },
      description: staticService.description,
      category: staticService.category,
      overview: staticService.content.overview,
    };
  }

  if (!service) return { title: "Service Not Found" };

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

  let { data: service } = await sanityFetch({
    query: SINGLE_SERVICE_QUERY,
    params: { slug },
    tags: ["services"],
  }) as { data: ServiceData | null };

  const staticService = getServiceBySlug(slug);

  if (!service && !staticService) {
    notFound();
  }

  // Create a minimal service object if Sanity data is missing
  if (!service && staticService) {
    service = {
      _id: `static-${slug}`,
      title: staticService.title,
      slug: { current: slug },
      description: staticService.description,
      category: staticService.category,
      overview: staticService.content.overview,
    } as ServiceData;
  }

  if (!service) notFound();

  // Merge with static data
  if (staticService) {
    const staticContent = staticService.content as StaticServiceData["content"];

    // SPECIAL CASE: For Group Therapy, Psychoeducational Assessments, CBT, Counselling & Behavioral Therapy, prioritize static data for audience tabs and layout
    if (slug === "group-therapy-sessions" || slug === "psychoeducational-assessments" || slug === "cbt-cognitive-behavioral-therapy" || slug === "cognitive-behavioral-therapy-cbt" || slug === "counselling" || slug === "behavioral-therapy" || slug === "cognitive-therapy") {
      service.description = staticService.description;
      service.overview = staticContent.overview;
      service.audienceSections = staticContent.audienceSections;
      service.benefits = staticContent.benefits;
      service.whatToExpect = staticContent.whatToExpect;
      service.approachItems = staticContent.approachItems;
      service.whyChooseItems = staticContent.whyChooseItems;
      service.additionalSections = staticContent.additionalSections;
      service.faqs = staticContent.faqs || service.faqs;
    } else {
      // Fallback logic for other services: prefer Sanity, but use static data if Sanity is empty
      if (!service.description) service.description = staticService.description;
      if (!service.overview) service.overview = staticContent.overview;
      if (!service.benefits || service.benefits.length === 0) service.benefits = staticContent.benefits;
      if (!service.whatToExpect || service.whatToExpect.length === 0) service.whatToExpect = staticContent.whatToExpect;
      if (!service.whoIsItFor || service.whoIsItFor.length === 0) service.whoIsItFor = staticContent.whoIsItFor;
      if (!service.audienceSections || service.audienceSections.length === 0) {
        service.audienceSections = staticContent.audienceSections;
      }
      if (!service.duration) service.duration = staticContent.duration;
      if (!service.format) service.format = staticContent.format;
      if (!service.additionalSections || service.additionalSections.length === 0) {
        service.additionalSections = staticContent.additionalSections;
      }
      if (!service.faqs || service.faqs.length === 0) {
        if (staticContent.faqs) service.faqs = staticContent.faqs;
      }
    }
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

  const categoryLabels: Record<string, string> = {
    assessments: "Assessments Hub",
    therapy: "Therapy",
    guidance: "Counselling",
    programs: "Program",
    physiotherapy: "Physiotherapy",
  };

  const hasAudienceSections = service.audienceSections && service.audienceSections.length > 0;
  const hasUniversalContent = (service.benefits?.length || service.whatToExpect?.length || service.whoIsItFor?.length);

  // Extract approach and why choose from first audience section if not at top level (for Sanity compatibility)
  const approachItems = service.approachItems || service.audienceSections?.[0]?.approachItems;
  const whyChooseItems = service.whyChooseItems || service.audienceSections?.[0]?.whyChooseItems;

  let demographics = service.demographics && service.demographics.length > 0 
    ? service.demographics 
    : ["Children", "Adolescents", "Adults"];

  // FORCE REMOVAL OF TEENS for Group Therapy Sessions
  if (slug === "group-therapy-sessions") {
    if (service.audienceSections) {
      service.audienceSections = service.audienceSections.filter(s => s.audienceType !== "teens");
    }
    demographics = demographics.filter(d => !d.toLowerCase().includes("teen") && !d.toLowerCase().includes("adolescent"));
  }

  // Helper to render text with markdown-style bold (**text**)
  const renderTextWithBold = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Breadcrumb - Absolute Tightness */}
      <div className="bg-cream/50 border-b border-green/10">
        <div className="container mx-auto px-4 py-0.5 lg:py-1">
          <nav className="flex items-center gap-2 text-[9px] lg:text-[10px] text-green/60 uppercase tracking-[0.2em] font-bold">
            <Link href="/" className="hover:text-green transition-colors">
              Home
            </Link>
            <span className="text-green/20">/</span>
            <Link href="/services" className="hover:text-green transition-colors">
              Services
            </Link>
            <span className="text-green/20">/</span>
            <span className="text-green">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Zero Top Padding */}
      <section className="pt-0 pb-0 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-2">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-green mt-1 lg:mt-2 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                {service.title}
              </h1>
              
              {/* Smart Tagging: Hide badge if we have multiple audience tabs below */}
              {(service.audienceSections?.length || 0) <= 1 && (
                <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
                  <div className="px-4 py-2 lg:px-6 lg:py-2.5 bg-gradient-to-r from-green/[0.04] to-green/[0.01] border border-green/10 rounded-full flex items-center gap-4 group hover:bg-green/[0.08] hover:border-green/20 transition-all duration-500 cursor-default shadow-sm shadow-green/5">
                    <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.25em] text-green/80 whitespace-nowrap flex items-center gap-2">
                      <span className="text-green/50 font-serif italic tracking-normal normal-case text-[13px] lg:text-[14px] mr-1.5 border-r border-green/10 pr-3 py-0.5">Helping</span>
                      <div className="flex items-center gap-2.5">
                        {demographics.map((d, i) => (
                          <div key={d} className="flex items-center gap-2.5">
                            <span className="text-black/70 group-hover:text-green transition-colors duration-300">{d}</span>
                            {i !== demographics.length - 1 && (
                              <div className="w-1 h-1 rounded-full bg-green/20 shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Near Zero Gap */}
      <section className="pt-0 pb-0 lg:pt-0 lg:pb-0 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Global Overview Section (Shown for multi-audience services) */}
            {hasAudienceSections && service.audienceSections!.length > 1 && service.overview && (
              <div className="mb-0 lg:mb-2 pt-0 lg:pt-0">
                {/* Duo-Grid Style Consistency - Side-by-Side Grid with 6:6 Ratio for balanced visual weight */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 mb-10 lg:mb-12 items-stretch">
                  {/* Primary Outcome (Green Box) */}
                  <div className="lg:col-span-6 bg-green p-6 lg:p-12 rounded-[2.5rem] text-white shadow-xl shadow-green/10 relative overflow-hidden group flex flex-col h-full">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"> 
                      <Sparkles className="w-48 h-48 text-white" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="lg:-mt-6 mb-6">
                        <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">Primary Outcome</p>
                      </div>
                      <p className="text-2xl lg:text-3xl font-serif italic leading-[1.4] font-bold text-white">
                        {renderTextWithBold(service.description)}
                      </p>
                    </div>
                  </div>

                  {/* Overview (White Box) */}
                  <div className="lg:col-span-6 bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 lg:p-12 relative overflow-hidden flex flex-col h-full">
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="lg:-mt-6 mb-6">
                        <h3 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-green/60">Overview</h3>
                      </div>
                      <p className="text-black/70 text-base lg:text-lg leading-relaxed font-medium italic whitespace-pre-wrap flex-1">
                        {renderTextWithBold(service.overview)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Flow: Audience-Specific Tabs */}
            <div className="mb-12 lg:mb-16">
              <AudienceTabs 
                sections={service.audienceSections || []} 
                globalOverview={service.overview}
                isMultiAudience={hasAudienceSections && service.audienceSections!.length > 1}
                universalBenefits={service.benefits}
                universalExpectations={service.whatToExpect}
                globalApproachItems={approachItems}
                globalWhyChooseItems={whyChooseItems}
                globalAdditionalSections={service.additionalSections}
              />
            </div>

            {/* Universal Content (Non-tabbed or fallback) */}
            {hasUniversalContent && !hasAudienceSections && (
              <div className="bg-white rounded-2xl p-6 lg:p-10 border border-green/10 shadow-sm mb-10 lg:mb-12">
                {/* Expert Summary with Primary Outcome */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                  <div className="flex-1">
                    <p className="text-black/70 text-sm lg:text-base leading-[1.6] font-medium max-w-2xl whitespace-pre-wrap">
                      Select specific details for your audience below or review our universal program highlights.
                    </p>
                  </div>

                  <div className="w-full lg:w-72 shrink-0">
                    {service.description && (
                      <div className="bg-green p-6 lg:p-8 rounded-xl text-white shadow-lg shadow-green/5 relative overflow-hidden group">
                        <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform duration-500"> 
                          <CheckCircle2 className="w-20 h-20" />
                        </div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3 opacity-70">Primary Outcome</p>
                        <p className="text-lg font-serif italic leading-snug font-bold relative z-10">
                          {renderTextWithBold(service.description)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Benefits Grid */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <h3 className="font-serif text-xl lg:text-2xl text-green">Universal Benefits</h3>
                      <div className="flex-1 h-px bg-green/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="h-full p-5 lg:p-6 rounded-xl bg-white border border-green/5 shadow-sm hover:shadow-md hover:border-green/20 transition-all group flex flex-col items-start text-left">
                          <div className="w-9 h-9 rounded-full bg-green/5 flex items-center justify-center mb-4 group-hover:bg-green group-hover:text-white transition-all duration-300">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <p className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process & Profile Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-green/10 items-stretch">
                  {service.whatToExpect && service.whatToExpect.length > 0 && (
                    <div className="bg-white px-6 pb-6 pt-1 lg:px-8 lg:pb-8 lg:pt-2 rounded-2xl border border-green/10 flex flex-col">   
                      <h3 className="font-serif text-xl text-green mb-6 flex items-center gap-3">
                        <div className="w-1 h-5 bg-green/20 rounded-full" />
                        What to Expect
                      </h3>
                      <div className="space-y-4 flex-1">
                        {service.whatToExpect.map((item, i) => (
                          <div key={i} className="flex gap-3 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                            <p className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.whoIsItFor && service.whoIsItFor.length > 0 && (
                    <div className="bg-green/5 px-6 pb-6 pt-1 lg:px-8 lg:pb-8 lg:pt-2 rounded-2xl border border-green/10 flex flex-col"> 
                      <h3 className="font-serif text-xl text-green mb-6">Is This Right for You?</h3>
                      <div className="space-y-3 flex-1">
                        {service.whoIsItFor.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">   
                              <svg className="w-2.5 h-2.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm lg:text-base text-black/70 font-medium leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rich Text Body */}
            {service.body && service.body.length > 0 && (
              <div className="mt-10 lg:mt-12 prose prose-green max-w-none prose-p:text-black/70 prose-p:font-medium prose-headings:font-serif prose-headings:text-green prose-li:text-black/70 prose-li:font-medium prose-strong:text-black prose-strong:font-bold">
                <PortableText
                  value={service.body}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specialist Oversight */}
      <ServiceExperts
        specialists={service.specialists || []}
        onDemand={service.onDemand}
      />

      {/* FAQ Section */}
      <ServiceFAQ faqs={service.faqs || []} />

      {/* Preparation Guide */}
      {howtoArticle && (
        <section className="py-5 lg:py-7 bg-white border-y border-green/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                href={`/howto/${howtoArticle.slug}`}
                className="group flex items-center justify-between gap-4 p-5 lg:p-6 rounded-2xl bg-[#FAF9F5] border border-green/10 hover:border-green/30 hover:shadow-lg transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-green/60 text-[10px] uppercase tracking-widest mb-1.5">
                    Preparation Guide
                  </div>
                  <div className="text-lg font-serif text-green group-hover:text-green/80 transition-colors mb-1">
                    {howtoArticle.title}
                  </div>
                  <p className="text-sm text-black/60 line-clamp-2">{howtoArticle.lead}</p>
                </div>
                <span className="text-green text-sm font-bold whitespace-nowrap">
                  Read guide →
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Conditions */}
      {addressedConditions.length > 0 && (
        <section className="py-6 lg:py-8 bg-[#FAF9F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-5 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Conditions This Helps With
              </h2>
              <div className="flex flex-wrap justify-center gap-2.5">
                {addressedConditions.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/conditions/${c.slug}`}
                    className="px-4 py-1.5 rounded-full bg-white border border-green/10 text-sm font-semibold text-green hover:bg-green hover:text-white transition-all shadow-sm"
                  >
                    {c.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Location PIVOTS */}
      <section className="py-6 lg:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl lg:text-3xl font-serif text-green mb-5 text-center"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Available for families near
            </h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {LOCATION_PIVOTS.map((l) => (
                <Link
                  key={l.slug}
                  href={`/near-me/${l.slug}`}
                  className="px-4 py-1.5 rounded-full bg-[#FAF9F5] border border-black/5 text-sm font-semibold text-black/70 hover:bg-green hover:text-white hover:border-green transition-all shadow-sm"
                >
                  {l.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="pt-6 pb-0 lg:pt-8 lg:pb-0 bg-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-2xl lg:text-3xl font-serif text-green mb-5 text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Related {categoryLabels[service.category] || "Services"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r._id}
                    href={`/services/${r.slug}`}
                    className="block p-5 bg-white rounded-2xl border border-green/10 hover:border-green/30 hover:shadow-md transition-all group"
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
      <section className="pt-2 pb-2 lg:pt-4 lg:pb-4 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <InlineCtaBlock
            heading={service.ctaOverride?.title || "Not ready to book?"}
            subtext={service.ctaOverride?.description || "Message us on WhatsApp. Ask us anything, we're here to help."}
          />
        </div>
      </section>
    </div>
  );
}
