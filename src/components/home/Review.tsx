"use client";

import { useActionState, useState } from "react";
import { submitReviewAction } from "@/actions/reviewActions";
import { Star } from "lucide-react";

export default function Review() {
  const [state, action, pending] = useActionState(submitReviewAction, null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section id="review" className="pt-20 pb-10 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
            Reviews
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Leave a Review</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Share your experience with Jola Estates
          </p>
        </div>

        {state?.success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-700 font-semibold">
              Thank you for your review!
            </p>
            <p className="text-green-600 text-sm mt-1">
              Your feedback has been submitted.
            </p>
          </div>
        ) : (
          <form action={action} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Row 1: Title + Full Name + Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Title
                </label>
                <select
                  name="title"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Rating
                </label>
                <div className="flex gap-2 pt-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star
                        size={24}
                        className={
                          star <= (hover || rating)
                            ? "fill-[var(--primary)] text-[var(--primary)]"
                            : "text-gray-200 fill-gray-200"
                        }
                      />
                    </button>
                  ))}
                </div>
                <input type="hidden" name="rating" value={rating} />
              </div>
            </div>

            {/* Row 2: Review textarea + Submit */}
            <div className="flex flex-col sm:flex-row gap-5 items-end">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Your Review
                </label>
                <textarea
                  name="comments"
                  rows={3}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex flex-col gap-2 sm:pb-0.5">
                {state?.error && (
                  <p className="text-red-500 text-xs">{state.error}</p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="px-8 py-2.5 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors text-sm whitespace-nowrap"
                >
                  {pending ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
