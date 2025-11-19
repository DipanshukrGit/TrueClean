"use client";
import React from "react";

const Star = ({ size = 24, color = "#A8D5BA", className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 0C16.4051 7.62709 22.3729 13.5949 30 15C22.3729 16.4051 16.4051 22.3729 15 30C13.5949 22.3729 7.62709 16.4051 0 15C7.62709 13.5949 13.5949 7.62709 15 0Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );
};

export default Star;


