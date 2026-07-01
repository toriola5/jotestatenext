export default function ListingsLoading() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-8 w-56 bg-gray-200 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-36 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <div className="h-12 w-full max-w-2xl bg-gray-100 rounded-xl animate-pulse mb-8" />

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
          >
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />

            <div className="p-4 space-y-3">
              {/* Badge + price */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              {/* Title */}
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              {/* Location */}
              <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
              {/* Beds / baths row */}
              <div className="flex gap-4 pt-1">
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
