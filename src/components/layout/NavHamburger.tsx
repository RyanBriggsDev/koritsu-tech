import { useState, useEffect, useRef } from "react";
import Button from "../small/Button";
import { Link } from "react-router-dom";

interface NavHamburgerLink {
  label: string;
  href: string;
}

const navHamburgerLinks: NavHamburgerLink[] = [
  { label: "Services", href: "/support" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/services" },
];

function NavHamburger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="btn btn-ghost btn-circle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-xs">RB</span>
          </div>
        </div>
      </Button>
      {isOpen && (
        <div className="absolute left-0 mt-3 w-48 rounded-md shadow-lg bg-base-100 ring-1 ring-base-content ring-opacity-5">
          <div
            className="p-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {navHamburgerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavHamburger;
