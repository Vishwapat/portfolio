"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/ui/icons";

const subscribe = () => () => {};

/** swaps between light and dark; renders a stable shell until mounted to avoid mismatch */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center border border-transparent text-fg transition-colors hover:border-rule"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      {mounted ? isDark ? <Sun /> : <Moon /> : <span className="size-[18px]" />}
    </button>
  );
}
