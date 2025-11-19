import React from "react";
import Navbar from "@/Components/Navbar";
import HeroSection from "@/Components/HeroSection";
import OurPromise from "@/Components/OurPromise";
import WhyChooseUs from "@/Components/WhyChooseUs";
import OurStory from "@/Components/OurStory";
import TrustSection from "@/Components/TrustSection";
import FAQ from "@/Components/FAQ";
import ContactUs from "@/Components/ContactUs";
import OurServices from "@/Components/ServicesSection"
import HowItworks from "@/Components/HowItworks";
import Testimonials from "@/Components/Testimonials";
import Footer from "@/Components/Footer";
import BookingCalculator from "@/Components/BookingCalculator";
import ScrollToTop from "@/Components/ScrollToTop";

const Home = () => {
  return (
    <div className="relative bg-[#FAFFFA] overflow-x-hidden">
      {/* <div>
        <Navbar />
      </div> */}
      <HeroSection />
      <OurPromise />
      <TrustSection />
      <WhyChooseUs />
      <div id="services-section">
        <OurServices/>
      </div>
      <div className="z-20">
        <HowItworks />
      </div>
      <div id="our-story">
        <OurStory />
      </div>
      <Testimonials />
      <div id="faq-section">
        <FAQ />
      </div>
      <div id="contact-us">
        <ContactUs />
      </div>
      <Footer />
      <BookingCalculator />
      <ScrollToTop />
    </div>
  );
};

export default Home;
