"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PostListItem } from "@/sanity/types";

interface BlogPageProps {
  posts: PostListItem[];
  title?: string;
}

const categories = [
  { id: "all", label: "All Posts" },
  { id: "parenting", label: "Parenting Tips" },
  { id: "clinical", label: "Clinical Insights" },
  { id: "education", label: "Education Strategies" },
  { id: "adult", label: "Adult Support" },
  { id: "stories", label: "Personal Stories" },
  { id: "school", label: "School Guidance" },
];

export default function BlogPage({ posts, title = "Blog" }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => post.categories?.includes(activeCategory));
  }, [activeCategory, posts]);

  // Find the featured post (highest priority to 'featured' flag, then newest)
  const featuredPost = useMemo(() => {
    const featured = posts.find((p) => p.featured);
    return featured || posts[0];
  }, [posts]);

  // Remaining posts for the grid (excluding featured if it's the newest)
  const gridPosts = useMemo(() => {
    return filteredPosts.filter((p) => p._id !== featuredPost?._id);
  }, [filteredPosts, featuredPost]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="pt-8 pb-4 lg:pt-12 lg:pb-8 px-4 text-center">
        <div className="container mx-auto">
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-green mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-green/60 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Insights, strategies, and stories to support your unique neurodivergent journey.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {posts.length > 0 && activeCategory === "all" && featuredPost && (
        <section className="pb-6 lg:pb-10 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-green/5 shadow-sm hover:shadow-md transition-shadow group"
            >
              <Link href={`/blogs/${featuredPost.slug.current}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-56 md:h-64 lg:h-auto min-h-[250px] md:min-h-[350px] overflow-hidden">
                  {featuredPost.mainImage?.asset?.url ? (
                    <Image
                      src={featuredPost.mainImage.asset.url}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-green/5 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-green/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2">
                    <span className="bg-purple text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-green/60 mb-4 md:mb-6">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                      <Tag className="w-3 h-3" />
                      {featuredPost.categories?.[0] || "Insight"}
                    </span>
                    <span className="hidden xs:block w-1 h-1 rounded-full bg-green/20" />
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                      {featuredPost.author?.name || "Expert"}
                    </span>
                    <span className="hidden xs:block w-1 h-1 rounded-full bg-green/20" />
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime || 5} min read
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-green mb-3 md:mb-4 leading-tight group-hover:text-purple transition-colors" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm md:text-lg text-green/70 mb-6 md:mb-8 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-green font-bold uppercase tracking-widest text-xs md:text-sm group-hover:gap-3 transition-all">
                    Read the Full Story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Tabs - scrollable on mobile */}
      <section className="pb-4 lg:pb-6 px-4 sticky top-16 md:top-20 z-30 bg-[#FDFBF7]/80 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex items-center overflow-x-auto no-scrollbar pb-2 md:pb-0 md:justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all border whitespace-nowrap
                  ${activeCategory === cat.id 
                    ? "bg-green text-white border-green shadow-sm" 
                    : "bg-white text-green/70 border-green/10 hover:border-green/30"}
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-10 lg:pb-16 px-4">
        <div className="container mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              layout
            >
              {gridPosts.map((post, idx) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {gridPosts.length === 0 && (
            <div className="text-center py-12 md:py-20">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-green/20" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-green">No posts found in this category</h3>
              <p className="text-sm md:text-green/60 mt-2">Check back soon for new insights and strategies.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }: { post: PostListItem }) {
  return (
    <Link 
      href={`/blogs/${post.slug.current}`}
      className="bg-white rounded-2xl overflow-hidden border border-green/5 shadow-sm hover:shadow-lg transition-all flex flex-col h-full group"
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        {post.mainImage?.asset?.url ? (
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-green-lite/10 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-green/10" />
          </div>
        )}
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
           <span className="bg-white/90 backdrop-blur-sm text-green px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm">
             {post.categories?.[0] || "Insight"}
           </span>
        </div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-green/40 mb-3 md:mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime || 5} min
          </span>
          <span className="hidden xs:block w-1 h-1 rounded-full bg-green/10" />
          <span className="line-clamp-1">By {post.author?.name || "Expert"}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-green mb-2 md:mb-3 leading-tight group-hover:text-purple transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs md:text-sm text-green/60 line-clamp-3 leading-relaxed mb-4 md:mb-6 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-green uppercase tracking-[0.2em] group-hover:gap-3 transition-all pt-3 md:pt-4 border-t border-green/5">
          Read More <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}
