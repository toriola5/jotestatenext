import { createClient } from "@/lib/supabase/client";

const BUCKET = "Jayeolaestates";

function randomFileName(originalName: string, prefix = "") {
  const ext = originalName.split(".").pop();
  return `${prefix}${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;
}

export async function uploadImageToStorage(file: File): Promise<string> {
  const supabase = createClient();
  const fileName = randomFileName(file.name);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

export async function uploadVideoToStorage(file: File): Promise<string> {
  const supabase = createClient();
  const fileName = randomFileName(file.name, "videos/");

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (error) throw new Error(`Video upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
