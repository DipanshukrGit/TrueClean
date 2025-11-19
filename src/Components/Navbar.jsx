"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/Components/Icons/Logo";
import PrimaryButton from "@/Components/PrimaryButton";
import { useNavigateToSection } from "@/utils/navigation";
import Star from "./Icons/Star";

import DropdownArrowIcon from "./Icons/DropdownArrowIcon";
import MobileMenuIcon from "./Icons/MobileMenuIcon";
import ThemeToggle from "@/Components/ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const navigateToSection = useNavigateToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mobileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    setIsLoggedIn(!!token);
  }, []);

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
            <Link
              href="/about"
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
            </Link>
            <Link
              href="/services"
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
            </Link>
          </div>

          {/* Contact Us Button - Desktop Only */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isLoggedIn && (
              <Link
                href="/bookings"
                className="flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal transition-all duration-300 group relative hover:text-[var(--nav-link-hover)] px-4 py-2 rounded-lg hover:bg-[var(--nav-surface-hover)]"
              >
                <div className="flex items-center">
                  <Star
                    size={16}
                    color="var(--nav-star)"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="transition-all duration-300 transform group-hover:translate-x-2">
                    My Bookings
                  </span>
                </div>
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                href="/login"
                className="flex items-center gap-0 font-work-sans cursor-pointer text-lg font-semibold transition-all duration-300 group relative px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
              >
                <div className="flex items-center">
                  <span className="transition-all duration-300">
                    Login
                  </span>
                </div>
              </Link>
            )}
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
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
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
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal py-2 text-[var(--nav-link)] transition-all duration-300 group relative hover:text-[var(--nav-link-hover)]"
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
              </Link>
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
              {isLoggedIn && (
                <Link
                  href="/bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block flex items-center gap-0 font-work-sans cursor-pointer text-lg font-normal py-2 text-[var(--nav-link)] transition-all duration-300 group relative hover:text-[var(--nav-link-hover)]"
                >
                  <div className="flex items-center">
                    <Star
                      size={16}
                      color="var(--nav-star)"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                    />
                    <span className="transition-all duration-300 transform group-hover:translate-x-2">
                      My Bookings
                    </span>
                  </div>
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg mt-4"
                >
                  Login
                </Link>
              )}
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
