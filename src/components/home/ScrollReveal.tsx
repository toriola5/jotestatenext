"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds the `js-animate` class to <html> and sets up an IntersectionObserver
 * that adds `in-view` to every `[data-animate]` element when it scrolls into
 * view. The CSS in globals.css handles the actual transitions.
 *
 * Rendered once in the public layout, which persists across client-side
 * navigations — so the observer is rebuilt on every pathname change to pick
 * up the new page's `[data-animate]` elements. Without this, navigating away
 * and back would leave those elements stuck at their pre-reveal (invisible)
 * state, since the original observer only ever knew about the elements that
 * existed at first mount.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js-animate");
    return () => html.classList.remove("js-animate");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
