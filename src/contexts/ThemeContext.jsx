"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const storageKey = "true-clean-theme";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

const apply_theme_to_dom = (nextTheme) => {
  if (typeof document === "undefined") {
    return;
  }

  const rootElement = document.documentElement;
  const sanitizedTheme = nextTheme === "dark" ? "dark" : "light";

  rootElement.classList.remove("light", "dark");
  rootElement.classList.add(sanitizedTheme);
  rootElement.setAttribute("data-theme", sanitizedTheme);
};

const get_initial_theme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(storageKey);
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const resolvedTheme =
    storedTheme || (prefersDarkScheme ? "dark" : "light");

  apply_theme_to_dom(resolvedTheme);

  return resolvedTheme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resolvedTheme = get_initial_theme();
    setTheme(resolvedTheme);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof window === "undefined") {
      return;
    }

    apply_theme_to_dom(theme);
    window.localStorage.setItem(storageKey, theme);
  }, [theme, hasHydrated]);

  const set_theme = useCallback(
    (nextTheme) => {
      setTheme(nextTheme === "dark" ? "dark" : "light");
      setHasHydrated(true);
    },
    [setHasHydrated],
  );

  const toggle_theme = useCallback(() => {
    setHasHydrated(true);
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, [setHasHydrated]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme: set_theme,
      toggleTheme: toggle_theme,
    }),
    [theme, set_theme, toggle_theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
