import React from "react";

const MobileMenuIcon = ({
  className = "w-6 h-6",
  color = "currentColor",
  isOpen = false,
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${
        isOpen ? "rotate-90" : "rotate-0"
      } ${className}`}
    >
      <path
        d={
          isOpen
            ? "M18 6L6 18M6 6L18 18"
            : "M3 12H21M3 6H21M3 18H21"
        }
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MobileMenuIcon;
