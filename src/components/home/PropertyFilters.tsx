"use client";

import { useRouter, useSearchParams } from "next/navigation";

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export default function PropertyFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete("page");
    router.push(`/listings?${next.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={params.get("listing_type") || "all"}
        onChange={(e) => update("listing_type", e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
      >
        <option value="all">All Listing Types</option>
        <option value="For Sale">For Sale</option>
        <option value="For Rent">For Rent</option>
        <option value="Shortlet">Shortlet</option>
      </select>

      <select
        value={params.get("property_type") || "all"}
        onChange={(e) => update("property_type", e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
      >
        <option value="all">All Property Types</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Duplex">Duplex</option>
        <option value="Bungalow">Bungalow</option>
        <option value="Mansion">Mansion</option>
        <option value="Land">Land</option>
        <option value="Commercial Property">Commercial Property</option>
        <option value="Office Space">Office Space</option>
      </select>

      <select
        value={params.get("state") || "all"}
        onChange={(e) => update("state", e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
      >
        <option value="all">All States</option>
        {STATES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {(params.get("listing_type") || params.get("property_type") || params.get("state")) && (
        <button
          onClick={() => router.push("/listings")}
          className="px-4 py-2 rounded-lg border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
