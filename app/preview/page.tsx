import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { serverClient, DRAFT_POSTS_QUERY } from "@/sanity/lib/server-client";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Clock, Eye, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Draft Posts - Review & Approval | Divit MindSpace",
  robots: "noindex, nofollow",
};

// Disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DraftPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  _createdAt: string;
  _updatedAt: string;
  readTime: number;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  author?: {
    name: string;
    image?: string;
  };
  categories?: string[];
  reviewStatus?: string;
}

export default async function DraftsPage() {
  const drafts: DraftPost[] = await serverClient.fetch(DRAFT_POSTS_QUERY);

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Header Banner */}
      <div className="bg-green text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="h-8 w-8" />
            Draft Posts - Review Queue
          </h1>
          <p className="mt-2 text-green-100">
            {drafts.length} draft{drafts.length !== 1 ? "s" : ""} awaiting review
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {drafts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green/10 mb-4">
              <FileText className="h-8 w-8 text-green" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">No Drafts Pending</h2>
            <p className="text-gray-500 mt-2">All blog posts have been reviewed.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => {
              const imageUrl = draft.mainImage?.asset?.url
                ? urlFor(draft.mainImage)?.width(400).height(225).url()
                : null;

              const createdDate = new Date(draft._createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              const draftIdShort = draft._id.replace("drafts.", "");

              return (
                <Link
                  key={draft._id}
                  href={`/preview/${draft._id}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green/30">
                    {/* Image */}
                    <div className="relative aspect-video bg-gray-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={draft.mainImage?.alt || draft.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-green/5">
                          <FileText className="h-12 w-12 text-green/30" />
                        </div>
                      )}
                      {/* Draft Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-amber-500 text-white">
                          Draft
                        </Badge>
                      </div>
                      {/* Needs Revision Badge */}
                      {draft.reviewStatus === "needs_revision" && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Needs Revision
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-green transition-colors">
                        {draft.title}
                      </h2>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {draft.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {draft.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {createdDate}
                        </span>
                        {draft.readTime && (
                          <span>{draft.readTime} min read</span>
                        )}
                        {draft.author?.name && (
                          <span className="truncate">by {draft.author.name}</span>
                        )}
                      </div>

                      {/* Categories */}
                      {draft.categories && draft.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {draft.categories.slice(0, 2).map((cat) => (
                            <Badge key={cat} variant="outline" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Preview CTA */}
                      <div className="mt-4 flex items-center gap-2 text-green text-sm font-medium group-hover:underline">
                        <Eye className="h-4 w-4" />
                        Preview & Review
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">How to Review</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Click on any draft card to preview how it will appear on the website</li>
            <li>Review the content, formatting, and images</li>
            <li>Add feedback or comments using the panel at the bottom</li>
            <li>Click <strong>Approve & Publish</strong> to make it live, or <strong>Request Revision</strong> to send feedback</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
