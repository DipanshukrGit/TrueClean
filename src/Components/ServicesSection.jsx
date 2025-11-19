"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import SlideUp from "@/Components/animations/SlideUp";
import HelloIcon from "@/Components/Icons/HelloIcon";
import HowItworks from "@/Components/HowItworks";
import Star from "@/Components/Icons/Star";

const ServicesSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleServiceClick = () => {
    // Just scroll to services section - no routing needed for landing page
    const element = document.getElementById('services-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: "task-based",
      name: "Task-Based",
      description:
        "Customized cleaning tasks tailored to your specific needs and preferences.",
      image: "/Images/task-based.png",
    },
    {
      id: "specialty",
      name: "Specialty",
      description:
        "Specialized cleaning services for unique surfaces and delicate items.",
      image: "/Images/specialty.png",
    },
    {
      id: "recurring",
      name: "Recurring",
      description:
        "Regular cleaning schedules to maintain your home's pristine condition.",
      image: "/Images/recurring.webp",
    },
  ];

  // Auto-rotate carousel every 3 seconds - NATURAL DIRECTION (1→2, 2→3, 3→1)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + services.length) % services.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  // Calculate positions for horizontal carousel layout - 1ST AND 2ND IMAGES SAME SIZE, 3RD IS BIGGEST
  const getImageStyle = (index) => {
    const totalServices = services.length;
    const mediumWidth = 320; // Width for 1st and 2nd position images (same size)
    const activeWidth = 400; // Width for 3rd position image (largest)
    const spacing = 50; // Space between images

    // Calculate relative position from current center
    let relativePos = index - currentImageIndex;

    // Handle wrap-around positioning
    if (relativePos > totalServices / 2) {
      relativePos -= totalServices;
    } else if (relativePos < -totalServices / 2) {
      relativePos += totalServices;
    }

    if (relativePos === 0) {
      // 1st position - left image (medium size)
      return {
        transform: `translateX(-${
          mediumWidth / 2 + mediumWidth / 2 + spacing
        }px) scale(1)`,
        zIndex: 20,
        opacity: 1,
        filter: "brightness(0.95)",
        width: `${mediumWidth}px`,
        height: `${mediumWidth}px`,
      };
    } else if (relativePos === 1) {
      // 2nd position - center image (medium size, same as 1st)
      return {
        transform: "translateX(0px) scale(1)",
        zIndex: 20,
        opacity: 1,
        filter: "brightness(0.95)",
        width: `${mediumWidth}px`,
        height: `${mediumWidth}px`,
      };
    } else if (relativePos === 2 || relativePos === -1) {
      // 3rd position - right image (BIGGEST - this is the main focus)
      return {
        transform: `translateX(${
          mediumWidth / 2 + activeWidth / 2 + spacing
        }px) scale(1.1)`,
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
        width: `${activeWidth}px`,
        height: `${activeWidth}px`,
      };
    } else {
      // Hidden images
      return {
        transform: "translateX(0px) scale(0.6)",
        zIndex: 5,
        opacity: 0,
        filter: "brightness(0.7)",
        width: `${mediumWidth}px`,
        height: `${mediumWidth}px`,
      };
    }
  };

  // Get the index of the right (featured) image
  const getFeaturedImageIndex = () => {
    return (currentImageIndex + 2) % services.length;
  };

  return (
    <section className="relative bg-[#FAFFFA] text-[#2D2D2D] overflow-hidden">
      <div className="container mx-auto pt-6 lg:pt-24 z-20">
        {/* Services Header */}
        <div className="text-center">
          <SlideUp delay={0.05}>
            <div className="flex items-center justify-center gap-2 text-primary font-serif text-lg mb-6">
              <span className="inline-block">
                <HelloIcon />
              </span>
              <span className="text-[var(--accent-strong)] font-serif font-semibold text-lg">Our Services</span>
            </div>
          </SlideUp>

          <SlideUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl leading-[1.1] font-semibold font-serif tracking-[-0.02em] text-[#2D2D2D] mb-4">
              {/* Reliable Cleaning, */}Services Tailored
            </h2>
          </SlideUp>

          <SlideUp delay={0.15}>
            <h3 className="text-4xl md:text-6xl leadinb-[1.5] md:leading-[1.1] font-semibold tracking-[-0.02em] text-[#2D2D2D] mb-4">
              {" "}
              {/* Designed Around You */}To Your Needs
            </h3>
          </SlideUp>
        </div>

        {/* Horizontal Image Carousel Section */}
        <SlideUp delay={0.2}>
          <div className="relative ">
            <div className="flex items-center justify-center relative h-[450px] overflow-hidden">
              {services.map((service, index) => {
                const style = getImageStyle(index);
                const featuredIndex = getFeaturedImageIndex();
                const isFeatured = index === featuredIndex;

                return (
                  <div
                    key={service.id}
                    className="absolute transition-all duration-700 ease-in-out"
                    style={{
                      transform: style.transform,
                      zIndex: style.zIndex,
                      opacity: style.opacity,
                      filter: style.filter,
                      width: style.width,
                      height: style.height,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <div
                        className="w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer scale-105 transition-transform duration-300"
                        style={{
                          clipPath:
                            "polygon(0% 0%, calc(100% - 80px) 0%, 100% 80px, 100% 100%, 80px 100%, 0% calc(100% - 80px))",
                        }}
                        onClick={() => handleServiceClick(service.id)}
                      >
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute bottom-0  right-0 p-6 text-white">
                          <h4 className="text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">
                            {service.name}
                          </h4>
                          {/* Show description only on the featured (right/biggest) image */}
                          {/* {isFeatured && (
                            <p className="text-sm  leading-relaxed">
                              {service.description}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SlideUp>
      </div>

      {/* Background elements */}
      <div className="bg-primary h-[15rem] md:h-[15rem] z-[0] absolute bottom-0 w-full"></div>
    </section>
  );
};

export default ServicesSection;
