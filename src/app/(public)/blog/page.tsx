import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { posts } from "@/components/home/Blog";

export const metadata = { title: "Blog — Jola Estates" };

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
            Our Blog
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Latest from Jola Estates
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Stay updated with the latest news, tips, and insights about the
            Nigerian real estate market.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                  <Calendar size={12} />
                  {post.date}
                </div>
                <h2 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
