import React from "react";

const WhatsAppContactIcon = ({ className = "w-6 h-6", color = "currentColor" }) => {
  return (
    <svg 
      width="54" 
      height="54" 
      viewBox="0 0 54 54" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="27" cy="27" r="27" fill="#01502E"/>
      <path d="M27 13L29.9579 18.4084C31.2585 20.7863 33.2137 22.7415 35.5916 24.0421L41 27L35.5916 29.9579C33.2137 31.2585 31.2585 33.2137 29.9579 35.5916L27 41L24.0421 35.5916C22.7415 33.2137 20.7863 31.2585 18.4084 29.9579L13 27L18.4084 24.0421C20.7863 22.7415 22.7415 20.7863 24.0421 18.4084L27 13Z" fill="#FAFFFA"/>
    </svg>
  );
};

export default WhatsAppContactIcon;
