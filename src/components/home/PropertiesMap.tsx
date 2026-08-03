import { MapPin } from "lucide-react";
import { fetchPropertiesWithPagination } from "@/lib/propertyQuery";
import AllPropertiesMapWrapper from "@/components/home/AllPropertiesMapWrapper";

export default async function PropertiesMap() {
  let properties: Awaited<
    ReturnType<typeof fetchPropertiesWithPagination>
  >["properties"] = [];

  try {
    const result = await fetchPropertiesWithPagination({
      currentPage: 1,
      itemsPerPage: 200,
      selectFields: "id,title,price,city,state,address,images,latitude,longitude",
      skipCount: true,
    });
    properties = result.properties;
  } catch {
    return null;
  }

  const mappable = properties.filter(
    (p): p is typeof p & { latitude: number; longitude: number } =>
      p.latitude != null && p.longitude != null,
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12" data-animate="up">
          <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-widest mb-2">
            Explore
          </p>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin size={26} className="text-[var(--primary)]" />
            Properties on the Map
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Browse our listings by location across Nigeria
          </p>
        </div>

        <div data-animate="up">
          {mappable.length > 0 ? (
            <AllPropertiesMapWrapper properties={mappable} />
          ) : (
            <div className="h-[500px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No property locations available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
