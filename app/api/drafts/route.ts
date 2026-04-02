import { NextResponse } from "next/server";
import { serverClient, DRAFT_POSTS_QUERY } from "@/sanity/lib/server-client";

/**
 * GET /api/drafts
 * Returns all draft blog posts awaiting approval
 */
export async function GET() {
  try {
    const drafts = await serverClient.fetch(DRAFT_POSTS_QUERY);

    return NextResponse.json({
      success: true,
      drafts,
      count: drafts.length,
    });
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch drafts" },
      { status: 500 }
    );
  }
}
