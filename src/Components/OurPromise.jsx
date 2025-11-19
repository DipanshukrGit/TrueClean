"use client";
import React from "react";
import SlideUp from "@/Components/animations/SlideUp";
import HelloIcon from "./Icons/HelloIcon";
import PersoneIcon from "./Icons/PersoneIcon";
import EcoFrinedlyIcon from "./Icons/EcoFrinedlyIcon";
import ChecklistIocn from "./Icons/ChecklistIocn";
import PricingIcon from "./Icons/PricingIcon";
import Star from "./Icons/Star";

const OurPromise = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAFFFA]">
      <div className="container w-11/12 sm:w-10/12 mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="relative flex flex-col-reverse md:flex-row gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <SlideUp delay={0.05}>
              {/* Stars - Hidden on mobile for cleaner look */}
              <div className="absolute top-8 right-46 select-none hidden lg:block">
                <Star size={42} color="#01502E" />
              </div>
              <div className="absolute top-3 right-43 select-none hidden lg:block">
                <Star size={25} color="#01502E" />
              </div>

              {/* Green decorative shape background with cut corners */}
              <div
                className="absolute -top-6 lg:top-18 rounded-xl bg-primary w-68 h-68 md:w-[32rem] md:h-[32rem] transform z-0"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - 150px) 0%, 100% 150px, 100% 100%, 140px 100%, 0% calc(100% - 140px))",
                }}
              ></div>

              {/* Main beige background shape with cut corners */}
              <div
                className="relative rounded-xl w-72 h-72 sm:w-96 sm:h-96 lg:w-[35rem] lg:h-[35rem] z-10"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - 100px) 0%, 100% 100px, 100% 100%, 60px 100%, 0% calc(100% - 60px))",
                }}
              >
                {/* Cleaning equipment illustration */}
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src="/Images/promisesection.webp"
                    alt="Cleaning Equipment"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Side - Content */}
          <div className=" order-1 lg:order-2 text-center lg:text-left">
            {/* Header with Hello Icon */}
            <SlideUp delay={0.1}>
              <div className="flex items-center gap-3  justify-start lg:justify-start">
                <div className="p-2">
                  <HelloIcon />
                </div>
                <span className="text-[#00603A] font-semibold font-serif text-lg">
                  Our Promise
                </span>
              </div>
            </SlideUp>

            {/* Main Heading */}
            <div className="space-y-4 ">
              <SlideUp delay={0.15}>
                <h2 className="text-3xl sm:text-5xl text-left lg:text-5xl xl:text-6xl font-semibold font-serif text-[#1a1a1a] leading-[1.5] md:leading-tight">
                  {/* A Cleaner Home A Healthier Life */}
                  From Clean Homes to Healthy Lives.
                </h2>
              </SlideUp>

              <SlideUp delay={0.2}>
                <p className="text-[#666666] text-left text-base text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {/* At True Clean, we're committed to making your home a healthy
                  place with our reliable, safe, and ready cleaning services—all
                  with a friendly smile. */}
                  Keep your home genuinely healthy with True Clean. We bring
                  hotel-grade results to your home with eco-friendly products,
                  on-time teams, and professional polish.
                </p>
              </SlideUp>
            </div>

            {/* Features Grid - Responsive layout */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-6 ">
              {/* Feature 1 - Trained & Trusted Staff */}
              <SlideUp delay={0.25}>
                <div className="flex flex-row items-center sm:items-start gap-3 sm:gap-4 justify-center sm:justify-start lg:justify-start">
                  <div className="p-2 sm:p-3 lg:p-4 bg-[#E8F5E8] rounded-full flex-shrink-0">
                    <PersoneIcon />
                  </div>
                  <div className="pt-0 sm:pt-2 text-left sm:text-left">
                    <h3 className="font-[500] text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                      Trained & Trusted <br /> Staff
                    </h3>
                  </div>
                </div>
              </SlideUp>

              {/* Feature 2 - Eco-friendly Cleaning */}
              <SlideUp delay={0.3}>
                <div className="flex flex-row items-center sm:items-start gap-3 sm:gap-4 justify-center sm:justify-start lg:justify-start">
                  <div className="p-2 sm:p-3 lg:p-4 bg-[#E8F5E8] rounded-full flex-shrink-0">
                    <EcoFrinedlyIcon />
                  </div>
                  <div className="pt-0 sm:pt-2 text-left sm:text-left">
                    <h3 className="font-[500] text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                      Eco-friendly <br /> Cleaning
                    </h3>
                  </div>
                </div>
              </SlideUp>

              {/* Feature 3 - Standardized Checklist */}
              <SlideUp delay={0.35}>
                <div className="flex flex-row items-center sm:items-start gap-3 sm:gap-4 justify-center sm:justify-start lg:justify-start">
                  <div className="p-2 sm:p-3 lg:p-4 bg-[#E8F5E8] rounded-full flex-shrink-0">
                    <ChecklistIocn />
                  </div>
                  <div className="pt-0 sm:pt-2 text-left sm:text-left">
                    <h3 className="font-[500] text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                      Standardized <br /> Checklist
                    </h3>
                  </div>
                </div>
              </SlideUp>

              {/* Feature 4 - Transparent Pricing */}
              <SlideUp delay={0.4}>
                <div className="flex flex-row items-center sm:items-start gap-3 sm:gap-4 justify-center sm:justify-start lg:justify-start">
                  <div className="p-2 sm:p-3 lg:p-4 bg-[#E8F5E8] rounded-full flex-shrink-0">
                    <PricingIcon />
                  </div>
                  <div className="pt-0 sm:pt-2 text-left sm:text-left">
                    <h3 className="font-[500] text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                      Transparent <br /> Pricing
                    </h3>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPromise;
