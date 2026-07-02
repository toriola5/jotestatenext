import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPropertiesWithPagination } from "@/lib/propertyQuery";
import PropertyCard from "@/components/home/PropertyCard";

export default async function FeaturedProperties() {
  let properties: Awaited<
    ReturnType<typeof fetchPropertiesWithPagination>
  >["properties"] = [];

  try {
    const result = await fetchPropertiesWithPagination({
      currentPage: 1,
      itemsPerPage: 6,
    });
    properties = result.properties;
  } catch {
    return null;
  }

  if (properties.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12" data-animate="up">
          <div>
            <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
              Properties
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Listings
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Freshly added properties available for sale, rent, and shortlet
            </p>
          </div>
          <Link
            href="/listings"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            View all listings <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div
              key={property.id}
              data-animate="up"
              data-delay={String(index + 1)}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            View all listings <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
