"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "Jayeolaestates";

export async function uploadImage(file: File): Promise<string> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

export async function uploadVideo(file: File): Promise<string> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop();
  const fileName = `videos/${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (error) throw new Error(`Video upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const results = await Promise.all(files.map(uploadImage));
  return results;
}

export async function uploadVideos(files: File[]): Promise<string[]> {
  const results = await Promise.all(files.map(uploadVideo));
  return results;
}
