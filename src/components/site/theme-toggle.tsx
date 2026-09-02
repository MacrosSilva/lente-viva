"use client";

import { useTheme } from "@/lib/use-theme";

export function ThemeToggle({ tone }: { tone: "auto" | "light" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={isDark}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 active:scale-[0.94] ${
        tone === "light"
          ? "border-white/30 text-white hover:border-white/70"
          : "border-line text-ink hover:border-line-strong"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-all duration-300 ${isDark ? "scale-100 opacity-100" : "scale-50 opacity-0 absolute"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path
          strokeLinecap="round"
          d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-all duration-300 ${!isDark ? "scale-100 opacity-100" : "scale-50 opacity-0 absolute"}`}
        fill="currentColor"
      >
        <path d="M20.4 14.7A8.4 8.4 0 1 1 9.3 3.6a6.7 6.7 0 0 0 11.1 11.1Z" />
      </svg>
    </button>
  );
}
