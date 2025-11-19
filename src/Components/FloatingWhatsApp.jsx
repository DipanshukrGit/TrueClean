"use client";
import React from "react";
import Image from "next/image";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919316999874"; // Remove spaces and add country code
    const message = "Hello! I'm interested in your cleaning services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 cursor-pointer">
      <button
        onClick={handleWhatsAppClick}
        className="transition-all duration-300 p-2 md:p-3 bg-[#B5DDC2]  cursor-pointer rounded-full "
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="/Images/Whatsapp-Icon2.svg"
          alt="WhatsApp"
          width={32}
          height={32}
          className="w-8 md:w-12 h-8 md:h-12 cursor-pointer"
        />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
