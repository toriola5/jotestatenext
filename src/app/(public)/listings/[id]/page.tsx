import { notFound } from "next/navigation";
import Link from "next/link";
import { queryPropertyByID } from "@/lib/propertyQuery";
import { formatPrice } from "@/lib/utils";
import PropertyGallery from "@/components/home/PropertyGallery";
import {
  MapPin, BedDouble, Bath, Maximize2, Home, CheckCircle,
  ArrowLeft, Phone, Mail, Video,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const property = await queryPropertyByID(id);
    return { title: `${property.title} — Jola Estates` };
  } catch {
    return { title: "Property — Jola Estates" };
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property;
  try {
    property = await queryPropertyByID(id);
  } catch {
    notFound();
  }

  const images = property.images?.filter(Boolean) ?? [];
  const videos = property.video_urls?.filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back link */}
        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: gallery + description + features + videos */}
          <div className="lg:col-span-2 space-y-6">

            {/* Gallery */}
            {images.length > 0 ? (
              <PropertyGallery images={images} />
            ) : (
              <div className="aspect-[16/10] rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400">
                No images available
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 text-base mb-3">About This Property</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 text-base mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-[var(--primary)] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-900 text-base mb-4 flex items-center gap-2">
                  <Video size={16} className="text-[var(--primary)]" />
                  Property Video{videos.length > 1 ? "s" : ""}
                </h2>
                <div className="space-y-4">
                  {videos.map((url, i) => (
                    <video
                      key={i}
                      src={url}
                      controls
                      className="w-full rounded-xl bg-black"
                      style={{ maxHeight: "400px" }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: sticky info panel */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:sticky lg:top-24">

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <span className="bg-[var(--primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {property.listing_type}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {property.property_type}
                </span>
              </div>

              {/* Price */}
              <p className="text-3xl font-bold text-[var(--primary)] mb-2">
                {formatPrice(property.price)}
              </p>

              {/* Title */}
              <h1 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-start gap-2 text-gray-500 text-sm mb-5">
                <MapPin size={14} className="shrink-0 mt-0.5 text-[var(--primary)]" />
                <span>{property.address}, {property.city}, {property.state}</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {property.bedrooms != null && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                    <BedDouble size={16} className="text-[var(--primary)]" />
                    <div>
                      <p className="text-xs text-gray-400">Bedrooms</p>
                      <p className="font-semibold text-gray-900 text-sm">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                    <Bath size={16} className="text-[var(--primary)]" />
                    <div>
                      <p className="text-xs text-gray-400">Bathrooms</p>
                      <p className="font-semibold text-gray-900 text-sm">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.toilet != null && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                    <Home size={16} className="text-[var(--primary)]" />
                    <div>
                      <p className="text-xs text-gray-400">Toilets</p>
                      <p className="font-semibold text-gray-900 text-sm">{property.toilet}</p>
                    </div>
                  </div>
                )}
                {property.size != null && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                    <Maximize2 size={16} className="text-[var(--primary)]" />
                    <div>
                      <p className="text-xs text-gray-400">Size</p>
                      <p className="font-semibold text-gray-900 text-sm">{property.size} sqm</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/2348023388329?text=${encodeURIComponent(
                    `Hello, I'm interested in this property:\n\n*${property.title}*\nLocation: ${property.address}, ${property.city}, ${property.state}\n\nPlease provide more details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20bb5a] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <a
                  href="tel:+2348023388329"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--primary)] hover:bg-red-700 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <Phone size={16} />
                  Call Us
                </a>
                <a
                  href="mailto:jolatoriolaestate4u@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
                >
                  <Mail size={16} />
                  Send Enquiry
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
