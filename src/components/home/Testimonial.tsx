"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: string;
  fullname: string;
  salutation: string;
  review: string;
  rating: number;
};

const VISIBLE = 3;

export default function Testimonial() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "Comments"), orderBy("rating", "desc"));
        const snapshot = await getDocs(q);
        setReviews(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Review, "id">),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const total = reviews.length;
  const maxIndex = Math.max(0, total - VISIBLE);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  // Auto-advance every 5s — pauses while hovering
  useEffect(() => {
    if (total <= VISIBLE) return;
    const id = setInterval(() => {
      if (!isHovered) setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [total, maxIndex, isHovered]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <div className="mt-2 w-10 h-1 bg-[var(--primary)] rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <div key={s} className="w-4 h-4 rounded bg-gray-200" />)}
                </div>
                <div className="space-y-2 mb-5">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (total === 0) return null;

  return (
    <section className="pt-20 pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <div className="mt-2 w-10 h-1 bg-[var(--primary)] rounded-full" />
            <p className="text-gray-500 mt-1 text-sm">
              {total} verified review{total !== 1 ? "s" : ""}
            </p>
          </div>

          {total > VISIBLE && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prev}
                disabled={index === 0}
                className="p-2 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={index >= maxIndex}
                className="p-2 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Slider track */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${index} * (100% / ${VISIBLE} + 8px)))`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col shrink-0"
                style={{ width: `calc(100% / ${VISIBLE} - 16px)`, minWidth: "260px" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.rating
                          ? "fill-[var(--primary)] text-[var(--primary)]"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5 line-clamp-5">
                  &quot;{r.review}&quot;
                </p>
                <p className="font-semibold text-gray-900 text-sm">
                  {r.salutation ? `${r.salutation}. ` : ""}
                  {r.fullname}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators + mobile arrows */}
        {total > VISIBLE && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              disabled={index === 0}
              className="sm:hidden p-2 rounded-full border border-gray-200 text-gray-500 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 h-2 bg-[var(--primary)]"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={index >= maxIndex}
              className="sm:hidden p-2 rounded-full border border-gray-200 text-gray-500 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
