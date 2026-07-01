"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function submitReviewAction(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const fullName = formData.get("fullName") as string;
  const comments = formData.get("comments") as string;
  const rating = formData.get("rating") as string;
  const title = formData.get("title") as string;

  if (!fullName?.trim()) return { error: "Full name is required." };
  if (!comments?.trim()) return { error: "Comments are required." };
  if (!rating || rating === "0") return { error: "Please provide a rating." };

  try {
    await addDoc(collection(db, "Comments"), {
      fullname: fullName,
      rating: Number(rating),
      review: comments,
      salutation: title,
    });
    return { success: true };
  } catch {
    return { error: "Failed to submit review. Please try again." };
  }
}
