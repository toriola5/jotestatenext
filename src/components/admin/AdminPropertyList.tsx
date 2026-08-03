"use client";

import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Property } from "@/lib/propertyQuery";
import { Edit2, Plus } from "lucide-react";
import DeletePropertyButton from "./DeletePropertyButton";

type Props = {
  properties: Property[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export default function AdminPropertyList({
  properties,
  currentPage,
  totalPages,
  totalCount,
}: Props) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-500 text-sm mt-0.5">{totalCount} total</p>
        </div>
        <Link
          href="/admin/upload-property"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <Plus size={16} />
          Add Property
        </Link>
      </div>

      {/* Mobile / tablet card list */}
      <div className="lg:hidden space-y-3">
        {properties.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{p.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {p.city}, {p.state}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/edit-property/${p.id}`}
                  className="p-2 text-gray-400 hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-lg transition-colors"
                >
                  <Edit2 size={15} />
                </Link>
                <DeletePropertyButton id={p.id} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  p.listing_type === "sale"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {p.listing_type}
              </span>
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-600">
                {p.property_type}
              </span>
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  p.status === "active"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {p.status}
              </span>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-gray-900 font-semibold text-sm">
                {formatPrice(p.price)}
              </span>
              <span className="text-gray-400 text-xs">
                {formatDate(p.created_at)}
              </span>
            </div>
          </div>
        ))}

        {properties.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p>No properties found.</p>
            <Link
              href="/admin/upload-property"
              className="mt-3 inline-flex items-center gap-1 text-[var(--primary)] text-sm hover:underline"
            >
              <Plus size={14} /> Add your first property
            </Link>
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Title", "Type", "Listing", "Price", "Location", "Status", "Date", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {properties.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-900 max-w-[180px]">
                  <span className="truncate block">{p.title}</span>
                </td>
                <td className="px-5 py-4 text-gray-600 capitalize whitespace-nowrap">
                  {p.property_type}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      p.listing_type === "sale"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {p.listing_type}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700 font-medium whitespace-nowrap">
                  {formatPrice(p.price)}
                </td>
                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                  {p.city}, {p.state}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      p.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                  {formatDate(p.created_at)}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/edit-property/${p.id}`}
                      className="p-1.5 text-gray-400 hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-lg transition-colors"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <DeletePropertyButton id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {properties.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>No properties found.</p>
            <Link
              href="/admin/upload-property"
              className="mt-3 inline-flex items-center gap-1 text-[var(--primary)] text-sm hover:underline"
            >
              <Plus size={14} /> Add your first property
            </Link>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`/admin/properties?page=${page}`}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--primary)]"
              }`}
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
