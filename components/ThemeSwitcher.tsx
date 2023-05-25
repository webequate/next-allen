// components/ThemeSwitcher.tsx
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="text-xl text-dark-2 dark:text-light-2 sm:hover:text-light-1 sm:dark:hover:text-light-1 bg-light-1 dark:bg-dark-1 sm:hover:bg-accent-light sm:dark:hover:bg-accent-light ring-1 ring-dark-3 dark:ring-light-3 p-3 ml-0 rounded-xl cursor-pointer duration-300"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? (
        <FaMoon className="text-xl" />
      ) : (
        <FaSun className="text-xl" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
