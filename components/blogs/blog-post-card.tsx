import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { urlFor } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/types";

interface BlogPostCardProps {
  post: PostListItem;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  // Get image URL from Sanity
  const imageUrl = post.mainImage?.asset?.url
    ? urlFor(post.mainImage)?.width(400).height(225).url()
    : "/placeholder.svg";

  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format read time
  const readTimeText = post.readTime
    ? `${post.readTime} min`
    : "5 min";

  return (
    <Link
      href={`/blogs/${post.slug.current}`}
      className="bg-[#FDFBF7] text-card-foreground overflow-hidden rounded-lg border hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="grid gap-2 p-4">
        <h3 className="text-lg leading-tight font-semibold line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {post.excerpt}
          </p>
        )}
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={post.author.image || "/placeholder.svg"}
              alt={post.author.name}
            />
            <AvatarFallback>
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{post.author.name}</span>
          <span>•</span>
          <span>{readTimeText} read</span>
        </div>
      </div>
    </Link>
  );
}
