import { NextRequest, NextResponse } from "next/server";
import { serverClient, SINGLE_DRAFT_QUERY } from "@/sanity/lib/server-client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface SanityDocument {
  _id: string;
  _type: string;
  [key: string]: unknown;
}

/**
 * POST /api/drafts/[id]/approve
 * Publishes a draft by creating the published version and deleting the draft
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Ensure draft ID format
    const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;

    // Fetch the draft
    const draft = await serverClient.fetch(SINGLE_DRAFT_QUERY, { draftId });

    if (!draft) {
      return NextResponse.json(
        { success: false, error: "Draft not found" },
        { status: 404 }
      );
    }

    // Create published ID (remove drafts. prefix)
    const publishedId = draftId.replace("drafts.", "");

    // Build published document with proper typing
    const publishedDoc: SanityDocument = {
      _id: publishedId,
      _type: "post",
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      body: draft.body,
      readTime: draft.readTime,
      categories: draft.categories,
      publishedAt: new Date().toISOString(),
    };

    // Add author reference if exists
    if (draft.author) {
      // Need to get the author _id from the dereferenced data
      const authorQuery = `*[_type == "author" && slug.current == $slug][0]._id`;
      const authorId = await serverClient.fetch(authorQuery, { slug: draft.author.slug?.current });
      if (authorId) {
        publishedDoc.author = { _type: "reference", _ref: authorId };
      }
    }

    // Add mainImage if exists
    if (draft.mainImage?.asset) {
      publishedDoc.mainImage = draft.mainImage;
    }

    // Add SEO if exists
    if (draft.seo) {
      publishedDoc.seo = draft.seo;
    }

    // Execute mutations: create published doc and delete draft
    await serverClient
      .transaction()
      .createOrReplace(publishedDoc as Parameters<typeof serverClient.createOrReplace>[0])
      .delete(draftId)
      .commit();

    const slug = draft.slug?.current || publishedId;

    return NextResponse.json({
      success: true,
      message: "Post published successfully",
      publishedId,
      url: `/blogs/${slug}`,
    });
  } catch (error) {
    console.error("Error approving draft:", error);
    return NextResponse.json(
      { success: false, error: "Failed to publish draft" },
      { status: 500 }
    );
  }
}
