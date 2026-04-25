import { NextRequest, NextResponse } from "next/server";
import { serverClient, SINGLE_DRAFT_QUERY } from "@/sanity/lib/server-client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/drafts/[id]/reject
 * Rejects a draft - either deletes it or marks it for revision
 * Body: { feedback: string, action: "delete" | "revise" }
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { feedback, action = "revise" } = body;

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

    if (action === "delete") {
      // Delete the draft completely
      await serverClient.delete(draftId);

      return NextResponse.json({
        success: true,
        message: "Draft deleted",
        action: "deleted",
      });
    } else {
      // Mark as needing revision - add feedback to the document
      await serverClient
        .patch(draftId)
        .set({
          reviewFeedback: feedback,
          reviewStatus: "needs_revision",
          reviewedAt: new Date().toISOString(),
        })
        .commit();

      return NextResponse.json({
        success: true,
        message: "Feedback saved - draft marked for revision",
        action: "revision_requested",
        feedback,
      });
    }
  } catch (error) {
    console.error("Error rejecting draft:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reject draft" },
      { status: 500 }
    );
  }
}
