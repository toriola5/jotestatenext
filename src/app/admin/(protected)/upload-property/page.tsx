import PropertyForm from "@/components/admin/PropertyForm";

export const metadata = { title: "Upload Property — Jola Estates Admin" };

export default function UploadPropertyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Property</h1>
        <p className="text-gray-500 text-sm mt-1">Add a new property listing</p>
      </div>
      <PropertyForm />
    </div>
  );
}
