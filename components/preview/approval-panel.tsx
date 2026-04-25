"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  Send,
  Loader2,
  ExternalLink,
  Eye,
  AlertCircle
} from "lucide-react";

interface ApprovalPanelProps {
  draftId: string;
  title: string;
  slug: string;
  reviewStatus?: string;
  reviewComments?: Array<{
    _key: string;
    reviewer: string;
    comment: string;
    createdAt: string;
  }>;
}

export function ApprovalPanel({
  draftId,
  title,
  slug,
  reviewStatus,
  reviewComments = []
}: ApprovalPanelProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
    url?: string;
  } | null>(null);

  const handleApprove = async () => {
    if (!confirm("Are you sure you want to publish this blog post?")) return;

    setIsApproving(true);
    try {
      const response = await fetch(`/api/drafts/${draftId}/approve`, {
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        setResult({
          type: "success",
          message: "Blog published successfully!",
          url: data.url,
        });
      } else {
        setResult({
          type: "error",
          message: data.error || "Failed to publish",
        });
      }
    } catch {
      setResult({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async (action: "delete" | "revise") => {
    const confirmMsg = action === "delete"
      ? "Are you sure you want to DELETE this draft? This cannot be undone."
      : "Send this draft back for revision with your feedback?";

    if (!confirm(confirmMsg)) return;

    setIsRejecting(true);
    try {
      const response = await fetch(`/api/drafts/${draftId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, action }),
      });
      const data = await response.json();

      if (data.success) {
        setResult({
          type: "success",
          message: action === "delete"
            ? "Draft deleted"
            : "Feedback sent - draft marked for revision",
        });
      } else {
        setResult({
          type: "error",
          message: data.error || "Failed to reject",
        });
      }
    } catch {
      setResult({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsRejecting(false);
    }
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim()) return;

    setIsSendingFeedback(true);
    try {
      const response = await fetch(`/api/drafts/${draftId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      const data = await response.json();

      if (data.success) {
        setFeedback("");
        // Refresh to show new comment
        router.refresh();
      } else {
        alert(data.error || "Failed to send feedback");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setIsSendingFeedback(false);
    }
  };

  // Show result state
  if (result) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green shadow-2xl z-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className={`flex items-center gap-4 ${result.type === "success" ? "text-green-700" : "text-red-600"}`}>
            {result.type === "success" ? (
              <CheckCircle2 className="h-8 w-8" />
            ) : (
              <AlertCircle className="h-8 w-8" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-lg">{result.message}</p>
              {result.url && (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green hover:underline flex items-center gap-1 mt-1"
                >
                  View published post <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/preview")}
            >
              View All Drafts
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green shadow-2xl z-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
              <Eye className="h-3 w-3 mr-1" />
              DRAFT PREVIEW
            </Badge>
            {reviewStatus === "needs_revision" && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                Needs Revision
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate max-w-[300px]">
            {title}
          </p>
        </div>

        {/* Previous Comments */}
        {reviewComments.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
            <p className="text-xs font-medium text-gray-500 mb-2">Previous Feedback:</p>
            {reviewComments.map((comment) => (
              <div key={comment._key} className="text-sm mb-2 last:mb-0">
                <span className="font-medium">{comment.reviewer}:</span>{" "}
                <span className="text-gray-600">{comment.comment}</span>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Input */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Add feedback or comments..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none pr-12 min-h-[60px]"
              rows={2}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={handleSendFeedback}
              disabled={!feedback.trim() || isSendingFeedback}
            >
              {isSendingFeedback ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end">
          <Button
            variant="outline"
            className="text-gray-600"
            onClick={() => handleReject("delete")}
            disabled={isRejecting || isApproving}
          >
            {isRejecting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4 mr-2" />
            )}
            Delete Draft
          </Button>

          <Button
            variant="outline"
            className="text-amber-600 border-amber-300 hover:bg-amber-50"
            onClick={() => handleReject("revise")}
            disabled={isRejecting || isApproving || !feedback.trim()}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Request Revision
          </Button>

          <Button
            className="bg-green hover:bg-green/90 text-white"
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
          >
            {isApproving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            )}
            Approve & Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
