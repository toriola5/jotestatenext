import { queryPropertyByID } from "@/lib/propertyQuery";
import PropertyForm from "@/components/admin/PropertyForm";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Property — Jola Estates Admin" };

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property;
  try {
    property = await queryPropertyByID(id);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
        <p className="text-gray-500 text-sm mt-1 truncate">{property.title}</p>
      </div>
      <PropertyForm property={property} />
    </div>
  );
}
