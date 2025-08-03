"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getCurrentIcon = () => {
    return theme === "light" ? (
      <SunIcon className="h-4 w-4" />
    ) : (
      <MoonIcon className="h-4 w-4" />
    );
  };

  const getCurrentLabel = () => {
    return theme === "light" ? "Light" : "Dark";
  };

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "hover:bg-muted hover:text-foreground",
        "h-10 w-10 border border-border",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      )}
      onClick={cycleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 600, damping: 25 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 45, scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 25,
            duration: 0.2,
          }}
          className="flex items-center justify-center"
        >
          {getCurrentIcon()}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme ({getCurrentLabel()})</span>
    </motion.button>
  );
}
