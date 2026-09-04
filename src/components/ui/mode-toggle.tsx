import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Icon } from "./icon";

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Icon name={theme === "light" ? "sun" : "moon"} size={20} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
