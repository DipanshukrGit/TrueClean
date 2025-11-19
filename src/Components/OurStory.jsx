"use client";
import React from "react";
import HelloIcon from "./Icons/HelloIcon";
import SlideUp from "@/Components/animations/SlideUp";

const OurStory = () => {
  return (
    <section className=" relative  bg-[#FAFFFA] my-14 md:py-10">
      {/* Green background with cut on bottom left */}
      <div
        className="absolute inset-0 top-[38%] bg-tertiary md:mx-1
             [--cut-size:30px] 
             md:[--cut-size:99px]"
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, var(--cut-size) 100%, 0% calc(100% - var(--cut-size)))",
        }}
      ></div>

      <div className="container w-11/12 md:w-10/12 mx-auto  md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-12 items-center">
          <div className="md:hidden block">
            <SlideUp delay={0.25}>
              <div className=" md:hidden block ">
                <div className="flex items-center gap-3 ">
                  <div className="p-2">
                    <HelloIcon />
                  </div>
                  <div className="text-[#00603A] font-semibold font-serif text-lg">
                    Our Story
                  </div>
                </div>
              </div>
              <h2 className="md:hidden block text-3xl lg:text-5xl font-semibold font-serif text-[#1a1a1a] leading-tight">
                {/* Born from the Mess.
                <br />
                Built on Trust. */}
                Smarter Clean. <br /> Deeper Trust.
              </h2>
            </SlideUp>
          </div>
          {/* Left Side - Image */}
          <SlideUp delay={0.25}>
            <div className="relative">
              {/* Image container with cut on top right */}
              <div
                className="relative w-full md:p-8"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - 100px) 0%, 100% 100px, 100% 100%, 0% 100%)",
                }}
              >
                <img
                  src="/Images/story.webp"
                  alt="True Clean Family Story"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </SlideUp>
          {/* Right Side - Content */}
          <SlideUp delay={0.25}>
            <div className="flex flex-col justify-between items-betweeen w-full md:space-y-12">
              {/* Header with Hello Icon */}
              <div className="text-left w-full hidden md:!block  ">
                <div className="flex items-center gap-3 ">
                  <div className="p-2">
                    <HelloIcon />
                  </div>
                  <div className="text-[#00603A] font-semibold font-serif text-lg">
                    Our Story
                  </div>
                </div>
                <h2 className="hidden md:!block text-3xl lg:text-5xl font-semibold font-serif text-[#1a1a1a] leading-tight">
                  {/* Born from the Mess.
                  <br />
                  Built on Trust. */}
                  Smarter Clean. <br /> Deeper Trust.
                </h2>
              </div>

              {/* Main Heading */}

              <div className="w-full flex justify-end space-y-6">
                <p className="md:w-[80%] text-primary md:text-base text-sm leading-[2]  pb-8 md:pb-0 text-left md:text-left">
                  I founded TrueClean after a frustrating experience with
                  "premium" cleaning that was neither safe nor healthy.
                  TrueClean ensures every service uses non-toxic, eco-friendly
                  products, prioritizing safety for children, pets, and
                  sensitive individuals. Our vision redefines premium cleaning:
                  delivering spotless homes while fostering health, trust, and
                  peace of mind—because cleanliness should never compromise
                  well-being.
                  {/* A couple of years ago, a "premium" clean left our founder with
                  an overwhelming chemical smell and a massive allergic
                  reaction. This left one thing glaringly clear: spotless does
                  not mean at the expense of your health. Trueclean was born to
                  solve that gap. We created a service that treats your indoor
                  air like family - non-toxic, eco-friendly products, and a
                  methodical checklist for your home (room-by-room) so your home
                  looks spotless and feels safe to breathe. Today, our trained
                  teams are consistently offering the same standard: health
                  before cleaning, clear pricing, and to be a trustworthy
                  provider of the outcome you see fit (from nurseries and pet
                  areas to active kitchens or sensitive spaces). On behalf of
                  Trueclean, we clean with intention - we don't compromise. To
                  us, being premium means clean, shining surfaces, and peace of
                  mind how you have to navigate with your loved ones. That's how
                  we take a painful experience and turned it into a health
                  commitment: cleaner and safer living spaces, keeping your
                  family first, your time valuable, and your air safe. */}
                </p>
              </div>

              {/* Decorative dots */}
              {/* <div className="flex gap-2 mt-8">
              <div className="w-2 h-2 bg-[#00603A] rounded-full"></div>
              <div className="w-2 h-2 bg-[#A8D5BA] rounded-full"></div>
              <div className="w-2 h-2 bg-[#A8D5BA] rounded-full"></div>
            </div> */}
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
