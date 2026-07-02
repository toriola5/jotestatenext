"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What services does Jola Real Estates Agency offer?",
    a: "Jola Real Estates Agency provides comprehensive real estate services including property sales, rentals, property management, and real estate consulting to help you find your perfect home or investment property.",
  },
  {
    q: "Are the listings on this platform verified?",
    a: "Yes, all listings go through our verification process before being published to ensure accuracy and legitimacy.",
  },
  {
    q: "How do I schedule a property viewing?",
    a: "You can schedule a property viewing by contacting us through our website, calling our office directly, or sending us an email. Our team will arrange a convenient time for you to view the property.",
  },
  {
    q: "What areas do you cover?",
    a: "We specialize in properties across major metropolitan areas and surrounding regions. Contact us to learn more about specific locations and available properties in your area of interest.",
  },
  {
    q: "Do you offer property management services?",
    a: "Yes, we offer full-service property management including tenant screening, rent collection, maintenance coordination, and regular property inspections to ensure your investment is well-maintained.",
  },
  {
    q: "What is the buying process?",
    a: "Our buying process includes initial consultation, property search, viewings, offer negotiation, legal documentation, and final closing. We guide you through every step to ensure a smooth transaction.",
  },
];

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="pt-10 pb-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-animate="up">
          <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
            FAQs
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-3 mx-auto w-10 h-1 bg-[var(--primary)] rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              data-animate="up"
              data-delay={String(i + 1)}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-gray-900 text-sm">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
