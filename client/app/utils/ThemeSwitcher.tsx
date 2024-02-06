"use-client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex item-center justify-cneter mx-4">
      {theme === "light" ? (
        <BiMoon
          className="text-white cursor-pointer"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="text-white cursor-pointer"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
