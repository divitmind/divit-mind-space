import { NextRequest, NextResponse } from "next/server";
import { serverClient, SINGLE_DRAFT_QUERY } from "@/sanity/lib/server-client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/drafts/[id]
 * Returns a single draft post by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Ensure draft ID format
    const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;

    const draft = await serverClient.fetch(SINGLE_DRAFT_QUERY, { draftId });

    if (!draft) {
      return NextResponse.json(
        { success: false, error: "Draft not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      draft,
    });
  } catch (error) {
    console.error("Error fetching draft:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch draft" },
      { status: 500 }
    );
  }
}
