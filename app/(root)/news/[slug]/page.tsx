import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { BlogHeader } from "@/components/blogs/blog-header";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { SINGLE_POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/sanity/types";
import { portableTextComponents } from "@/components/portable-text-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all news posts at build time
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "post" && contentType == "news" && defined(slug.current)] {
      "slug": slug.current
    }`
  );

  return posts?.map((post) => ({
    slug: post.slug,
  })) || [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: post } = await sanityFetch({
    query: SINGLE_POST_QUERY,
    params: { slug },
    tags: ["post"],
  });

  const postData = post as Post;

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  const title = postData.seo?.metaTitle || postData.title;
  const description = postData.seo?.metaDescription || postData.excerpt || "";
  const ogImage = postData.seo?.ogImage || postData.mainImage;
  const ogImageUrl = ogImage ? urlFor(ogImage)?.width(1200).height(630).url() : null;
  const postUrl = `https://divitmindspace.com/news/${postData.slug.current}`;

  return {
    title: `${title} | Divit MindSpace`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: postUrl,
      publishedTime: postData.publishedAt,
      authors: [postData.author.name],
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : [],
      siteName: "Divit MindSpace",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  const { data: post } = await sanityFetch({
    query: SINGLE_POST_QUERY,
    params: { slug },
    tags: ["post"],
  });

  const postData = post as Post;

  if (!postData) {
    notFound();
  }

  // Format date for display
  const formattedDate = new Date(postData.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Get main image URL
  const mainImageUrl = postData.mainImage
    ? urlFor(postData.mainImage)?.width(1200).height(675).url()
    : null;

  // Get author avatar URL
  const authorAvatar = postData.author.image || "";

  // Get primary category
  const primaryCategory = postData.categories?.[0] || "News";

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: postData.title,
    description: postData.excerpt || "",
    image: mainImageUrl || "",
    datePublished: postData.publishedAt,
    dateModified: postData.publishedAt,
    author: {
      "@type": "Person",
      name: postData.author.name,
      url: `https://divitmindspace.com/authors/${postData.author.slug.current}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Divit MindSpace",
      logo: {
        "@type": "ImageObject",
        url: "https://divitmindspace.com/divit-mindspace-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://divitmindspace.com/news/${postData.slug.current}`,
    },
    keywords: postData.categories?.join(", ") || "",
    articleSection: primaryCategory,
    wordCount: postData.readTime ? postData.readTime * 200 : undefined,
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FDFBF7] min-h-screen">
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Blog Header */}
          <BlogHeader
            category={primaryCategory}
            title={postData.title}
            author={{
              name: postData.author.name,
              avatar: authorAvatar,
            }}
            publishedDate={formattedDate}
          />

          {/* Main Image */}
          {mainImageUrl && (
            <div className="mt-12 overflow-hidden rounded-xl">
              <Image
                src={mainImageUrl}
                alt={postData.mainImage?.alt || postData.title}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
                priority
              />
              {postData.mainImage?.caption && (
                <p className="mt-2 text-sm text-muted-foreground text-center italic">
                  {postData.mainImage.caption}
                </p>
              )}
            </div>
          )}

          {/* Blog Content with PortableText */}
          <article className="mt-12 max-w-none">
            {Array.isArray(postData.body) && (
              <PortableText 
                value={postData.body} 
                components={portableTextComponents}
              />
            )}
          </article>

          {/* Read Time */}
          {postData.readTime && (
            <p className="mt-8 text-sm text-muted-foreground">
              Estimated read time: {postData.readTime} {postData.readTime === 1 ? "minute" : "minutes"}
            </p>
          )}

          {/* Categories/Tags */}
          {postData.categories && postData.categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {postData.categories.map((category: string) => (
                <span
                  key={category}
                  className="px-3 py-1 text-sm bg-green/10 text-green rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio */}
          {postData.author.bio && (
            <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">About the author</h3>
              <div className="flex items-start gap-4">
                {authorAvatar && (
                  <Image
                    src={authorAvatar}
                    alt={postData.author.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{postData.author.name}</p>
                  <div className="mt-2 text-sm text-foreground/70 prose prose-sm">
                    <PortableText value={postData.author.bio} />
                  </div>
                  {postData.author.social && (
                    <div className="mt-3 flex gap-3">
                      {postData.author.social.twitter && (
                        <a
                          href={postData.author.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green hover:underline"
                        >
                          Twitter
                        </a>
                      )}
                      {postData.author.social.linkedin && (
                        <a
                          href={postData.author.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                      {postData.author.social.github && (
                        <a
                          href={postData.author.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
