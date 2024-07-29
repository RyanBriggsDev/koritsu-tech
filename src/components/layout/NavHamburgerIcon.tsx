interface NavHamburgerIconProps {
  isActive: boolean;
  className?: string;
}

const NavHamburgerIcon: React.FC<NavHamburgerIconProps> = ({
  isActive,
  className = "",
}) => {
  return (
    <div
      className={`hamburger-icon flex flex-col justify-between w-[15px] h-[14px] ${className}`}
    >
      <div
        className={`bar w-full h-[2px] bg-base-content transition-all duration-300 ease-in-out ${
          isActive ? "rotate-45 translate-y-[6px]" : ""
        }`}
      ></div>
      <div
        className={`bar w-full h-[2px] bg-base-content transition-all duration-300 ease-in-out ${
          isActive ? "opacity-0" : ""
        }`}
      ></div>
      <div
        className={`bar w-full h-[2px] bg-base-content transition-all duration-300 ease-in-out ${
          isActive ? "-rotate-45 -translate-y-[6px]" : ""
        }`}
      ></div>
    </div>
  );
};

export default NavHamburgerIcon;
