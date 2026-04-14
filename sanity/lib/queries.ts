// GROQ Queries for Blog Posts
// Following Sanity best practices for query optimization

/**
 * Query to fetch all blog posts for listing pages
 * Optimizations:
 * - Uses indexed _type filter
 * - Filters by contentType for blog posts
 * - Orders by indexed publishedAt field
 * - Minimal projections (only needed fields)
 * - Inline author dereferencing (prevents N+1 queries)
 * - Image URL resolution in projection
 */
export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  featured,
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot,
    crop
  },
  "author": author->{
    name,
    slug,
    "image": image.asset->url
  },
  categories
}`;

/**
 * Query to fetch all news items
 */
export const NEWS_POSTS_QUERY = `*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  postFormat,
  externalUrl,
  sourceName,
  featured,
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot,
    crop
  }
}`;

/**
 * Query to fetch a single blog post by slug
 * Optimizations:
 * - Compound filter on indexed fields (_type and slug.current)
 * - [0] selector for single result
 * - Full author details for author card
 * - Complete body content for PortableText rendering
 */
export const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  contentType,
  excerpt,
  mainImage,
  body,
  publishedAt,
  readTime,
  seo,
  "author": author->{
    name,
    slug,
    title,
    bio,
    "image": image.asset->url,
    social
  },
  categories
}`;

/**
 * Query to fetch all post slugs for static generation
 * Used in generateStaticParams()
 */
export const ALL_POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`;

/**
 * Query to fetch recent posts (limited count)
 * Useful for "Recent Posts" sections
 */
export const RECENT_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  featured,
  postFormat,
  externalUrl,
  sourceName,
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot,
    crop
  },
  "author": author->{
    name,
    slug,
    "image": image.asset->url
  },
  categories
}`;

/**
 * Query to fetch posts by category
 * Optimizations:
 * - Indexed _type filter
 * - Array contains check for categories
 */
export const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && $category in categories] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  featured,
  postFormat,
  externalUrl,
  sourceName,
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot,
    crop
  },
  "author": author->{
    name,
    slug,
    "image": image.asset->url
  },
  categories
}`;

// ============================================================================
// GROQ Queries for Services
// Following Sanity best practices for query optimization
// ============================================================================

/**
 * Query to fetch all services for listing page
 * Optimizations:
 * - Uses indexed _type filter
 * - Orders by popular status (featured first) then title
 * - Minimal projections (only needed fields)
 * - Image URL resolution in projection
 */
export const ALL_SERVICES_QUERY = `*[_type == "services"] | order(popular desc, title asc) {
  _id,
  title,
  slug,
  description,
  popular,
  isTherapy,
  category,
  "image": image{
    asset->{url},
    alt,
    hotspot,
    crop
  }
}`;

/**
 * Query to fetch services by category
 */
export const SERVICES_BY_CATEGORY_QUERY = `*[_type == "services" && category == $category] | order(popular desc, title asc) {
  _id,
  title,
  slug,
  description,
  popular,
  isTherapy,
  category,
  "image": image{
    asset->{url},
    alt,
    hotspot,
    crop
  }
}`;

/**
 * Query to fetch popular services for navigation
 * Optimizations:
 * - Compound filter on indexed fields
 * - Minimal projections for performance
 * - Orders alphabetically by title
 */
export const POPULAR_SERVICES_QUERY = `*[_type == "services" && popular == true] | order(title asc) {
  _id,
  title,
  slug
}`;

/**
 * Query to fetch a single service by slug
 * Includes all structured content fields for service detail page
 */
export const SINGLE_SERVICE_QUERY = `*[_type == "services" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  category,
  "image": image{
    asset->{url},
    alt,
    hotspot,
    crop
  },
  popular,
  isTherapy,
  overview,
  benefits,
  whatToExpect,
  whoIsItFor,
  duration,
  format,
  seo,
  faqs,
  ctaOverride,
  onDemand,
  "specialists": *[_type == "specialist" && references(^._id)] | order(order desc, name asc) {
    _id,
    name,
    slug,
    title,
    "image": image{
      asset->{url},
      alt,
      hotspot,
      crop
    },
    experience,
    specialties,
    teaser,
    fullBio,
    order
  }
}`;

/**
 * Query to fetch all service slugs for static generation
 * Used in generateStaticParams()
 */
export const ALL_SERVICE_SLUGS_QUERY = `*[_type == "services" && defined(slug.current)] {
  "slug": slug.current
}`;

/**
 * Query to fetch only therapy services (isTherapy == true)
 * Used on homepage when Therapy card is selected
 */
export const THERAPY_SERVICES_QUERY = `*[_type == "services" && isTherapy == true] | order(popular desc, title asc) {
  _id,
  title,
  slug,
  description,
  popular,
  isTherapy,
  category,
  "image": image{
    asset->{url},
    alt,
    hotspot,
    crop
  }
}`;

// ============================================================================
// GROQ Queries for Gallery
// Following Sanity best practices for query optimization
// ============================================================================

/**
 * Query to fetch all gallery images
 * Optimizations:
 * - Uses indexed _type filter
 * - Orders by uploadedAt (most recent first)
 * - Image URL resolution in projection
 */
export const ALL_GALLERY_IMAGES_QUERY = `*[_type == "gallery"] | order(uploadedAt desc) {
  _id,
  "image": image{
    asset->{url},
    alt,
    hotspot,
    crop
  },
  categories,
  uploadedAt
}`;

// ============================================================================
// GROQ Queries for Careers
// Following Sanity best practices for query optimization
// ============================================================================

/**
 * Query to fetch all active careers
 * Optimizations:
 * - Uses indexed _type and isActive filters
 * - Orders by postedDate (most recent first)
 * - Minimal projections for listing page
 */
export const ALL_CAREERS_QUERY = `*[_type == "career" && isActive == true] | order(postedDate desc) {
  _id,
  title,
  slug,
  department,
  location,
  employmentType,
  locationType,
  salaryRange,
  postedDate
}`;

/**
 * Query to fetch careers filtered by employment type
 * Used when navigating from filtered links
 */
export const CAREERS_BY_TYPE_QUERY = `*[_type == "career" && isActive == true && employmentType == $employmentType] | order(postedDate desc) {
  _id,
  title,
  slug,
  department,
  location,
  employmentType,
  locationType,
  salaryRange,
  postedDate
}`;

/**
 * Query to fetch a single career by slug
 * Full details for job detail page
 */
export const SINGLE_CAREER_QUERY = `*[_type == "career" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  department,
  location,
  employmentType,
  locationType,
  salaryRange,
  aboutRole,
  requirements,
  skills,
  postedDate
}`;

/**
 * Query to fetch all career slugs for static generation
 * Used in generateStaticParams()
 */
export const ALL_CAREER_SLUGS_QUERY = `*[_type == "career" && isActive == true && defined(slug.current)] {
  "slug": slug.current
}`;


export const TOP_REVIEWS_QUERY = `*[_type == "review"] | order(featured desc, publishedAt desc) [0...10] {
  _id,
  name,
  role,
  quote,
  rating
}`;

const REVIEWS_PROJECTION = `{
  _id,
  name,
  role,
  quote,
  rating,
  publishedAt
}`;


export const REVIEWS_FIRST_PAGE_QUERY = `*[_type == "review"] | order(publishedAt desc) [0...$pageSize] ${REVIEWS_PROJECTION}`;


export const REVIEWS_NEXT_PAGE_QUERY = `*[_type == "review" && _id > $lastId] | order(publishedAt desc) [0...$pageSize] ${REVIEWS_PROJECTION}`;

// ============================================================================
// GROQ Queries for About Us & Specialists
// ============================================================================

export const SPECIALISTS_QUERY = `*[_type == "specialist"] | order(order desc, name asc) {
  _id,
  name,
  slug,
  title,
  "image": image{
    asset->{url},
    alt,
    hotspot,
    crop
  },
  experience,
  specialties,
  teaser,
  fullBio,
  order,
  "servicesProvided": servicesProvided[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

export const ABOUT_US_QUERY = `*[_type == "aboutUs"][0] {
  "hero": {
    "title": hero.title,
    "italicSubtitle": hero.italicSubtitle,
    "description": hero.description,
    "images": hero.images[]{
      asset->{url},
      alt,
      hotspot,
      crop
    }
  },
  "philosophy": {
    "title": philosophy.title,
    "description": philosophy.description,
    "points": philosophy.points[]{
      title,
      description,
      icon
    }
  },
  "story": {
    "title": story.title,
    "paragraphs": story.paragraphs,
    "image": story.image{
      asset->{url},
      alt,
      hotspot,
      crop
    }
  }
}`;

export const AWARENESS_QUERY = `*[_type == "awareness"][0] {
  "hero": {
    "badge": hero.badge,
    "title": hero.title,
    "description": hero.description,
    "stats": hero.stats[]{
      label,
      value
    },
    "image": hero.image{
      asset->{url},
      alt,
      hotspot,
      crop
    }
  },
  "benefits": {
    "title": benefits.title,
    "subtitle": benefits.subtitle,
    "items": benefits.items[]{
      title,
      description,
      icon
    }
  },
  "highlights": {
    "title": highlights.title,
    "description": highlights.description,
    "items": highlights.items,
    "image": highlights.image{
      asset->{url},
      alt,
      hotspot,
      crop
    }
  },
  "pastSessions": {
    "title": pastSessions.title,
    "subtitle": pastSessions.subtitle,
    "sessions": pastSessions.sessions[]{
      venue,
      audience,
      "image": image{
        asset->{url},
        alt,
        hotspot,
        crop
      }
    }
  },
  "cta": {
    "title": cta.title,
    "description": cta.description,
    "buttonText": cta.buttonText
  }
}`;

export const GALLERY_QUERY = `*[_type == "gallery"] | order(publishedAt desc) {
  _id,
  "image": {
    "asset": { "url": image.asset->url },
    "alt": image.alt,
    "hotspot": image.hotspot,
    "crop": image.crop
  },
  title,
  locationEvent,
  story,
  tag,
  "categories": categories[]->title,
  isFeatured,
  publishedAt
}`;

export const GALLERY_CATEGORIES_QUERY = `*[_type == "galleryCategory"] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`;

export const MIND_GYM_QUERY = `*[_type == "mindGym"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  ageGroup,
  focusArea,
  shortDescription,
  "coverImage": coverImage {
    asset->{url},
    alt,
    hotspot,
    crop
  }
}`;

export const SINGLE_MIND_GYM_QUERY = `*[_type == "mindGym" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  ageGroup,
  focusArea,
  shortDescription,
  scienceBehindIt,
  quickTips,
  "coverImage": coverImage {
    asset->{url},
    alt,
    hotspot,
    crop
  }
}`;

// ============================================================================
// GROQ Queries for Announcements
// ============================================================================

/**
 * Query to fetch the latest active announcement from Promo Website
 */
export const ANNOUNCEMENT_QUERY = `*[_type == "promowebsite" && isActive == true] | order(_updatedAt desc)[0] {
  text
}`;

// ============================================================================
// GROQ Queries for Site Settings
// ============================================================================

/**
 * Query to fetch site-wide settings (singleton document)
 * Used across footer, contact page, homepage, and services page
 */
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  "contact": {
    "phone": contact.phone,
    "phoneLink": contact.phoneLink,
    "whatsapp": contact.whatsapp,
    "email": contact.email,
    "address": contact.address,
    "addressShort": contact.addressShort,
    "mapLink": contact.mapLink,
    "workingHours": contact.workingHours
  },
  "socialLinks": socialLinks[]{
    platform,
    url,
    "icon": icon.asset->url
  },
  "metrics": {
    "familiesCount": metrics.familiesCount,
    "therapistsCount": metrics.therapistsCount,
    "servicesCount": metrics.servicesCount,
    "googleRating": metrics.googleRating,
    "googleReviewsUrl": metrics.googleReviewsUrl
  },
  "footer": {
    "tagline": footer.tagline,
    "description": footer.description
  },
  "navigation": {
    "quickLinks": navigation.quickLinks[]{
      label,
      href
    },
    "headerCtaText": navigation.headerCtaText,
    "headerCtaMobileText": navigation.headerCtaMobileText,
    "headerCtaLink": navigation.headerCtaLink,
    "joinTeamText": navigation.joinTeamText
  },
  "homepage": {
    "heroDescription": homepage.heroDescription,
    "rollingAudiences": homepage.rollingAudiences,
    "rollingSchools": homepage.rollingSchools,
    "ctaPrimary": homepage.ctaPrimary,
    "ctaSecondary": homepage.ctaSecondary,
    "faqTitle": homepage.faqTitle,
    "faqSubtitle": homepage.faqSubtitle,
    "faqs": homepage.faqs[]{
      question,
      answer
    },
    "heroImage": homepage.heroImage{
      asset->{url},
      alt,
      hotspot,
      crop
    },
    "heroImageAlt": homepage.heroImageAlt,
    "missionStatement": homepage.missionStatement,
    "serviceCategories": homepage.serviceCategories[]{
      title,
      outcome,
      href,
      icon
    },
    "whoNeedsItTitle": homepage.whoNeedsItTitle,
    "whoNeedsIt": homepage.whoNeedsIt[]{
      title,
      description,
      icon
    }
  },
  "servicesPage": {
    "allServicesDescription": servicesPage.allServicesDescription,
    "assessmentsDescription": servicesPage.assessmentsDescription,
    "therapyDescription": servicesPage.therapyDescription,
    "guidanceDescription": servicesPage.guidanceDescription,
    "programsDescription": servicesPage.programsDescription
  },
  "contactPage": {
    "heroTitle": contactPage.heroTitle,
    "heroTitleHighlight": contactPage.heroTitleHighlight,
    "heroSubtitle": contactPage.heroSubtitle,
    "processTitle": contactPage.processTitle,
    "processSubtitle": contactPage.processSubtitle,
    "processSteps": contactPage.processSteps[]{
      title,
      description
    },
    "faqTitle": contactPage.faqTitle,
    "faqs": contactPage.faqs[]{
      question,
      answer
    }
  },
  "aboutPage": {
    "faqs": aboutPage.faqs[]{
      question,
      answer
    }
  },
  "careersPage": {
    "faqs": careersPage.faqs[]{
      question,
      answer
    }
  }
}`;
