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
  body: PortableTextBlock[];
  readTime?: number;
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
export interface GalleryImage {
  _id: string;
  _type: "gallery";
  image: SanityImage;
  categories: string[];
  uploadedAt: string;
}

export type GalleryQueryResult = GalleryImage[];

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
