import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "ghost" | "link";
  size?: "lg" | "md" | "sm" | "xs";
  outline?: boolean;
  disabled?: boolean;
  className?: string;
};

function Button({
  children,
  to,
  onClick,
  variant = "primary",
  size,
  outline = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClasses = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size ? `btn-${size}` : "";
  const outlineClass = outline ? "btn-outline" : "";
  const disabledClass = disabled ? "btn-disabled" : "";

  const buttonClasses =
    `${baseClasses} ${variantClass} ${sizeClass} ${outlineClass} ${disabledClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
