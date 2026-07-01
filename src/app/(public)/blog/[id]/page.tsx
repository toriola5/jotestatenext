import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { posts } from "@/components/home/Blog";

export function generateStaticParams() {
  return posts.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));
  if (!post) return {};
  return { title: `${post.title} — Jola Estates Blog` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));
  if (!post) notFound();

  const others = posts.filter((p) => p.id !== post.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative w-full h-[50vh] bg-gray-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <span className="inline-block bg-[var(--primary)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
            {post.title}
          </h1>
          <div className="flex items-center gap-1.5 text-gray-300 text-sm mt-3">
            <Calendar size={13} />
            {post.date}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[var(--primary)] mb-8 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>

        <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
          <Tag size={14} className="text-[var(--primary)]" />
          <span>Category:</span>
          <span className="font-medium text-gray-700">{post.category}</span>
        </div>
      </div>

      {/* Related posts */}
      {others.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/blog/${other.id}`}
                  className="group flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">{other.date}</p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {other.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
