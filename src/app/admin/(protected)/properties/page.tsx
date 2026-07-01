import { fetchPropertiesWithPagination } from "@/lib/propertyQuery";
import AdminPropertyList from "@/components/admin/AdminPropertyList";

export const metadata = { title: "Properties — Jola Estates Admin" };

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { properties, totalPages, totalCount } =
    await fetchPropertiesWithPagination({
      currentPage,
      itemsPerPage: 10,
      includeInactive: true,
    });

  return (
    <AdminPropertyList
      properties={properties}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={totalCount}
    />
  );
}
