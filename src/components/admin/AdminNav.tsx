"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/authActions";
import { Home, Upload, List, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/properties", label: "Properties", icon: List },
  { href: "/admin/upload-property", label: "Upload", icon: Upload },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-bold text-gray-900 text-base sm:text-lg shrink-0"
          >
            Jola<span className="text-[var(--primary)]">Estates</span>
            <span className="hidden sm:inline text-xs font-normal text-gray-400 ml-1">
              Admin
            </span>
          </Link>

          <nav className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                title={label}
                className={`flex items-center gap-2 px-2.5 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(href)
                    ? "bg-[var(--accent)] text-[var(--primary)]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}

            <Link
              href="/"
              title="Site"
              className="flex items-center gap-2 px-2.5 sm:px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Site</span>
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                title="Logout"
                className="flex items-center gap-2 px-2.5 sm:px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
