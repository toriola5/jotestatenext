"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-3">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => setLightbox(true)}>
          <Image
            src={images[current]}
            alt={`Property image ${current + 1}`}
            fill
            priority
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
              >
                <ChevronRight size={20} />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                {current + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === current ? "border-[var(--primary)]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setLightbox(false)}
          >
            <X size={22} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={26} />
          </button>
          <div className="relative max-w-5xl w-full aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[current]}
              alt={`Property image ${current + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={26} />
          </button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {current + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
