"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function getPreferredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("light");

  React.useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", next);
      }
      applyTheme(next);
      return next;
    });
  }, []);

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="relative h-9 w-9"
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <Sun className={`absolute inset-0 m-auto h-5 w-5 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`} />
        <Moon className={`absolute inset-0 m-auto h-5 w-5 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`} />
      </span>
    </Button>
  );
}

export default ThemeToggle;
