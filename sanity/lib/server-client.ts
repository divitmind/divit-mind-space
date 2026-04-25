import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Server-side Sanity client with write token
 * Can read draft documents (prefixed with "drafts.")
 * Only use in server components and API routes
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for drafts
  token: process.env.SANITY_WRITE_TOKEN,
})

/**
 * Query to fetch all draft blog posts
 */
export const DRAFT_POSTS_QUERY = `*[_type == "post" && _id match "drafts.*"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  _createdAt,
  _updatedAt,
  readTime,
  "mainImage": mainImage{
    asset->{url},
    alt
  },
  "author": author->{
    name,
    slug,
    "image": image.asset->url
  },
  categories
}`

/**
 * Query to fetch a single draft post by ID
 */
export const SINGLE_DRAFT_QUERY = `*[_id == $draftId][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  body,
  _createdAt,
  _updatedAt,
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
}`
