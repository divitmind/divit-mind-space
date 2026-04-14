// Site Settings Types from Sanity

export interface SocialLink {
  platform: string;
  url: string;
  icon: string | null;
}

export interface ContactInfo {
  phone: string;
  phoneLink: string;
  whatsapp: string;
  email: string;
  address: string;
  addressShort: string;
  mapLink: string;
  workingHours: string;
}

export interface TrustMetrics {
  familiesCount: string;
  therapistsCount: string;
  servicesCount: string;
  googleRating: string;
  googleReviewsUrl: string;
}

export interface FooterContent {
  tagline: string;
  description: string;
}

export interface QuickLink {
  label: string;
  href: string;
}

export interface NavigationSettings {
  quickLinks: QuickLink[];
  headerCtaText: string;
  headerCtaMobileText: string;
  headerCtaLink: string;
  joinTeamText: string;
}

export interface HomepageSettings {
  heroDescription: string;
  rollingAudiences: string[];
  rollingSchools: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: FAQ[];
}

export interface ServicesPageSettings {
  allServicesDescription: string;
  assessmentsDescription: string;
  therapyDescription: string;
  guidanceDescription: string;
  programsDescription: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactPageSettings {
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
  faqTitle: string;
  faqs: FAQ[];
}

export interface SiteSettings {
  contact: ContactInfo;
  socialLinks: SocialLink[];
  metrics: TrustMetrics;
  footer: FooterContent;
  navigation: NavigationSettings;
  homepage: HomepageSettings;
  servicesPage: ServicesPageSettings;
  contactPage: ContactPageSettings;
}
