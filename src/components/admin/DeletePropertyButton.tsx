"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProperty } from "@/actions/propertyActions";
import { useState } from "react";

export default function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProperty(id);
      router.replace("/admin/properties?toast=Property+deleted&toast_type=success");
      router.refresh();
    } catch {
      router.replace("/admin/properties?toast=Failed+to+delete+property&toast_type=error");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "..." : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Trash2 size={14} />
    </button>
  );
}
