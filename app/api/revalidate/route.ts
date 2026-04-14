import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Secret token to validate webhook requests from Sanity
const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

// Map Sanity document types to paths and tags that need revalidation
const revalidationMap: Record<string, { paths: string[]; tags: string[] }> = {
  // Careers
  career: {
    paths: ["/careers"],
    tags: ["career"],
  },
  // Services
  services: {
    paths: ["/services"],
    tags: ["services"],
  },
  // Blog posts
  post: {
    paths: ["/blogs"],
    tags: ["post"],
  },
  // News
  news: {
    paths: ["/blogs"],
    tags: ["news"],
  },
  // Reviews/Testimonials
  review: {
    paths: ["/"],
    tags: ["review"],
  },
  // Gallery
  gallery: {
    paths: ["/gallery"],
    tags: ["gallery"],
  },
  // About Us
  aboutUs: {
    paths: ["/about-us"],
    tags: ["aboutUs"],
  },
  // Specialists
  specialist: {
    paths: ["/about-us"],
    tags: ["specialist"],
  },
  // Awareness/Workshops
  awareness: {
    paths: ["/awareness-program"],
    tags: ["awareness"],
  },
  // Site Settings (affects multiple pages)
  siteSettings: {
    paths: ["/", "/contact-us", "/services", "/about-us"],
    tags: ["siteSettings"],
  },
  // Promo/Announcements
  promowebsite: {
    paths: ["/"],
    tags: ["promowebsite"],
  },
  // Mind Gym
  mindGym: {
    paths: ["/mind-gym"],
    tags: ["mindGym"],
  },
};

export async function POST(req: NextRequest) {
  try {
    // Validate secret
    if (!SANITY_REVALIDATE_SECRET) {
      console.error("Missing SANITY_REVALIDATE_SECRET environment variable");
      return NextResponse.json(
        { message: "Missing secret configuration" },
        { status: 500 }
      );
    }

    // Parse and validate the webhook body
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      console.error("Invalid signature from Sanity webhook");
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      console.error("Missing _type in webhook body");
      return NextResponse.json(
        { message: "Missing document type" },
        { status: 400 }
      );
    }

    const { _type, slug } = body;
    const config = revalidationMap[_type];

    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = [];

    if (config) {
      // Revalidate configured paths
      for (const path of config.paths) {
        revalidatePath(path);
        revalidatedPaths.push(path);
      }

      // Revalidate configured tags
      for (const tag of config.tags) {
        revalidateTag(tag);
        revalidatedTags.push(tag);
      }

      // If there's a slug, also revalidate the specific page
      if (slug?.current) {
        const slugPath = getSlugPath(_type, slug.current);
        if (slugPath) {
          revalidatePath(slugPath);
          revalidatedPaths.push(slugPath);
        }
      }
    } else {
      // Unknown type - revalidate home page as fallback
      revalidatePath("/");
      revalidatedPaths.push("/");
    }

    console.log(`Revalidated for ${_type}:`, { revalidatedPaths, revalidatedTags });

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated ${_type}`,
      paths: revalidatedPaths,
      tags: revalidatedTags,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}

// Helper to get specific page path based on document type and slug
function getSlugPath(type: string, slug: string): string | null {
  const slugPaths: Record<string, string> = {
    services: `/services/${slug}`,
    post: `/blogs/${slug}`,
    career: `/careers/${slug}`,
    specialist: `/about-us#specialists`,
    mindGym: `/mind-gym/${slug}`,
  };

  return slugPaths[type] || null;
}
