import { useEffect, useState, useRef } from "react";
import Button from "../small/Button";

interface ThemeOption {
  name: string;
  icon: string;
  label: string;
}

const themeOptions: ThemeOption[] = [
  { name: "light", icon: "☀️", label: "Light" },
  { name: "dark", icon: "🌙", label: "Dark" },
  { name: "system", icon: "💻", label: "System" },
];

const getInitialTheme = (): string => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && themeOptions.some((option) => option.name === savedTheme)) {
    return savedTheme;
  }
  return "system";
};

const applyTheme = (theme: string) => {
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", systemTheme);
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(getInitialTheme());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    applyTheme(theme);
    // Only update localStorage if the theme has changed
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== theme) {
      localStorage.setItem("theme", theme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="fixed z-50 bottom-4 right-4" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle btn-solid bg-base-900 text-base-content border-0 text-lg"
      >
        {themeOptions.find((option) => option.name === theme)?.icon || "💻"}
      </Button>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 rounded-md shadow-lg bg-base-100 ring-1 ring-base-content ring-opacity-5">
          <div
            className="p-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {themeOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleThemeChange(option.name)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  theme === option.name ? "bg-base-200" : "hover:bg-base-200"
                } text-base-content`}
                role="menuitem"
              >
                {option.icon} {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
