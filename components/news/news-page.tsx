"use client";

import { motion } from "motion/react";
import { Clock, ExternalLink, Newspaper, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PostListItem } from "@/sanity/types";

interface NewsPageProps {
  posts: PostListItem[];
}

export default function NewsPage({ posts }: NewsPageProps) {
  // Separate featured news from regular news
  const featuredNews = posts.find(p => p.featured) || posts[0];
  const regularNews = posts.filter(p => p._id !== featuredNews?._id);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="pt-16 pb-12 lg:pt-20 lg:pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-green mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Latest News
          </motion.h1>
          <motion.p 
            className="text-green/60 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Stay updated with our latest announcements, press coverage, and community events.
          </motion.p>
        </div>
      </section>

      {/* Featured News - Editorial Style */}
      {posts.length > 0 && featuredNews && (
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden border border-green/5 shadow-sm group"
            >
               <NewsItem post={featuredNews} isFeatured />
            </motion.div>
          </div>
        </section>
      )}

      {/* News Timeline/List */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            {regularNews.map((post, idx) => (
              <motion.div 
                key={post._id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-green/5 shadow-sm hover:shadow-md transition-all"
              >
                <NewsItem post={post} />
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-green/5">
              <Newspaper className="w-12 h-12 text-green/10 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green">No news updates yet</h3>
              <p className="text-green/60 mt-2">Check back soon for latest updates.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function NewsItem({ post, isFeatured = false }: { post: PostListItem, isFeatured?: boolean }) {
  const link = post.postFormat !== "standard" ? post.externalUrl : `/news/${post.slug.current}`;
  
  return (
    <div className={`grid grid-cols-1 ${isFeatured ? 'lg:grid-cols-2' : 'md:grid-cols-3'} gap-0`}>
      <div className={`relative ${isFeatured ? 'h-80 lg:h-auto min-h-[400px]' : 'h-64 md:h-auto'} overflow-hidden`}>
        {post.mainImage?.asset?.url ? (
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-green/5 flex items-center justify-center">
            <Newspaper className="w-12 h-12 text-green/10" />
          </div>
        )}
        {post.postFormat !== "standard" && (
            <div className="absolute top-4 left-4">
                <span className="bg-purple text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3" /> {post.postFormat === "event" ? "Event / Notice" : "Press Coverage"}
                </span>
            </div>
        )}
      </div>

      <div className={`p-8 ${isFeatured ? 'lg:p-12' : 'md:col-span-2'} flex flex-col justify-center`}>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-green/40 mb-4">
           <span className="flex items-center gap-1.5">
             <Calendar className="w-3 h-3" />
             {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
           </span>
           <span className="w-1 h-1 rounded-full bg-green/10" />
           <span>
             {post.postFormat !== "standard" ? `via ${post.sourceName || "Press"}` : "Announcement"}
           </span>
        </div>

        <h3 className={`${isFeatured ? 'text-3xl lg:text-4xl' : 'text-2xl'} font-serif text-green mb-4 leading-tight group-hover:text-purple transition-colors`} style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
          {post.title}
        </h3>

        <p className={`text-green/70 ${isFeatured ? 'text-lg' : 'text-base'} mb-8 line-clamp-3 leading-relaxed`}>
          {post.excerpt}
        </p>

        <Link 
          href={link || "#"}
          target={post.postFormat !== "standard" ? "_blank" : undefined}
          rel={post.postFormat !== "standard" ? "noopener noreferrer" : undefined}
          className="flex items-center gap-2 text-sm font-bold text-green uppercase tracking-widest group-hover:gap-3 transition-all"
        >
          {post.postFormat !== "standard" ? (post.postFormat === "event" ? "View Details" : "Read Full Article") : "Read More"} 
          {post.postFormat !== "standard" ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
