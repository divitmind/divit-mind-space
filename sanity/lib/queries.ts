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
export const ALL_POSTS_QUERY = `*[_type == "post" && contentType == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  contentType,
  excerpt,
  publishedAt,
  readTime,
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot
  },
  "author": author->{
    name,
    slug,
    "image": image.asset->url
  },
  categories
}`;

/**
 * Query to fetch all news posts for listing pages
 * Optimizations:
 * - Uses indexed _type filter
 * - Filters by contentType for news posts
 * - Orders by indexed publishedAt field
 * - Minimal projections (only needed fields)
 * - Inline author dereferencing (prevents N+1 queries)
 * - Image URL resolution in projection
 */
export const NEWS_POSTS_QUERY = `*[_type == "post" && contentType == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  contentType,
  excerpt,
  publishedAt,
  readTime,
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot
  },
  "author": author->{
    name,
    slug,
    "image": image.asset->url
  },
  categories
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
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot
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
  "mainImage": mainImage{
    asset->{url},
    alt,
    hotspot
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
  "image": image{
    asset->{url},
    alt
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
 * Optimizations:
 * - Compound filter on indexed fields (_type and slug.current)
 * - [0] selector for single result
 * - Complete body content for PortableText rendering
 * - Full SEO fields for metadata
 */
export const SINGLE_SERVICE_QUERY = `*[_type == "services" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image,
  popular,
  body,
  seo
}`;

/**
 * Query to fetch all service slugs for static generation
 * Used in generateStaticParams()
 */
export const ALL_SERVICE_SLUGS_QUERY = `*[_type == "services" && defined(slug.current)] {
  "slug": slug.current
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
    hotspot
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
