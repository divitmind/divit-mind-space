import { PortableTextBlock } from "next-sanity";

// Author Types
export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  bio?: PortableTextBlock[];
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Simplified Author for Post References
export interface AuthorReference {
  name: string;
  slug: {
    current: string;
  };
  image?: string;
  bio?: PortableTextBlock[];
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Post Image Types
export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Full Post Type
export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: {
    current: string;
  };
  contentType: "blog" | "news";
  excerpt?: string;
  mainImage?: SanityImage;
  author: AuthorReference;
  categories?: string[];
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  postFormat: "standard" | "external" | "event";
  externalUrl?: string;
  sourceName?: string;
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
}

// Simplified Post for Listing Pages
export interface PostListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  contentType: "blog" | "news";
  excerpt?: string;
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  postFormat: "standard" | "external" | "event";
  externalUrl?: string;
  sourceName?: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  author: {
    name: string;
    slug: {
      current: string;
    };
    image?: string;
  };
  categories?: string[];
}

// Query Result Types
export type PostsQueryResult = PostListItem[];
export type SinglePostQueryResult = Post | null;

// Service Types
export interface Service {
  _id: string;
  _type: "services";
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: SanityImage;
  popular: boolean;
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
}

// Simplified Service for Listing Pages
export interface ServiceListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  popular: boolean;
  isTherapy?: boolean;
}

// Service Navigation Item
export interface ServiceNavItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

// Service Query Result Types
export type ServicesQueryResult = ServiceListItem[];
export type SingleServiceQueryResult = Service | null;
export type ServiceNavQueryResult = ServiceNavItem[];

// Gallery Types
export interface GalleryItem {
  _id: string;
  image: {
    asset: {
      url: string;
    };
    alt: string;
  };
  title: string;
  story: string;
  tag?: string;
  categories: string[];
  isFeatured?: boolean;
  publishedAt: string;
}

export type GalleryQueryResult = GalleryItem[];

// Career Types
export interface Career {
  _id: string;
  _type: "career";
  title: string;
  slug: {
    current: string;
  };
  department: string;
  location: string[];
  employmentType: string;
  locationType: string;
  salaryRange?: {
    min?: string;
    max?: string;
    note?: string;
  };
  aboutRole: PortableTextBlock[];
  requirements: string[];
  skills: string[];
  isActive: boolean;
  postedDate: string;
}

export interface CareerListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  department: string;
  location: string[];
  employmentType: string;
  locationType: string;
  salaryRange?: {
    min?: string;
    max?: string;
    note?: string;
  };
}

export type CareersQueryResult = CareerListItem[];
export type SingleCareerQueryResult = Career | null;

// Review Types
export interface Review {
  _id: string;
  _type: "review";
  name: string;
  role?: string;
  quote: string;
  rating?: number;
  publishedAt?: string;
  featured?: boolean;
}

export interface ReviewListItem {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  rating?: number;
  publishedAt?: string;
}

export type ReviewsQueryResult = ReviewListItem[];

// Specialist / Team Types
export interface Specialist {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  image: SanityImage;
  experience?: string;
  specialties?: string[];
  teaser: string;
  fullBio: PortableTextBlock[];
  order?: number;
}

export type SpecialistsQueryResult = Specialist[];

// About Us Page Singleton Type
export interface AboutUs {
  hero?: {
    title?: string;
    italicSubtitle?: string;
    description?: string;
    images?: SanityImage[];
  };
  philosophy?: {
    title?: string;
    description?: string;
    points?: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  story?: {
    title?: string;
    paragraphs?: string[];
    image?: SanityImage;
  };
}

export type AboutUsQueryResult = AboutUs | null;
