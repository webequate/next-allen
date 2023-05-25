import { useEffect, useState } from "react";

const useThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const activeTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      root.classList.remove(activeTheme);
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, activeTheme]);

  return [activeTheme, setTheme] as const;
};

export default useThemeSwitcher;
