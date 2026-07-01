"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImages, uploadVideos } from "@/lib/storage";
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
  };
}

export async function uploadPropertyAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  try {
    const images = formData.getAll("images") as File[];
    const videos = formData.getAll("videos") as File[];

    const actualImages = images.filter((f) => f instanceof File && f.size > 0);
    const actualVideos = videos.filter((f) => f instanceof File && f.size > 0);

    if (actualImages.length === 0) {
      return { error: "At least one image is required." };
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const hasInvalidType = actualImages.some((f) => !validTypes.includes(f.type));
    if (hasInvalidType) return { error: "Only JPG, PNG, and WebP images are allowed." };

    const maxImageSize = 5 * 1024 * 1024;
    if (actualImages.some((f) => f.size > maxImageSize)) {
      return { error: "Each image must be under 5MB." };
    }

    const maxVideoSize = 100 * 1024 * 1024;
    if (actualVideos.some((f) => f.size > maxVideoSize)) {
      return { error: "Each video must be under 100MB." };
    }

    const [imageUrls, videoUrls] = await Promise.all([
      uploadImages(actualImages),
      actualVideos.length > 0 ? uploadVideos(actualVideos) : Promise.resolve([]),
    ]);

    const fields: Record<string, string | string[]> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "images" && key !== "videos" && key !== "features") {
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
    return { error: err instanceof Error ? err.message : "Upload failed. Please try again." };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/listings");
  redirect("/admin/properties?toast=Property+uploaded+successfully&toast_type=success");
}

export async function updatePropertyAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const propertyId = formData.get("propertyId") as string;
  if (!propertyId) return { error: "Property ID is missing." };

  try {
    const fields: Record<string, string | string[]> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "images" && key !== "videos" && key !== "features" && key !== "propertyId") {
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
    return { error: err instanceof Error ? err.message : "Update failed. Please try again." };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/listings");
  redirect("/admin/properties?toast=Property+updated+successfully&toast_type=success");
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
}
