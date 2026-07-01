import { createClient } from "@/lib/supabase/server";

export type Property = {
  id: string;
  title: string;
  property_type: string;
  listing_type: string;
  price: number;
  description: string;
  bedrooms: number | null;
  bathrooms: number | null;
  toilet: number | null;
  size: number | null;
  state: string;
  city: string;
  address: string;
  features: string[];
  status: string;
  images: string[];
  video_urls: string[];
  created_at: string;
};

export type PropertyFilters = {
  listing_type?: string;
  property_type?: string;
  state?: string;
  status?: string;
};

export async function fetchPropertiesWithPagination(options: {
  currentPage?: number;
  itemsPerPage?: number;
  filters?: PropertyFilters;
  includeInactive?: boolean;
  selectFields?: string;
}) {
  const {
    currentPage = 1,
    itemsPerPage = 10,
    filters = {},
    includeInactive = false,
    selectFields = "*",
  } = options;

  const supabase = await createClient();
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let countQuery = supabase
    .from("properties")
    .select("*", { count: "exact", head: true });

  if (!includeInactive) countQuery = countQuery.eq("status", "active");

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") countQuery = countQuery.eq(key, value);
  });

  const { count } = await countQuery;

  let dataQuery = supabase
    .from("properties")
    .select(selectFields)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!includeInactive) dataQuery = dataQuery.eq("status", "active");

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") dataQuery = dataQuery.eq(key, value);
  });

  const { data, error } = await dataQuery.returns<Property[]>();
  if (error) throw error;

  return {
    properties: data || [],
    totalCount: count || 0,
    currentPage,
    totalPages: Math.ceil((count || 0) / itemsPerPage),
  };
}

export async function queryPropertyByID(id: string): Promise<Property> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function deletePropertyByID(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}

export async function updatePropertyByID(id: string, data: Partial<Property>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("properties")
    .update(data)
    .eq("id", id);
  if (error) throw error;
}
