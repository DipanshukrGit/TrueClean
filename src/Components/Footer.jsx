"use client";
import React from "react";
import Logo from "./Icons/Logo";
import BubbulIcon from "./Icons/BubbulIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import FaceBookIcon from "./Icons/FaceBookIcon";
import PhoneIcon from "./Icons/PhoneIcon";
import EmailIcon from "./Icons/EmailIcon";
import LocationIcon from "./Icons/LocationIcon";
import Star from "./Icons/Star";
import TrueClean from "./Icons/TrueClean";
import { useNavigateToSection } from "@/utils/navigation";

const Footer = () => {
  const navigateToSection = useNavigateToSection();

  return (
    <div className="bg-primary flex justify-center">
      <div
        className=" container relative overflow-hidden"
        style={{
          clipPath:
            "polygon(0% 0%, calc(100% - 150px) 0%, 100% 150px, 100% 100%, 0% 100%)",
        }}
      >
        {/* Decorative Bubbles */}
        <div className="absolute md:bottom-8 md:left-16 left-8 bottom-4 md:w-16 md:h-16 w-8 h-8 ">
          <BubbulIcon />
        </div>
        <div className="absolute md:bottom-22 md:left-12 left-6 bottom-12 md:w-12 md:h-12 w-6 h-6">
          <BubbulIcon />
        </div>
        <div className="absolute md:bottom-36 md:left-16 left-6 bottom-20  md:w-8 md:h-8 w-4 h-4 ">
          <BubbulIcon />
        </div>

        {/* Main Footer Content */}
        <div className=" mx-auto w-10/12 md:py-16 py-4 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-12 text-white">
            {/* Company Info */}
            <div className="space-y-6 md:w-3/12">
              <Logo color="#ffffff" />
              <p className="text-sm text-white/80 leading-relaxed ">
                {/* A leading provider of professional pest management solutions. */}
                Hygiene You Can Trust.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  aria-label="Follow us on Instagram"
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  aria-label="Follow us on Facebook"
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                >
                  <FaceBookIcon />
                </a>
              </div>
            </div>

            <div className="flex  flex-row md:justify-between md:w-4/12 gap-16 ">
              {/* Quick Links */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      onClick={() => navigateToSection("our-story")}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigateToSection("services-section")}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Services
                    </a>
                  </li>
                  {/* <li>
                    <a
                      onClick={() =>
                        smoothScrollToSection("our-story", 80, 1500)
                      }
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Process
                    </a>
                  </li> */}
                  <li>
                    <a
                      onClick={() => navigateToSection("contact-us")}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigateToSection("faq-section")}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Us */}
            <div className="space-y-6 md:w-3/12">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <PhoneIcon />
                  <span className="text-sm text-white/80">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <EmailIcon />
                  <span className="text-sm text-white/80">
                    contact@company.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <LocationIcon />
                  <span className="text-sm text-white/80">
                    123 Business Street, Suite 100<br />
                    City, State 12345
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative md:py-16 py-8">
          {/* Large Text */}
          <div className="container mx-auto md:w-10/12 w-8/12 relative z-10">
            <div className="text-center">
              <TrueClean />
            </div>
          </div>

          {/* Additional Decorative Circles */}
          {/* <div className="absolute md:bottom-8 bottom-4 left-md:left-4  w-4 h-4 rounded-full bg-white/20"></div> */}
          <div className="hidden md:!block absolute md:bottom-52 md:right-28 right-12 bottom-22 select-none ">
            <div className="relative">
              <div className="absolute -top-3 left-8 select-none">
                <Star size={22} color="#ffffff" />
              </div>
              <div className="">
                <Star size={42} color="#ffffff" />
              </div>
            </div>
          </div>
          <div className="block md:hidden absolute md:bottom-52 md:right-28 right-10 bottom-16 select-none ">
            <div className="relative">
              <div className="absolute -top-3 left-6 select-none">
                <Star size={18} color="#ffffff" />
              </div>
              <div className="">
                <Star size={32} color="#ffffff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
