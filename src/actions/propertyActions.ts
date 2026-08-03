"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function preparePropertyData(form: Record<string, string | string[]>) {
  return {
    title: (form.title as string).trim(),
    property_type: form.propertyType as string,
    listing_type: form.listingType as string,
    price: parseFloat(form.price as string),
    description: (form.description as string).trim(),
    bedrooms: form.bedrooms ? parseInt(form.bedrooms as string) : null,
    bathrooms: form.bathrooms ? parseInt(form.bathrooms as string) : null,
    toilet: form.toilet ? parseInt(form.toilet as string) : null,
    size: form.size ? parseFloat(form.size as string) : null,
    state: form.state as string,
    city: (form.city as string).trim(),
    address: (form.address as string).trim(),
    features: form.features as string[],
    status: "active",
    latitude: form.latitude ? parseFloat(form.latitude as string) : null,
    longitude: form.longitude ? parseFloat(form.longitude as string) : null,
  };
}

export async function uploadPropertyAction(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  try {
    const imageUrls = formData.getAll("imageUrls") as string[];
    const videoUrls = formData.getAll("videoUrls") as string[];

    if (imageUrls.length === 0) {
      return { error: "At least one image is required." };
    }

    const fields: Record<string, string | string[]> = {};
    for (const [key, value] of formData.entries()) {
      if (
        key !== "imageUrls" &&
        key !== "videoUrls" &&
        key !== "features"
      ) {
        fields[key] = value as string;
      }
    }
    fields.features = formData.getAll("features") as string[];

    const supabase = await createClient();
    const { error } = await supabase.from("properties").insert([
      {
        ...preparePropertyData(fields),
        images: imageUrls,
        video_urls: videoUrls,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) return { error: `Database error: ${error.message}` };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : "Upload failed. Please try again.",
    };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/listings");
  redirect(
    "/admin/properties?toast=Property+uploaded+successfully&toast_type=success",
  );
}

export async function updatePropertyAction(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  const propertyId = formData.get("propertyId") as string;
  if (!propertyId) return { error: "Property ID is missing." };

  try {
    const fields: Record<string, string | string[]> = {};
    for (const [key, value] of formData.entries()) {
      if (
        key !== "imageUrls" &&
        key !== "videoUrls" &&
        key !== "features" &&
        key !== "propertyId"
      ) {
        fields[key] = value as string;
      }
    }
    fields.features = formData.getAll("features") as string[];

    const supabase = await createClient();
    const { error } = await supabase
      .from("properties")
      .update({
        ...preparePropertyData(fields),
        updated_at: new Date().toISOString(),
      })
      .eq("id", propertyId);

    if (error) return { error: `Update failed: ${error.message}` };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : "Update failed. Please try again.",
    };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/listings");
  redirect(
    "/admin/properties?toast=Property+updated+successfully&toast_type=success",
  );
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
}
