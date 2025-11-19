"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const MoonIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 2V4.5M12 19.5V22M4.5 12H2M22 12H19.5M18.364 18.364L16.596 16.596M7.404 7.404L5.636 5.636M5.636 18.364L7.404 16.596M18.364 5.636L16.596 7.404"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const nextModeLabel = isMounted
    ? isDark
      ? "Activate light mode"
      : "Activate dark mode"
    : "Toggle color mode";

  const renderIcon = () => {
    if (!isMounted) {
      return <MoonIcon className="w-5 h-5" />;
    }

    return isDark ? (
      <SunIcon className="w-5 h-5" />
    ) : (
      <MoonIcon className="w-5 h-5" />
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextModeLabel}
      title={nextModeLabel}
      className={`theme-toggle flex items-center justify-center w-11 h-11 rounded-full border border-[var(--theme-toggle-border)] bg-[var(--theme-toggle-bg)] text-[var(--theme-toggle-icon)] transition-all duration-300 shadow-sm hover:bg-[var(--theme-toggle-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-toggle-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-toggle-ring-offset)] ${className}`}
    >
      <span className="sr-only">{nextModeLabel}</span>
      {renderIcon()}
    </button>
  );
};

export default ThemeToggle;

