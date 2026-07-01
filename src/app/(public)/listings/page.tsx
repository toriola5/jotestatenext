import { Suspense } from "react";
import { fetchPropertiesWithPagination } from "@/lib/propertyQuery";
import PropertyCard from "@/components/home/PropertyCard";
import PropertyFilters from "@/components/home/PropertyFilters";

type SearchParams = {
  page?: string;
  listing_type?: string;
  property_type?: string;
  state?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const filters = {
    listing_type: params.listing_type,
    property_type: params.property_type,
    state: params.state,
  };

  const { properties, totalPages, totalCount } =
    await fetchPropertiesWithPagination({
      currentPage,
      itemsPerPage: 12,
      filters,
    });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Property Listings
        </h1>
        <p className="text-gray-500">
          {totalCount} propert{totalCount === 1 ? "y" : "ies"} available
        </p>
      </div>

      <Suspense fallback={<div className="h-10 animate-pulse bg-gray-100 rounded-lg w-96" />}>
        <PropertyFilters />
      </Suspense>

      {properties.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No properties found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <a
                    key={page}
                    href={`/listings?page=${page}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-[var(--primary)] text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {page}
                  </a>
                )
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
