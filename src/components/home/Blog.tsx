import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    image: "/award1.JPG",
    title: "We're Proud to Announce a Significant Achievement",
    excerpt:
      "We are thrilled to share that our CEO, Honorable Jayeola Toriola (EFA), has recently been selected for a major industry honor. Being recognized at this level motivates us even further to continue raising the standard of our services.",
    content:
      "We are thrilled to share that our CEO, Honorable Jayeola Toriola (EFA), has recently been selected for a major industry honor. Being recognized at this level motivates us even further to continue raising the standard of our services. It reflects the trust our clients place in us and reinforces our commitment to delivering exceptional results in everything we do.",
    date: "December 5, 2025",
    category: "News",
  },
  {
    id: 2,
    image: "/rent.jpg",
    title: "You Need to Know This Before Buying or Renting a Property",
    excerpt:
      "Before buying or renting a property, it's important to think beyond your immediate needs and consider how your lifestyle may change in the next few years — family growth, work requirements, or the need for more space.",
    content:
      "Before buying or renting a property, it's important to think beyond your immediate needs and consider how your lifestyle may change in the next few years, such as family growth, work requirements, or the need for more space and accessibility. Take time to research the neighborhood as well — look into safety, noise levels, nearby services, transportation options, and any future developments that may affect your comfort or the property's long-term value. Finally, never rely on photos alone; always inspect the property carefully for structural issues, plumbing and electrical problems, ventilation, pests, or poor maintenance. A thorough inspection helps you avoid unexpected costs or complications, ensuring you make a confident and informed decision.",
    date: "November 28, 2025",
    category: "Tips",
  },
  {
    id: 3,
    image: "/mistake.jpg",
    title: "Common Mistakes First-Time Homebuyers Make",
    excerpt:
      "One of the biggest mistakes new buyers make is failing to set a realistic budget. Many people focus only on the listing price and forget about legal fees, inspections, taxes, renovation costs, and ongoing maintenance.",
    content:
      "One of the biggest mistakes new buyers make is failing to set a realistic budget. Many people focus only on the property's listing price and forget about additional expenses such as legal fees, inspections, taxes, renovation costs, and ongoing maintenance. Without a clear budget, you might fall in love with a home you ultimately can't afford. Another common error is choosing a home based solely on emotions. It's easy to be drawn in by a beautiful kitchen or a spacious living room, but you must also consider practical factors like location, neighborhood safety, commute times, access to schools and amenities, and the long-term resale value. A home isn't just a place you love — it's one of the biggest financial investments of your life.",
    date: "November 20, 2025",
    category: "Advice",
  },
];

export { posts };

export default function Blog() {
  return (
    <section id="blog" className="pt-10 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14" data-animate="up">
          <div>
            <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
              Our Blog
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Latest from Our Blog
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Stay updated with the latest information about Jola Estates Agency
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            View all posts <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              data-animate="up"
              data-delay={String(index + 1)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            View all posts <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
