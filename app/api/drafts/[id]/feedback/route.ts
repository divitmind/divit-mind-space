import { NextRequest, NextResponse } from "next/server";
import { serverClient, SINGLE_DRAFT_QUERY } from "@/sanity/lib/server-client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/drafts/[id]/feedback
 * Saves feedback/comments on a draft without approving or rejecting
 * Body: { feedback: string, reviewer?: string }
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { feedback, reviewer = "Anonymous" } = body;

    if (!feedback) {
      return NextResponse.json(
        { success: false, error: "Feedback is required" },
        { status: 400 }
      );
    }

    // Ensure draft ID format
    const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;

    // Fetch the draft to check it exists
    const draft = await serverClient.fetch(SINGLE_DRAFT_QUERY, { draftId });

    if (!draft) {
      return NextResponse.json(
        { success: false, error: "Draft not found" },
        { status: 404 }
      );
    }

    // Create feedback entry
    const feedbackEntry = {
      _key: Date.now().toString(),
      reviewer,
      comment: feedback,
      createdAt: new Date().toISOString(),
    };

    // Append feedback to existing comments array
    await serverClient
      .patch(draftId)
      .setIfMissing({ reviewComments: [] })
      .append("reviewComments", [feedbackEntry])
      .set({ lastReviewedAt: new Date().toISOString() })
      .commit();

    return NextResponse.json({
      success: true,
      message: "Feedback saved",
      feedbackEntry,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/drafts/[id]/feedback
 * Gets all feedback comments for a draft
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Ensure draft ID format
    const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;

    // Fetch feedback
    const feedbackQuery = `*[_id == $draftId][0] {
      reviewComments,
      reviewFeedback,
      reviewStatus,
      reviewedAt,
      lastReviewedAt
    }`;

    const result = await serverClient.fetch(feedbackQuery, { draftId });

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Draft not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      comments: result.reviewComments || [],
      reviewFeedback: result.reviewFeedback,
      reviewStatus: result.reviewStatus,
      lastReviewedAt: result.lastReviewedAt,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
