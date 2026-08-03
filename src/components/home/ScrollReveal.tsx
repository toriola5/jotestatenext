"use client";

import { useEffect } from "react";

/**
 * Adds the `js-animate` class to <html> and sets up an IntersectionObserver
 * that adds `in-view` to every `[data-animate]` element when it scrolls into
 * view. The CSS in globals.css handles the actual transitions.
 *
 * Rendered once in the public layout, which persists across client-side
 * navigations and never remounts. Sections like FeaturedProperties/
 * PropertiesMap are async and stream into the DOM after this component's
 * initial scan — same on first load (behind loading.tsx) and after
 * navigating back to a page. A one-time `querySelectorAll` would miss any
 * `[data-animate]` element that shows up later, leaving it stuck invisible.
 * A MutationObserver watches for those elements arriving at any point and
 * observes them as they appear, regardless of when/why they were added.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js-animate");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll("[data-animate]").forEach((el) => io.observe(el));
    };

    observeWithin(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-animate]")) io.observe(node);
          observeWithin(node);
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      html.classList.remove("js-animate");
    };
  }, []);

  return null;
}
