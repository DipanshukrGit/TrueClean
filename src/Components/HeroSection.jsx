"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import SlideUp from "@/Components/animations/SlideUp";
import Star from "@/Components/Icons/Star";
import Yellowstart from "@/Components/Icons/yellowstart";
import PrimaryButton from "@/Components/PrimaryButton";
import HelloIcon from "@/Components/Icons/HelloIcon";
import { useNavigateToSection } from "@/utils/navigation";

const HeroSection = () => {
  const navigateToSection = useNavigateToSection();

  return (
    <section className="bg-primary flex justify-center md:pt-[140px] text-[#FAFFFA]">
      <div className="container px-6 sm:px-8">
        <Navbar />

        <div className="flex flex-col md:flex-row justify-between md:px-12 gap-10 lg:gap-24 items-center pt-10 pb-16">
          <div className="pt-24 md:pt-0">
            <SlideUp delay={0.05}>
              <div className="flex items-center gap-2 text-tertiary font-serif text-lg">
                <span className="inline-block ">
                  <HelloIcon color="#B5DDC2" />
                </span>
                <span className="italic text-sm md:text-lg ">
                  Welcome Our Eco Clean Services
                </span>
              </div>
            </SlideUp>

            <SlideUp delay={0.1}>
              <h1 className="hidden md:!block mt-4 text-4xl md:text-7xl leading-[1.2] font-serif font-bold tracking-[-0.02em] text-[#FAFFFA]">
                {/* Eco-Friendly Home
                <br />
                Cleaning */}
                Sustainable Sparkle <br /> for Your Home
              </h1>
              <h1 className="md:hidden block mt-4 text-4xl md:text-7xl leading-[1.2] font-serif font-bold tracking-[-0.02em] text-[#FAFFFA]">
                {/* Eco-Friendly <br /> Home Cleaning */}
                Sustainable Sparkle <br /> for Your Home
              </h1>
            </SlideUp>

            <SlideUp delay={0.15}>
              <p className="mt-5 max-w-[560px] font-work-sans text-base md:text-lg leading-7 text-[#E8F4EC]">
                Pro-grade methods, eco-friendly formulas, and respectful service
                for every corner of your home.
              </p>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div onClick={() => navigateToSection("contact-us")}>
                  <PrimaryButton
                    variant="primary"
                    href="#contact-us"
                    className="cursor-pointer"
                  >
                    Book Your Cleaning
                  </PrimaryButton>
                </div>

                <div className="hidden md:!block" onClick={() => navigateToSection("services-section")}>
                  <PrimaryButton
                    variant="secondary"
                    href="#services-section"
                    className="cursor-pointer w-full"
                  >
                    See Our Services
                  </PrimaryButton>
                </div>
              </div>
            </SlideUp>
          </div>

          <div>
            <SlideUp delay={0.25}>
              <div className="relative">
                {/* Small star */}
                <div className="hidden md:!block">
                  <div className="absolute -top-8 -left-10 md:-left-16 select-none">
                    <Star size={32} color="#ffffff" />
                  </div>
                  <div className="absolute top-2 md:-top-1 -left-8 select-none">
                    <Star size={22} color="#ffffff" />
                  </div>
                </div>
                <div className="block md:hidden">
                  <div className="absolute -top-6 -left-6 md:-left-16 select-none">
                    <Star size={26} color="#ffffff" />
                  </div>
                  <div className="absolute top-0 md:-top-1 -left-3 select-none">
                    <Star size={18} color="#ffffff" />
                  </div>
                </div>
                {/* Angular frame with clip-path - all divs have same cut */}
                <div className="relative flex justify-center">
                  <div
                    className="relative w-11/12 md:h-[35.2rem] md:w-[32rem] p-[2px] rounded-xl div1 
                                [--cut-size:85px] md:[--cut-size:140px] "
                    style={{
                      background: "linear-gradient(45deg, #A8D5BA, #B5DDC2)",
                      clipPath:
                        "polygon(0% 0%, calc(100% - var(--cut-size)) 0%, 100% var(--cut-size), 100% 100%, 0% 100%)",
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-xl bg-primary p-4 div2
                                 [--cut-size:85px] md:[--cut-size:140px] "
                      style={{
                        clipPath:
                          "polygon(0% 0%, calc(100% - var(--cut-size)) 0%, 100% var(--cut-size), 100% 100%, 0% 100%)",
                      }}
                    >
                      <div
                        className="relative overflow-hidden div3
                                   [--cut-size:85px] md:[--cut-size:130px] "
                        style={{
                          clipPath:
                            "polygon(0% 0%, calc(100% - var(--cut-size)) 0%, 100% var(--cut-size), 100% 100%, 0% 100%)",
                        }}
                      >
                        <Image
                          src="/Images/Herosection.webp"
                          alt="Happy cleaner"
                          width={640}
                          height={520}
                          className="block w-full h-full object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Big star
                <div className="absolute -top-12 -right-8 select-none">
                  <Star size={48} color="#B5DDC2" />
                </div> */}

                {/* Rating badge with SVG */}
                <div className="absolute bottom-8 -right-5 md:bottom-10 md:-right-12">
                  <div className="rounded-xl bg-[var(--card-surface)] text-[var(--foreground)] border border-[var(--border-muted)] shadow-md px-2 md:px-4 py-1 md:py-3 flex items-center gap-3 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 p-1 md:p-2 rounded-lg flex bg-primary items-center justify-center">
                      <Image
                        src="/Images/bestrated.svg"
                        alt="Best rated badge"
                        width={44}
                        height={44}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-xs md:text-base leading-5 italic">
                      <div className="font-bold font-serif">
                        #1 Best Rated
                      </div>
                      <div className="font-bold text-xs md:text-base font-serif">
                        Service Provider
                      </div>
                      <div className="text-[#FFCA28] flex gap-1">
                        <span className="md:w-6 md:h-6 w-4 h-4">
                          <Yellowstart />
                        </span>
                        <span className="md:w-6 md:h-6 w-4 h-4">
                          <Yellowstart />
                        </span>
                        <span className="md:w-6 md:h-6 w-4 h-4">
                          <Yellowstart />
                        </span>
                        <span className="md:w-6 md:h-6 w-4 h-4">
                          <Yellowstart />
                        </span>
                        <span className="md:w-6 md:h-6 w-4 h-4">
                          <Yellowstart />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
