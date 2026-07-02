"use client";

import { useEffect } from "react";

/**
 * Adds the `js-animate` class to <html> and sets up an IntersectionObserver
 * that adds `in-view` to every `[data-animate]` element when it scrolls into
 * view. The CSS in globals.css handles the actual transitions.
 *
 * Rendered once in the public layout — produces no DOM output.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js-animate");

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

    return () => {
      observer.disconnect();
      html.classList.remove("js-animate");
    };
  }, []);

  return null;
}
