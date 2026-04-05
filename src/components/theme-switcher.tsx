"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 p-0"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 p-0"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />}
    </Button>
  );
}
