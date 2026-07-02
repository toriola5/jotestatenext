"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { formatPrice } from "@/lib/utils";
import type { Property } from "@/lib/propertyQuery";

export default function PropertyCard({ property }: { property: Property }) {
  const images = property.images?.filter(Boolean) ?? [];
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <Link
      href={`/listings/${property.id}`}
      className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
    >
      {/* Image area */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {images.length > 0 ? (
          <>
            <Image
              key={images[current]}
              src={images[current]}
              alt={`${property.title} — image ${current + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-opacity duration-300"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrent(i);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === current ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Image count badge */}
                <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
                  {current + 1}/{images.length}
                </span>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-sm">
            No Image
          </div>
        )}

        <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          {property.listing_type}
        </span>

        {/* Price badge on image */}
        <span className="absolute bottom-3 left-3 bg-white/95 text-[var(--primary)] font-bold text-sm px-3 py-1 rounded-lg shadow-sm z-10">
          {formatPrice(property.price)}
        </span>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
          <MapPin size={13} />
          <span className="truncate">
            {property.city}, {property.state}
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-100 pt-4">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble size={14} />
              {property.bedrooms} bed
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath size={14} />
              {property.bathrooms} bath
            </span>
          )}
          {property.size != null && (
            <span className="flex items-center gap-1">
              <Maximize2 size={14} />
              {property.size} sqm
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
