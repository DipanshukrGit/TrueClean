"use client";

import React, { useEffect } from "react";

const SuccessPopup = ({ isOpen, onClose }) => {
  // Auto close after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop - Green overlay with blur */}
      <div
        className="absolute inset-0 success-popup-overlay transition-colors duration-300"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div
        className={`relative bg-[var(--success-popup-bg)] border border-[var(--success-popup-border)] rounded-2xl shadow-2xl max-w-md w-11/12 mx-4 p-8 text-center transition-all duration-300 transform ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Success Icon */}
        <div
          className={`flex justify-center mb-6 transition-all duration-500 delay-100 ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <svg
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="27"
              cy="27"
              r="27"
              fill="var(--success-popup-icon-bg)"
            />
            <path
              d="M27 13L29.9579 18.4084C31.2585 20.7863 33.2137 22.7415 35.5916 24.0421L41 27L35.5916 29.9579C33.2137 31.2585 31.2585 33.2137 29.9579 35.5916L27 41L24.0421 35.5916C22.7415 33.2137 20.7863 31.2585 18.4084 29.9579L13 27L18.4084 24.0421C20.7863 22.7415 22.7415 20.7863 24.0421 18.4084L27 13Z"
              fill="var(--success-popup-icon-fg)"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div
          className={`space-y-4 transition-all duration-500 delay-200 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-2xl font-bold text-[var(--success-popup-title)] transition-colors duration-300">
            Thank You!
          </h3>
          <p className="text-[var(--success-popup-subtext)] leading-relaxed transition-colors duration-300">
            Our team will be contact you soon
          </p>
        </div>

        {/* WhatsApp Contact Button */}
        <div
          className={`mt-6 transition-all duration-500 delay-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              // Frontend only - no redirect to WhatsApp
            }}
            className="inline-flex items-center gap-3 bg-[var(--success-popup-button-bg)] border-2 border-[var(--success-popup-button-border)] text-[var(--success-popup-button-text)] px-6 py-3 rounded-full hover:bg-[var(--success-popup-button-hover)] transition-colors duration-200 cursor-pointer"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_835_3608)">
                <path d="M0.610234 12.4048C0.609672 14.4212 1.14067 16.3902 2.15036 18.1256L0.513672 24.0551L6.62917 22.464C8.32065 23.3777 10.2158 23.8564 12.1417 23.8566H12.1467C18.5044 23.8566 23.6797 18.7233 23.6824 12.4138C23.6836 9.35638 22.4847 6.48141 20.3065 4.31843C18.1287 2.15564 15.2323 0.96392 12.1463 0.962524C5.78786 0.962524 0.612953 6.09555 0.610328 12.4048" fill="url(#paint0_linear_835_3608)"/>
                <path d="M0.197969 12.401C0.197313 14.49 0.747344 16.5294 1.79303 18.3269L0.0976562 24.469L6.43244 22.8209C8.17787 23.7652 10.1431 24.263 12.1427 24.2638H12.1479C18.7337 24.2638 24.0948 18.9458 24.0977 12.4105C24.0988 9.24322 22.8568 6.2649 20.6008 4.02443C18.3445 1.78425 15.3445 0.549642 12.1479 0.54834C5.56103 0.54834 0.200594 5.86555 0.197969 12.401ZM3.97056 18.0174L3.73403 17.6448C2.73972 16.0761 2.21491 14.2632 2.21566 12.4017C2.21772 6.96964 6.67309 2.5502 12.1517 2.5502C14.8048 2.55132 17.2982 3.57755 19.1735 5.4395C21.0488 7.30164 22.0807 9.77699 22.0801 12.4097C22.0776 17.8418 17.6222 22.2618 12.1479 22.2618H12.144C10.3615 22.2609 8.61334 21.7859 7.08878 20.8883L6.72597 20.6749L2.96678 21.6528L3.97056 18.0174Z" fill="url(#paint1_linear_835_3608)"/>
                <path d="M9.16148 7.4458C8.9378 6.9525 8.70239 6.94255 8.48967 6.93389C8.31548 6.92645 8.11636 6.92701 7.91742 6.92701C7.7183 6.92701 7.39477 7.00134 7.1213 7.29762C6.84755 7.59417 6.07617 8.31083 6.07617 9.76841C6.07617 11.226 7.14614 12.6347 7.2953 12.8326C7.44464 13.0301 9.36089 16.117 12.3958 17.3045C14.918 18.2914 15.4313 18.0951 15.9787 18.0456C16.5262 17.9963 17.7453 17.3292 17.994 16.6373C18.243 15.9456 18.243 15.3527 18.1683 15.2288C18.0937 15.1053 17.8946 15.0312 17.596 14.8831C17.2974 14.735 15.8294 14.0182 15.5557 13.9193C15.282 13.8205 15.0829 13.7712 14.8838 14.0678C14.6847 14.364 14.1129 15.0312 13.9386 15.2288C13.7645 15.4268 13.5902 15.4515 13.2917 15.3033C12.993 15.1546 12.0314 14.8422 10.8905 13.833C10.0029 13.0477 9.40364 12.0779 9.22945 11.7812C9.05527 11.4851 9.2108 11.3245 9.36052 11.1769C9.49467 11.0441 9.6592 10.8309 9.80864 10.658C9.95752 10.485 10.0072 10.3615 10.1068 10.1639C10.2064 9.96617 10.1565 9.79315 10.082 9.64497C10.0072 9.49678 9.42698 8.03157 9.16148 7.4458Z" fill="white"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_835_3608" x1="1158.95" y1="2310.22" x2="1158.95" y2="0.962524" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1FAF38"/>
                  <stop offset="1" stopColor="#60D669"/>
                </linearGradient>
                <linearGradient id="paint1_linear_835_3608" x1="1200.1" y1="2392.61" x2="1200.1" y2="0.54834" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F9F9F9"/>
                  <stop offset="1" stopColor="white"/>
                </linearGradient>
                <clipPath id="clip0_835_3608">
                  <rect width="24" height="24" fill="white" transform="translate(0.0976562 0.54834)"/>
                </clipPath>
              </defs>
            </svg>
            Talk Now
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:opacity-80 transition-opacity transition-colors duration-200 text-[var(--success-popup-close)]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="currentColor"
            />
            <path
              d="M13.0594 12L15.3594 9.69998C15.6494 9.40998 15.6494 8.92999 15.3594 8.63999C15.0694 8.34999 14.5894 8.34999 14.2994 8.63999L11.9994 10.94L9.69937 8.63999C9.40937 8.34999 8.92937 8.34999 8.63938 8.63999C8.34938 8.92999 8.34938 9.40998 8.63938 9.69998L10.9394 12L8.63938 14.3C8.34938 14.59 8.34938 15.07 8.63938 15.36C8.78938 15.51 8.97937 15.58 9.16937 15.58C9.35937 15.58 9.54937 15.51 9.69937 15.36L11.9994 13.06L14.2994 15.36C14.4494 15.51 14.6394 15.58 14.8294 15.58C15.0194 15.58 15.2094 15.51 15.3594 15.36C15.6494 15.07 15.6494 14.59 15.3594 14.3L13.0594 12Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
