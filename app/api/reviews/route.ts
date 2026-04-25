import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { REVIEWS_NEXT_PAGE_QUERY } from "@/sanity/lib/queries";
import type { ReviewListItem } from "@/sanity/types";

const PAGE_SIZE = 12;

export async function GET(request: NextRequest) {
  const lastId = request.nextUrl.searchParams.get("lastId");
  const pageSizeParam = request.nextUrl.searchParams.get("pageSize");
  const pageSize = pageSizeParam ? Math.min(Number.parseInt(pageSizeParam, 10) || PAGE_SIZE, 24) : PAGE_SIZE;

  if (!lastId) {
    return NextResponse.json(
      { error: "lastId is required for pagination" },
      { status: 400 }
    );
  }

  const reviews = await client.fetch<ReviewListItem[]>(REVIEWS_NEXT_PAGE_QUERY, {
    lastId,
    pageSize,
  });

  return NextResponse.json({
    reviews,
    hasMore: reviews.length >= pageSize,
  });
}
