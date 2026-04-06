"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px 48px 0px",
        threshold: 0.15,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={[
        "scroll-to-top-button fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full",
        "border border-white/55 bg-[linear-gradient(135deg,rgba(15,118,110,0.96),rgba(245,158,11,0.92))] text-white",
        "shadow-[0_18px_40px_rgba(15,118,110,0.28)] ring-1 ring-black/5 backdrop-blur-xl",
        "transition-all duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-primary/30",
        isVisible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-6 scale-90 opacity-0",
      ].join(" ")}
    >
      <span className="absolute inset-[3px] rounded-full bg-white/12 dark:bg-black/12" aria-hidden="true" />
      <span className="scroll-to-top-glyph relative flex items-center justify-center">
        <ArrowUp className="h-6 w-6" strokeWidth={2.4} />
      </span>
    </button>
  );
}
