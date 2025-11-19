"use client";
import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [is_visible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle_visibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggle_visibility);

    return () => {
      window.removeEventListener("scroll", toggle_visibility);
    };
  }, []);

  const scroll_to_top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scroll_to_top}
      className={`fixed bottom-20 md:bottom-6 right-6 z-40 bg-primary hover:bg-[#00603A] text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 group ${
        is_visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
      style={{
        boxShadow: is_visible
          ? "0 4px 20px rgba(1, 80, 46, 0.4), 0 0 0 3px rgba(168, 213, 186, 0.2)"
          : "none",
      }}
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;

