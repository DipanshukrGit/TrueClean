"use client";
import React, { useState, useRef, useEffect } from "react";
import HelloIcon from "./Icons/HelloIcon";
import PrimaryButton from "@/Components/PrimaryButton";
import SlideUp from "@/Components/animations/SlideUp";
import DropdownArrowIcon from "@/Components/Icons/DropdownArrowIcon";
import SuccessPopup from "@/Components/SuccessPopup";
import { useFormLoading } from "@/hooks/useLoadingManager";

const ContactUs = () => {
  const { handleFormSubmit } = useFormLoading();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const formatService = (value) => {
    if (!value) return "";
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [sliderPosition, setSliderPosition] = useState(15); // Start at left (showing dirty room)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Calculate opacity for fade effect
  const getImageOpacity = (position) => {
    // The fade transition happens between 20% and 80% of the slider
    const fadeStart = 20;
    const fadeEnd = 80;

    if (position <= fadeStart) {
      // Fully show dirty room (before image)
      return { before: 1, after: 0 };
    } else if (position >= fadeEnd) {
      // Fully show clean room (after image)
      return { before: 0, after: 1 };
    } else {
      // Fade transition between the two images
      const fadeProgress = (position - fadeStart) / (fadeEnd - fadeStart);
      return {
        before: 1 - fadeProgress,
        after: fadeProgress,
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleFormSubmit(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            service: formatService(formData.service),
            message: formData.message,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to submit form");
        }

        // Show popup on success
        setShowSuccessPopup(true);

        // Reset form after successful submission
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
      } catch (error) {
        console.error("Error submitting contact form:", error);
        // You can add error handling UI here if needed
        throw error;
      }
    }, "Sending your message...");
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.type === "mousemove") return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPosition(percentage);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e) => {
    if (!isDragging && e.type === "touchmove") return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // Get current opacity values for both images
  const { before: beforeOpacity, after: afterOpacity } =
    getImageOpacity(sliderPosition);

  return (
    <section id="contact-us" className=" bg-[#FAFFFA] py-12 md:py-20">
      <div className="container mx-auto w-10/12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left Side - Before/After Image Slider */}
          <SlideUp delay={0.15}>
            <div className="relative">
              <div
                ref={containerRef}
                className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Before Image (Dirty Room) - Base Layer */}
                <div className="absolute inset-0">
                  <img
                    src="/Images/contactus1.webp"
                    alt="Room Before Cleaning"
                    className="w-full h-full object-cover transition-opacity duration-300 ease-out"
                    style={{
                      opacity: beforeOpacity,
                    }}
                    draggable={false}
                  />
                </div>

                {/* After Image (Clean Room) - Overlay Layer */}
                <div className="absolute inset-0">
                  <img
                    src="/Images/contactus2.webp"
                    alt="Room After Cleaning"
                    className="w-full h-full object-cover transition-opacity duration-300 ease-out"
                    style={{
                      opacity: afterOpacity,
                    }}
                    draggable={false}
                  />
                </div>

                {/* Labels */}
                <div
                  className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold transition-opacity duration-300"
                  style={{ opacity: beforeOpacity }}
                >
                  BEFORE
                </div>
                <div
                  className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold transition-opacity duration-300"
                  style={{ opacity: afterOpacity }}
                >
                  AFTER
                </div>

                {/* Slider Track Line */}
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center pointer-events-none">
                  <div className="w-full h-0.5 bg-white bg-opacity-30 relative">
                    {/* Active portion of the track */}
                    <div
                      className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-out"
                      style={{ width: `${sliderPosition}%` }}
                    />
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-100 ease-out pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-10 h-10 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:scale-110 transition-transform cursor-grab active:cursor-grabbing pointer-events-auto">
                    <div className="flex space-x-0.5">
                      <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
                      <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                </div>


                {/* Instruction Text */}
                {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                  Drag to see the transformation
                </div> */}
              </div>

              {/* Fallback for when images are not available */}
              <div
                className="absolute inset-0 bg-gray-200 rounded-lg hidden"
                id="fallback"
              >
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p className="text-center">
                    Add your before/after images:
                    <br />
                    - /Images/contactus.webp (dirty room)
                    <br />- /Images/story.png (clean room)
                  </p>
                </div>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.25}>
            {/* Right Side - Contact Form */}
            <div className="space-y-8">
              {/* Header with Hello Icon */}
              <div className="flex items-center gap-3 md:mb-8">
                <div className="p-2">
                  <HelloIcon />
                </div>
                <span className="text-[#00603A] font-semibold font-serif text-lg">
                  Contact Us
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-5xl font-semibold font-serif text-[#1a1a1a] leading-tight">
                  {/* Let's Talk With Us */}Consult with Our Cleaning Expert
                </h2>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#B5DDC2] rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-[#00603A] placeholder-gray-400 bg-[#FAFFFA]"
                    required
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#B5DDC2] rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-[#00603A] placeholder-gray-400 bg-[#FAFFFA]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#B5DDC2] rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-[#00603A] placeholder-gray-400 bg-[#FAFFFA]"
                    required
                  />
                </div>

                {/* Service Dropdown */}
                <div className="relative rounded-lg">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3  border border-[#B5DDC2] rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-[#00603A] appearance-none bg-[#FAFFFA]"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="recurring-standard">
                      Recurring Services
                    </option>
                    <option value="recurring-maid">Specialty Services</option>
                    <option value="recurring-maid">Task-Based Services</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <DropdownArrowIcon className="w-5 h-5" color="#00603A" />
                  </div>
                </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your space, preferences or special requests"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#B5DDC2] rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-[#00603A] placeholder-gray-400 bg-[#FAFFFA] resize-y"
                />
              </div>

                <div className="flex flex-col items-center w-full space-y-4">
                  {/* Submit Button */}
                  <div className="w-full flex justify-start">
                    <PrimaryButton
                      type="submit"
                      variant="secondary"
                      className="w-full cursor-pointer"
                    >
                      Book Your Cleaning
                    </PrimaryButton>
                  </div>

                </div>
              </form>
            </div>
          </SlideUp>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
    </section>
  );
};

export default ContactUs;
