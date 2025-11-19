"use client";
import React, { useState, useEffect, useRef } from "react";
import SlideUp from "@/Components/animations/SlideUp";
import HelloIcon from "@/Components/Icons/HelloIcon";
import WhatsappIcon from "./Icons/WhatsappIcon";
import VehicalIcon from "@/Components/Icons/VehicleIcon";
import HomeIcon from "./Icons/HomeIcon";
import CleaningPersonIocn from "./Icons/CleaningPersonIocn";
import InfoIcon from "./Icons/InfoIcon";
import Star from "./Icons/Star";

const HowItWorksSection = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const processSteps = [
    {
      id: 1,
      // title: "Initial Contact and Booking",
      title: "Consultation & Scheduling",
      icon: WhatsappIcon,
      note: "• Customer contacts via phone, email, or website booking form\n• Assessment includes home size, service type, and frequency\n• Special requests and areas needing attention are noted\n• Quote is provided and accepted\n• Service is scheduled for convenient date and time",
    },
    {
      id: 2,
      // title: "Pre-Cleaning Preparation",
      title: "Pre-Visit Preparation",
      icon: VehicalIcon,
      note: "• Declutter: Pick up personal items, clothes, and toys\n• Clear surfaces: Remove dishes from sink and countertop\n• Provide access: Confirm entry method (key, code, or presence)\n• Special instructions: Communicate fragile items or areas to avoid\n• Ensure clear paths for efficient cleaning",
    },
    {
      id: 3,
      // title: "The Cleaning Session",
      title: "On-Site Cleaning Process",
      icon: CleaningPersonIocn,
      note: "• Initial walk-through to confirm scope and address questions\n• Systematic cleaning: top-down, back-to-front approach\n• Dusting: All surfaces, furniture, and fixtures\n• Kitchen & Bathroom: Focused scrubbing and sanitizing\n• Floors: Vacuum and mop all corners and edges\n• Finishing touches: Make beds, empty trash, arrange items",
    },
    {
      id: 4,
      // title: "Post-Cleaning",
      title: "Final Inspection & Follow-Up",
      icon: HomeIcon,
      note: "• Final inspection: Complete checklist verification\n• Quality check: Ensure high standards are met\n• Customer feedback: Follow-up for experience review\n• Payment processing: Digital payment options available\n• Schedule setup: For recurring services, establish consistent payment schedule",
    },
  ];

  // Intersection Observer to detect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset when out of view
          setIsVisible(false);
          setProgressWidth(0);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate progress when visible
  useEffect(() => {
    if (!isVisible) return;

    setProgressWidth(0); // Reset to 0 before starting animation

    const progressInterval = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / 120; // Complete in ~12 seconds
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isVisible]);

  // Step position along the line (percentage)
  const getStepPosition = (index, totalSteps) =>
    (index / (totalSteps - 1)) * 100;

  return (
    <section className="relative text-white bg-primary overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto ">
        <div className="relative min-h-[55rem] flex items-center justify-center">
          <div className="text-white py-8 lg:py-16 relative ">
            {/* Process Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center w-full mb-4">
                <SlideUp delay={0.05}>
                  <div className="flex flex-col items-center justify-center gap-2 z-50 text-tertiary  text-lg">
                    <div className="flex items-center justify-center gap-2 md:mb-6">
                      <span className="inline-block z-50">
                        <HelloIcon color="#B5DDC2" />
                      </span>
                      <span className="text-tertiary font-serif z-50">
                        How it works
                      </span>
                    </div>

                    <span className="z-50 text-3xl z-50 lg:text-5xl xl:text-6xl text-[#FAFFFA] leading-[1.1] tracking-[-0.02em] font-semibold font-serif">
                      {/* Behind Every Shine, There's a System */}Precision
                      cleaning, Powered By Process
                    </span>
                  </div>
                </SlideUp>
              </div>
            </div>

            {/* Process Steps */}
            <div className="relative md:w-[65rem] 2xl:w-[90rem] mx-auto">
              {/* Progress Line - Desktop */}
              <div className="absolute top-22 left-24 right-24 h-1 z-10 bg-white/20 rounded-full hidden lg:block">
                <div
                  className="h-full bg-gradient-to-r from-tertiary to-[#B5DDC2] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
              {/* Steps Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-">
                {processSteps.map((step, index) => {
                  const stepPos = getStepPosition(index, processSteps.length);
                  const active = progressWidth >= stepPos;

                  return (
                    <div
                      className="flex flex-col items-center text-center relative"
                      key={step.id}
                    >
                      {/* Step Icon */}
                      <div
                        className="relative mb-4 lg:mb-6 z-20 bg-primary p-1 lg:p-2 rounded-full border-2 transition-colors duration-500"
                        style={{
                          borderColor: active
                            ? "#A8D5BA"
                            : "rgba(245, 249, 246, 1)",
                        }}
                      >
                        <div
                          className="w-24 h-24 lg:w-38 lg:h-38 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500"
                          style={{
                            background: active
                              ? "linear-gradient(to right, #A8D5BA, #B5DDC2)"
                              : " rgba(245, 249, 246, 1)",
                          }}
                        >
                          <step.icon
                            className={
                              active
                                ? "w-6 h-6 lg:w-10 lg:h-10 text-primary"
                                : "w-6 h-6 lg:w-10 lg:h-10 text-white"
                            }
                          />
                        </div>
                      </div>
                      <div className=" flex items-center justify-center">
                        <p className="text-sm z-50 md:w-5/6 text-center lg:text-xl mb-2 text-white font-medium">
                          {step.title}
                        </p>
                        <div className="absolute 2xl:bottom-0 md:bottom-0 bottom-11 2xl:right-16 md:right-7 right-4 z-50 group">
                          <div className="relative inline-block">
                            <InfoIcon />
                            <div className="invisible opacity-0 group-hover:visible  group-hover:opacity-100 transition-opacity duration-200 absolute top-11 left-1/2 transform -translate-x-1/2 w-64 md:w-80 bg-white text-primary shadow-xl text-xs p-4 rounded-lg shadow-xl border border-gray-200 z-50 whitespace-pre-line leading-relaxed text-left">
                              {step.note}
                              <span className="absolute bottom-full left-1/2  transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-200"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute -right-7 -bottom-8">
        <div className="absolute bottom-26 right-5 md:right-12 select-none z-50">
          <Star size={42} color="#ffffff" />
        </div>
        <div className=" select-none z-50 rotate-45">
          <Star size={122} color="#ffffff" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
