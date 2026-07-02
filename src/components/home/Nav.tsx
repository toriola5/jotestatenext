"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/", sectionId: null },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Listings", href: "/listings", sectionId: null },
  { label: "Blog", href: "/blog", sectionId: null },
  { label: "FAQs", href: "/#faqs", sectionId: "faqs" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const sectionIds = ["services", "about", "faqs", "contact"];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    const onScroll = () => {
      if (window.scrollY < 120) setActiveSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isActive = (href: string, sectionId: string | null) => {
    if (href === "/listings" || href === "/blog") return pathname === href;
    if (sectionId) return activeSection === sectionId;
    return activeSection === "home" && pathname === "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpeg"
              alt="Jola Toriola Estates"
              width={36}
              height={36}
              className="rounded-lg object-cover"
            />
            <span className="text-base font-bold text-gray-900 leading-tight">
              Jola Toriola<br />
              <span className="text-[var(--primary)]">Estates</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = isActive(l.href, l.sectionId);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-sm font-medium transition-colors pb-1 ${
                    active
                      ? "text-[var(--primary)]"
                      : "text-gray-600 hover:text-[var(--primary)]"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/listings"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-red-700 transition-colors"
            >
              View Properties
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium transition-colors ${
                isActive(l.href, l.sectionId)
                  ? "text-[var(--primary)]"
                  : "text-gray-700 hover:text-[var(--primary)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/listings"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium text-center"
          >
            View Properties
          </Link>
        </div>
      )}
    </header>
  );
}
