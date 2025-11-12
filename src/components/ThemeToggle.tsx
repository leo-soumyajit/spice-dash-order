import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-16 h-8 rounded-full transition-all duration-300 shadow-md",
        isDark ? "bg-primary" : "bg-secondary"
      )}
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <div
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center",
          isDark ? "left-9" : "left-1"
        )}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-primary" />
        ) : (
          <Sun className="w-4 h-4 text-secondary" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
