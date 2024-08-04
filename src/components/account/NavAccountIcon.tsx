import { useState, useEffect, useRef } from "react";
import Button from "../small/Button";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../contexts/AuthContext";
import BoxIcon from "../small/BoxIcon";

interface AccountLink {
  label: string;
  href: string;
}

const accountLinks: AccountLink[] = [
  { label: "Profile", href: "/account" },
  { label: "Settings", href: "account/settings" },
  { label: "Logout", href: "account/logout" },
];

function NavAccountIcon() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { state } = useAuth();

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
  if (state.isAuthenticated) {
    function getInitials(name: string | undefined): string {
      let initials = name?.split(" ");
      let firstWord = initials?.[0];
      let lastWord = initials?.[initials.length - 1];
      let firstLetter = firstWord?.charAt(0);
      let lastLetter = lastWord?.charAt(0);
      let initialsString = `${firstLetter}${lastLetter}`;
      return initialsString;
    }

    // Usage:
    let initials = getInitials(state.user?.name);

    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          className="btn btn-ghost btn-circle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-8 rounded-full">
              <span className="text-xs">
                {initials ? (
                  initials
                ) : (
                  <BoxIcon type="bx-user bg bg-neutral" size="20px" />
                )}
              </span>
            </div>
          </div>
        </Button>
        {isOpen && (
          <div className="absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-base-100 ring-1 ring-base-content ring-opacity-5">
            <div
              className="p-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {accountLinks.map((link) =>
                link.label === "Logout" ? (
                  <LogoutButton
                    key={link.label}
                    onLogout={() => setIsOpen(false)}
                  />
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NavAccountIcon;
