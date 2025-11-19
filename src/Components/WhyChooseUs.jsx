"use client";
import React from "react";
import HelloIcon from "./Icons/HelloIcon";
import TickIcon from "./Icons/TickIcon";
import Star from "./Icons/Star";
import SlideUp from "./animations/SlideUp";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#FAFFFA] relative overflow-hidden">
      <div className="container mx-auto w-11/12 sm:w-10/12 px-2 md:px-6 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="space-y-3 sm:space-y-8 text-center lg:text-left">
            <SlideUp delay={0.05}>
              {/* Header with Hello Icon */}
              <div className="flex items-center gap-3 mb-3 sm:mb-8 justify-start lg:justify-start">
                <div className="p-2">
                  <HelloIcon />
                </div>
                <span className="text-[#00603A] font-semibold font-serif text-lg">
                  Why Choose Us
                </span>
              </div>
            </SlideUp>

            <SlideUp delay={0.1}>
              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-3xl lg:text-6xl text-left font-semibold font-serif text-[#1a1a1a] leading-[1.5] md:leading-tight">
                  {/* Why Families Rely on True Clean */}
                  True Clean: The Family Trusted Choice
                </h2>

                <p className="text-[#666666] text-base text-left sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {/* We fix what others miss—True Clean ensures reliable service,
                  premium tools, and trust you can count on, every single time. */}
                  From missed spots to flawless finishes—dependable service,
                  premium tooling, guaranteed confidence.
                </p>
              </div>
            </SlideUp>

            <SlideUp delay={0.15}>
              {/* Features List with Tick Icons - Mobile: 2x2 grid, Desktop: 2x2 side by side */}
              <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
                <div className="flex flex-row sm:justify-between sm:items-center w-full gap-4 sm:gap-4">
                  {/* Feature 1 */}
                  <div className="flex items-center gap-1 md:gap-4 w-1/2 justify-center sm:justify-start lg:justify-start">
                    <div className="flex items-start h-full pt-1 md:pt-0">
                      <TickIcon />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                        {/* Premium cleaning <br /> tools and products */}
                        Pro-grade tools & <br />  eco-safe product
                      </h3>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-center gap-3 sm:gap-4 w-1/2 justify-center sm:justify-start lg:justify-start">
                    <div className="flex items-start h-full pt-1 md:pt-0">
                      <TickIcon />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                        {/* Transparent pricing <br /> earlier */}
                        Clear & upfront <br /> pricing
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:justify-between sm:items-center gap-1 md:gap-4 w-full">
                  {/* Feature 3 */}
                  <div className="flex items-center gap-1 md:gap-4 w-1/2 justify-center sm:justify-start lg:justify-start">
                    <div className="flex items-start h-full pt-1 md:pt-0">
                      <TickIcon />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                        {/* Consistent quality for
                        <br /> every nook and cranny */}
                        Consistent quality <br />  in every corner
                      </h3>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-center gap-3 sm:gap-4 w-1/2 justify-start sm:justify-start lg:justify-start">
                    <div className="flex h-full items-start">
                      <TickIcon />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-[#1a1a1a] text-xs sm:text-base lg:text-lg leading-[1.35]">
                        {/* Book online or <br /> WhatsApp */}
                        Book online or <br /> via WhatsApp
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Side - Image */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-start">
            <SlideUp delay={0.2}>
              {/* Green decorative shape background with cut corners */}
              <div
                className="absolute bottom-12  md:bottom-20 left-14 md:left-16 rounded-xl bg-primary w-64 h-64 sm:w-80 sm:h-80 lg:w-[32rem] lg:h-[32rem] transform z-0
                 [--cut-size:60px] sm:[--cut-size:80px] lg:[--cut-size:160px]"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - var(--cut-size)) 0%, 100% var(--cut-size), 100% 100%, var(--cut-size) 100%, 0% calc(100% - var(--cut-size)))",
                }}
              ></div>

              {/* Main image container with cut corners */}
              <div
                className="relative rounded-xl w-72 h-72 sm:w-96 sm:h-96 lg:w-[35rem] lg:h-[35rem] z-10
                 [--cut-size:50px] sm:[--cut-size:70px] lg:[--cut-size:100px]"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - var(--cut-size)) 0%, 100% var(--cut-size), 100% 100%, var(--cut-size) 100%, 0% calc(100% - var(--cut-size)))",
                }}
              >
                {/* Cleaning professional image */}
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src="/Images/chooseussection.png"
                    alt="True Clean Professional"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </SlideUp>
            <div className="absolute md:top-5 md:right-5 -right-0 -top-5 select-none ">
              <div className="relative">
                <div className="absolute -top-3 left-8 select-none">
                  <Star size={22} color="#01502E" />
                </div>
                <div className="">
                  <Star size={42} color="#01502E" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
