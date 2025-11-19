"use client";
import React, { useState, useRef, useEffect } from "react";
import Logo from "@/Components/Icons/Logo";
import PrimaryButton from "@/Components/PrimaryButton";
import { useNavigateToSection } from "@/utils/navigation";
import Star from "./Icons/Star";

import DropdownArrowIcon from "./Icons/DropdownArrowIcon";
import MobileMenuIcon from "./Icons/MobileMenuIcon";
import ThemeToggle from "@/Components/ThemeToggle";

const Navbar = () => {
  const navigateToSection = useNavigateToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset services dropdown when closing mobile menu
    if (isMobileMenuOpen) {
      setIsMobileServicesOpen(false);
    }
  };

  const handleHomeClick = () => {
    // Just scroll to top - we're on landing page only
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = () => {
    // Just scroll to services section - no routing needed for landing page
    navigateToSection("services-section");
    setIsServicesDropdownOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileMenuOpen(false);
  };



  // Click outside detection for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav ref={navbarRef} className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-[1074px] mx-auto pt-[2.3rem] px-4">
        <div className="bg-[var(--nav-surface)] border border-[var(--nav-border)] rounded-full px-7 py-1.5 flex items-center justify-between transition-colors duration-300">
          {/* Logo Section */}
          <div className="flex items-center">
            <div
              onClick={handleHomeClick}
              className="w-24 h-10 flex items-center cursor-pointer"
            >
              <Logo />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-[var(--nav-link)]">
            <a
              onClick={handleHomeClick}
              className="flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal transition-all duration-300 group relative hover:text-[var(--nav-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
            >
              <div className="flex items-center">
                <Star
                  size={16}
                  color="var(--nav-star)"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                />
                <span className="transition-all duration-300 transform group-hover:translate-x-2">
                  Home
                </span>
              </div>
            </a>
            <a
              onClick={() => navigateToSection("our-story")}
              className="flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal transition-all duration-300 group relative hover:text-[var(--nav-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
            >
              <div className="flex items-center">
                <Star
                  size={16}
                  color="var(--nav-star)"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                />
                <span className="transition-all duration-300 transform group-hover:translate-x-2">
                  About
                </span>
              </div>
            </a>
            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <a
                onClick={() => navigateToSection("services-section")}
                className="flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal transition-all duration-300 group relative hover:text-[var(--nav-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
              >
                <div className="flex items-center">
                  <Star
                    size={16}
                    color="var(--nav-star)"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="transition-all duration-300 transform group-hover:translate-x-2">
                    Services
                  </span>
                </div>
              </a>

              {/* Services Dropdown - Removed for landing page only */}
              {isServicesDropdownOpen && (
                <div className="">
                  <div className="h-2"></div>
                  <div className="absolute top-full left-0 z-50 w-80 bg-[var(--nav-surface)] border border-[var(--nav-border)] rounded-2xl shadow-lg py-4 px-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div
                      onClick={handleServiceClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[var(--nav-surface-hover)] transition-all duration-200 group"
                    >
                      <div className="flex-1">
                        <h3 className="text-[var(--nav-link)] font-semibold text-sm group-hover:text-[var(--nav-link-hover)] transition-colors duration-200">
                          View All Services
                        </h3>
                        <p className="text-[var(--nav-link-muted)] text-xs mt-1">
                          Explore our complete range of cleaning services
                        </p>
                      </div>
                      <Star
                        size={14}
                        color="var(--nav-star)"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Us Button - Desktop Only */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <div onClick={() => navigateToSection("contact-us")}>
              <PrimaryButton
                variant="secondary"
                href="#contact-us"
                className="cursor-pointer"
              >
                Contact Us
              </PrimaryButton>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle className="w-10 h-10" />
            <button
              onClick={toggleMobileMenu}
              className="text-[var(--nav-link)] p-2 transition-transform duration-200 hover:text-[var(--nav-link-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
              aria-label="Toggle mobile menu"
            >
              <MobileMenuIcon
                isOpen={isMobileMenuOpen}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu - Only shows when hamburger is clicked */}
        {isMobileMenuOpen && (
          <div className="w-full flex justify-end mt-4 pr-4">
            <div className="md:hidden w-[14rem] bg-[var(--nav-surface)] border border-[var(--nav-border)] rounded-2xl p-4 py-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-[var(--nav-border-muted)]">
                <span className="text-sm font-medium text-[var(--nav-link)]">
                  Appearance
                </span>
                <ThemeToggle className="w-10 h-10" />
              </div>
              <a
                onClick={() => {
                  handleHomeClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal py-2 text-[var(--nav-link)] transition-all duration-300 group relative hover:text-[var(--nav-link-hover)]"
              >
                <div className="flex items-center">
                  <Star
                    size={16}
                    color="var(--nav-star)"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="transition-all duration-300 transform group-hover:translate-x-2">
                    Home
                  </span>
                </div>
              </a>
              <a
                onClick={() => {
                  navigateToSection("our-story");
                  setIsMobileMenuOpen(false);
                }}
                className="block flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal py-2 text-[var(--nav-link)] transition-all duration-300 group relative hover:text-[var(--nav-link-hover)]"
              >
                <div className="flex items-center">
                  <Star
                    size={16}
                    color="var(--nav-star)"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="transition-all duration-300 transform group-hover:translate-x-2">
                    About
                  </span>
                </div>
              </a>
              <div>
                <a
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="block flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal py-2 text-[var(--nav-link)] transition-all duration-300 group relative hover:text-[var(--nav-link-hover)]"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Star
                        size={16}
                        color="var(--nav-star)"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                      />
                      <span className="transition-all duration-300 transform group-hover:translate-x-2">
                        Services
                      </span>
                    </div>
                    <div>
                      <DropdownArrowIcon
                        className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${
                          isMobileServicesOpen ? "rotate-90" : ""
                        }`}
                        color="var(--nav-link)"
                      />
                    </div>
                  </div>
                </a>

                {/* Mobile Services Submenu */}
                {isMobileServicesOpen && (
                  <div className="ml-6 mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <div
                      onClick={handleServiceClick}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--nav-surface-hover)] transition-all duration-200 border border-[var(--nav-border-muted)]"
                    >
                      <div>
                        <p className="text-[var(--nav-link)] font-medium text-sm">
                          View All Services
                        </p>
                        <p className="text-[var(--nav-link-muted)] text-xs">
                          See our complete service overview
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="pt-4">
              <div
                onClick={() => {
                  navigateToSection("contact-us");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 transition-all duration-200"
              >
                <PrimaryButton
                  variant="secondary"
                  className="cursor-pointer w-full"
                >
                  Contact Us
                </PrimaryButton>
              </div>
            </div> */}
              <a
                onClick={() => {
                  navigateToSection("contact-us");
                  setIsMobileMenuOpen(false);
                }}
                className="block flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal py-2 text-[var(--nav-link)] transition-all duration-300 group relative hover:text-[var(--nav-link-hover)]"
              >
                <div className="flex items-center">
                  <Star
                    size={16}
                    color="var(--nav-star)"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="transition-all duration-300 transform group-hover:translate-x-2">
                    Contact Us
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
