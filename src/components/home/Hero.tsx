import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";
import HeroStats from "@/components/home/HeroStats";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/home.jpg"
        alt="Luxury property"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/20 border border-[var(--primary)]/40 rounded-full px-4 py-1.5 text-white text-sm font-medium mb-6">
            <MapPin size={14} className="text-[var(--primary)]" />
            Premium Real Estate in Nigeria
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
            Find Your{" "}
            <span className="text-[var(--primary)]">Dream Property</span>
            <br />
            in Nigeria
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
            Explore hundreds of verified listings — from luxury homes to
            affordable apartments. Buy, rent, or sell with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--primary)] hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Search size={18} />
              Browse Listings
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors"
            >
              Contact an Agent
            </Link>
          </div>

          <HeroStats />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/50 text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="text-white/50" />
      </div>
    </section>
  );
}
