import { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-page";
import { FaqSection } from "@/components/homepage/faq-section";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CAREERS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { CareersQueryResult, CareerListItem } from "@/sanity/types";
import type { SiteSettings, FAQ } from "@/lib/types";

// Force dynamic rendering - always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | Divit MindSpace - Therapy & Mental Health Jobs Bangalore",
  description:
    "Join Divit MindSpace in Bangalore. We're hiring Speech Therapists, Occupational Therapists, Psychologists, Special Educators, and Physiotherapists at our center off Sarjapur Road, Kasavanahalli. Work with neurodivergent children and families in HSR Layout, Bellandur area.",
  keywords: [
    "speech therapist jobs Bangalore",
    "occupational therapist jobs Sarjapur Road",
    "psychologist careers Bangalore",
    "special educator jobs Bangalore",
    "physiotherapist jobs Kasavanahalli",
    "mental health jobs Bangalore",
    "therapy jobs HSR Layout",
    "child development center careers Bangalore",
    "neurodevelopment jobs Bangalore",
    "ABA therapist jobs Bangalore",
    "clinical psychologist jobs Sarjapur Road",
    "pediatric therapist jobs Bangalore",
    "Divit MindSpace careers",
    "therapy center jobs Bellandur",
  ],
  alternates: {
    canonical: "https://divitmindspace.com/careers",
  },
  openGraph: {
    title: "Careers at Divit MindSpace | Therapy & Mental Health Jobs Bangalore",
    description:
      "Join our team off Sarjapur Road, Bangalore. Hiring Speech Therapists, OTs, Psychologists, Special Educators. Make a difference in neurodivergent care.",
    type: "website",
    url: "https://divitmindspace.com/careers",
    images: [
      {
        url: "/divit-mindspace-logo.png",
        width: 1200,
        height: 630,
        alt: "Careers at Divit MindSpace Bangalore",
      },
    ],
    siteName: "Divit MindSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Divit MindSpace | Jobs in Bangalore",
    description:
      "Hiring therapists, psychologists, and educators at our center off Sarjapur Road, Kasavanahalli. Join us in supporting neurodivergent families.",
    images: ["/divit-mindspace-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Organization data for JobPosting schema
const hiringOrganization = {
  "@type": "Organization",
  name: "Divit MindSpace",
  sameAs: "https://divitmindspace.com",
  logo: {
    "@type": "ImageObject",
    url: "https://divitmindspace.com/divit-mindspace-logo.png",
  },
};

// Job location for all positions
const jobLocation = {
  "@type": "Place",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kasavanahalli, Off Sarjapur Road",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560035",
    addressCountry: "IN",
  },
};

// Map employment types to Schema.org format
function getEmploymentType(type: string): string {
  const typeMap: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    "contract": "CONTRACTOR",
    "internship": "INTERN",
    "temporary": "TEMPORARY",
  };
  return typeMap[type.toLowerCase()] || "FULL_TIME";
}

// Calculate validThrough (90 days from posted date)
function getValidThrough(postedDate?: string): string {
  const posted = postedDate ? new Date(postedDate) : new Date();
  const validThrough = new Date(posted);
  validThrough.setDate(validThrough.getDate() + 90);
  return validThrough.toISOString().split("T")[0];
}

// Generate JobPosting schema for each job
function generateJobPostingSchema(job: CareerListItem) {
  const datePosted = job.postedDate || new Date().toISOString().split("T")[0];
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.title} position at Divit MindSpace, Bangalore's leading center for mental health, neurodevelopment, and physiotherapy. Join our ${job.department} team at our center off Sarjapur Road, Kasavanahalli.`,
    datePosted,
    validThrough: getValidThrough(job.postedDate),
    employmentType: getEmploymentType(job.employmentType),
    hiringOrganization,
    jobLocation,
    ...(job.locationType === "remote" || job.locationType === "hybrid" ? { jobLocationType: "TELECOMMUTE" } : {}),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    directApply: true,
    url: `https://divitmindspace.com/careers/${job.slug.current}`,
    industry: "Healthcare, Mental Health, Child Development",
    occupationalCategory: job.department,
    ...(job.salaryRange && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryRange.min,
          maxValue: job.salaryRange.max,
          unitText: "YEAR",
        },
      },
    }),
  };
}

// Default FAQs for fallback when Sanity data isn't available
const defaultCareersFaqs: FAQ[] = [
  {
    question: "What qualifications do I need to work at Divit MindSpace?",
    answer: "We hire licensed professionals including clinical psychologists (RCI registered), speech-language pathologists, occupational therapists, special educators with relevant certifications, and physiotherapists. For training programs and shadow teacher roles, we provide comprehensive in-house training.",
  },
  {
    question: "Does Divit MindSpace offer internships for psychology and therapy students?",
    answer: "Yes, we offer internship opportunities for students pursuing degrees in clinical psychology, speech therapy, occupational therapy, and special education. Our Bangalore center provides hands-on experience with neurodevelopmental assessments and evidence-based interventions under expert supervision.",
  },
  {
    question: "What is the work culture like at Divit MindSpace?",
    answer: "We foster a collaborative, neuro-affirming environment where team members learn from each other. Regular case conferences, professional development workshops, and a supportive leadership ensure continuous growth. Our team treats every family like our own.",
  },
];

// Generate FAQ Schema JSON-LD dynamically
function generateFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb schema
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://divitmindspace.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Careers",
      item: "https://divitmindspace.com/careers",
    },
  ],
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function CareersRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  const [{ data: jobs }, { data: siteSettings }] = await Promise.all([
    sanityFetch({
      query: ALL_CAREERS_QUERY,
      tags: ["career"],
    }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY }),
  ]);

  const jobsList = (jobs as CareersQueryResult) || [];

  // Generate JobPosting schema for each active job
  const jobPostingSchemas = jobsList.map(generateJobPostingSchema);

  // Get FAQ data from Sanity with fallback
  const careersFaqs = siteSettings?.careersPage?.faqs?.length ? siteSettings.careersPage.faqs : defaultCareersFaqs;

  // Generate FAQ Schema dynamically
  const faqJsonLd = generateFaqSchema(careersFaqs);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* FAQ Schema for LLM visibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Individual JobPosting Schema for each job - critical for Google Jobs */}
      {jobPostingSchemas.map((schema, index) => (
        <script
          key={`job-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CareersPage jobs={jobsList} initialFilter={params.type} />
      
      <FaqSection 
        faqs={careersFaqs} 
        title="Frequently Asked Questions" 
      />

      {/* Bottom CTA - matching homepage style */}
      <section className="pt-2 lg:pt-6 pb-6 lg:pb-10 bg-[#FDFBF7] px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-black/5 p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 shadow-2xl shadow-black/5">
            <div className="flex flex-row md:flex-row items-center gap-4 md:gap-8">
              {/* WhatsApp Icon Circle */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#7A9A7D] flex items-center justify-center shrink-0 shadow-lg">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-left">
                <h2 className="text-xl md:text-4xl font-bold text-black font-[family-name:var(--font-cormorant)] italic mb-1 md:mb-2">
                  Ready to Join Our Team?
                </h2>
                <p className="text-sm md:text-lg text-black/60 font-medium">
                  Message us on WhatsApp to start a conversation.
                </p>
              </div>
            </div>

            <WhatsAppConsultationLink
              className="dm-pill-button dm-pill-button-primary w-full md:w-auto md:scale-125 whitespace-nowrap"
              message="Hi! I'm interested in career opportunities at Divit MindSpace, Bangalore. I'd like to know more about the open positions at your Sarjapur Road center."
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Apply Now
            </WhatsAppConsultationLink>
          </div>
        </div>
      </section>
    </>
  );
}
