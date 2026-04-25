import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { serverClient, SINGLE_DRAFT_QUERY } from "@/sanity/lib/server-client";
import { urlFor } from "@/sanity/lib/image";
import { BlogHeader } from "@/components/blogs/blog-header";
import { portableTextComponents } from "@/components/portable-text-components";
import { FeaturesShowcaseSection } from "@/components/homepage/features-showcase-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { ApprovalPanel } from "@/components/preview/approval-panel";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, FileText } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ draftId: string }>;
}

// Disable caching for preview pages
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { draftId } = await params;
  const fullDraftId = draftId.startsWith("drafts.") ? draftId : `drafts.${draftId}`;

  console.log(`[Metadata] Fetching for ID: ${fullDraftId}`);

  try {
    const draft = await serverClient.fetch(SINGLE_DRAFT_QUERY, { draftId: fullDraftId });
    console.log(`[Metadata] Found: ${!!draft}`);
    return {
      title: draft ? `Preview: ${draft.title}` : "Draft Not Found",
      robots: "noindex, nofollow",
    };
  } catch (error) {
    console.error("[Metadata] Error fetching draft:", error);
    return {
      title: "Error Previewing Draft",
    };
  }
}

export default async function PreviewPage({ params }: PageProps) {
  const { draftId } = await params;
  const fullDraftId = draftId.startsWith("drafts.") ? draftId : `drafts.${draftId}`;

  console.log(`[Preview] Starting fetch for ID: ${fullDraftId}`);
  console.log(`[Preview] Token present: ${!!process.env.SANITY_WRITE_TOKEN}`);

  // Fetch the draft
  let draft;
  try {
    draft = await serverClient.fetch(SINGLE_DRAFT_QUERY, { draftId: fullDraftId });
    console.log(`[Preview] Fetch complete. Draft found: ${!!draft}`);
  } catch (error) {
    console.error("[Preview] Fetch error:", error);
    throw error;
  }

  if (!draft) {
    console.log(`[Preview] Draft not found, showing 404`);
    notFound();
  }

  // Fetch any existing feedback
  const feedbackQuery = `*[_id == $draftId][0] {
    reviewComments,
    reviewStatus
  }`;
  const feedbackData = await serverClient.fetch(feedbackQuery, { draftId: fullDraftId });

  // Format date for display
  const createdDate = new Date(draft._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Get main image URL
  const mainImageUrl = draft.mainImage?.asset
    ? urlFor(draft.mainImage)?.width(1200).height(675).url()
    : null;

  // Get author avatar URL
  const authorAvatar = draft.author?.image || "";

  // Get primary category
  const primaryCategory = draft.categories?.[0] || "Blog";

  return (
    <>
      {/* Preview Banner */}
      <div className="bg-amber-500 text-white py-3 px-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5" />
            <span className="font-medium">Draft Preview Mode</span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Unpublished
            </Badge>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs hidden md:inline-block opacity-80 italic">
               ID: {fullDraftId}
             </span>
             <Link
              href="/preview"
              className="text-sm font-medium underline hover:no-underline"
            >
              Back to Queue
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFBF7] min-h-screen">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-6 lg:py-10">
          {/* Draft Info Info - Simple Breadcrumb-like */}
          <div className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
             <FileText className="h-3 w-3" />
             <span>Draft Content</span>
             <span>/</span>
             <Clock className="h-3 w-3" />
             <span>Created {createdDate}</span>
          </div>

          {/* Blog Header - Using Official Component */}
          <BlogHeader
            category={primaryCategory}
            title={draft.title}
            author={{
              name: draft.author?.name || "Unknown",
              avatar: authorAvatar,
            }}
            publishedDate={createdDate}
          />

          {/* Main Image */}
          {mainImageUrl && (
            <div className="mt-6 lg:mt-8 overflow-hidden rounded-xl">
              <Image
                src={mainImageUrl}
                alt={draft.mainImage?.alt || draft.title}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
                priority
              />
              {draft.mainImage?.caption && (
                <p className="mt-2 text-sm text-muted-foreground text-center italic">
                  {draft.mainImage.caption}
                </p>
              )}
            </div>
          )}

          {/* Excerpt - Only shown in preview if present */}
          {draft.excerpt && (
            <div className="mt-6 p-4 bg-green/5 border-l-4 border-green rounded-r-lg">
              <p className="text-lg text-green/80 italic">{draft.excerpt}</p>
            </div>
          )}

          {/* Blog Content with PortableText */}
          <article className="mt-6 lg:mt-8 max-w-none">
            {Array.isArray(draft.body) && (
              <PortableText
                value={draft.body}
                components={portableTextComponents}
              />
            )}
          </article>

          {/* Read Time */}
          {draft.readTime && (
            <p className="mt-8 text-sm text-muted-foreground">
              Estimated read time: {draft.readTime}{" "}
              {draft.readTime === 1 ? "minute" : "minutes"}
            </p>
          )}

          {/* Categories/Tags */}
          {draft.categories && draft.categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {draft.categories.map((category: string) => (
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
          {draft.author?.bio && (
            <div className="mt-8 p-4 md:p-6 bg-white rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">About the author</h3>
              <div className="flex items-start gap-4">
                {authorAvatar && (
                  <Image
                    src={authorAvatar}
                    alt={draft.author.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{draft.author.name}</p>
                  <div className="mt-2 text-sm text-foreground/70 prose prose-sm">
                    <PortableText value={draft.author.bio} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Website Sections */}
      <FeaturesShowcaseSection />
      <CtaSection />

      {/* Spacing for the sticky approval panel */}
      <div className="h-40"></div>

      {/* Approval Panel - Fixed at bottom */}
      <ApprovalPanel
        draftId={fullDraftId}
        title={draft.title}
        slug={draft.slug?.current || ""}
        reviewStatus={feedbackData?.reviewStatus}
        reviewComments={feedbackData?.reviewComments}
      />
    </>
  );
}
