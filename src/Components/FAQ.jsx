"use client";
import React, { useState } from "react";
import HelloIcon from "./Icons/HelloIcon";
import SlideUp from "@/Components/animations/SlideUp";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is Trueclean?",
      answer:
        "TrueClean is a professional home cleaning company dedicated to providing high-quality, reliable, and affordable cleaning services. We offer a range of customizable cleaning solutions to meet the needs of every household, whether it's a one-time deep clean, regular maintenance cleaning, move-in/move-out service, or post-construction cleaning. Our trained and trusted team uses eco-friendly products and proven cleaning techniques to ensure your home is left spotless, safe, and fresh.",
    },
    {
      id: 2,
      question: "How do I book services?",
      answer:
        "Booking a cleaning service with TrueClean is simple and convenient. You can schedule your appointment in any of the following ways: \n\n 1. Online: Visit our website and use the easy booking form to choose your service, date, and time. \n\n 2. Call or Text: Contact our friendly team directly by phone or text to discuss your needs and set up your cleaning. \n\n 3. Email: Send us an email with your details, and we'll get back to you promptly to confirm your booking. Once your appointment is scheduled, you'll receive a confirmation along with any important details about your service. We aim to make the process hassle-free from start to finish!",
    },
    {
      id: 3,
      question: "Can I book recurring services?",
      answer:
        "Yes, you can! TrueClean offers flexible recurring cleaning services to fit your schedule and lifestyle. Whether you need cleaning weekly, bi-weekly, or monthly, we can set up a consistent plan that keeps your home looking its best — without the hassle of rebooking each time. Recurring clients also enjoy priority scheduling and may be eligible for discounted rates. Just let us know your preferred frequency during booking, and we'll take care of the rest!",
    },
    {
      id: 4,
      question: "How can I trust your services?",
      answer:
        "At TrueClean, your trust and peace of mind are our top priorities. Here's how we ensure a safe and reliable experience: • Trained & Vetted Professionals: All of our cleaners are carefully screened, background-checked, and professionally trained to deliver consistent, high-quality service. • Licensed & Insured: TrueClean is a fully licensed and insured company, so you're protected in the rare event of damage or an incident. • Satisfaction Guarantee: We stand behind our work. If something isn't right, let us know within 24 hours and we'll make it right — no questions asked. • Secure Booking & Payment: Our booking system is encrypted and secure, giving you peace of mind when scheduling and paying for services. With TrueClean, you're not just hiring a cleaner — you're choosing a team that genuinely cares about your home.",
    },
    {
      id: 5,
      question: "How are your services priced?",
      answer:
        "TrueClean offers transparent, competitive pricing based on the size of your home, the type of service you need, and how often you'd like it done. Our pricing is designed to be fair, with no hidden fees. Here's how we typically price our services: • Flat rates for standard one-time or recurring cleanings (based on number of bedrooms/bathrooms). • Custom quotes for deep cleans, move-in/move-out, or special requests. • Discounted rates available for recurring services (weekly, bi-weekly, or monthly). You can get an instant estimate through our online booking form or contact us directly for a personalized quote. We're happy to work with your budget and needs!",
    },
    {
      id: 6,
      question: "Which cities are your services available?",
      answer:
        "TrueClean proudly serves customers in the following cities and surrounding areas: • VADODARA • SURAT • AHEMDABAD • BHARUCH • ANAND",
    },
    {
      id: 7,
      question: "How much notice do you need for a booking?",
      answer:
        "We recommend booking at least **48 hours in advance** to guarantee your preferred time slot. Same-day or next-day appointments may be available depending on team availability—just reach out and we’ll do our best to help.",
    },
    {
      id: 8,
      question: "Do I need to be home during the cleaning?",
      answer:
        "Not necessarily. As long as our team can access your space (via key, smart lock, concierge, or a trusted point of contact), you can return to a freshly cleaned home. If you prefer to be present, that’s perfectly fine too!",
    },
    {
      id: 9,
      question: "What cleaning products do you use?",
      answer:
        "TrueClean uses **eco-friendly, non-toxic cleaning products** that are safe for children, pets, and allergy-sensitive clients. If you have specific product preferences or sensitivities, let us know—we're happy to tailor the supplies we use.",
    },
    {
      id: 10,
      question: "How can I contact Support?",
      answer:
        "You can reach TrueClean's Support Team easily through any of the following methods: • Phone: +1 (555) 123-4567 • Email: contact@company.com • Website Chat: Use the live chat feature on our website for quick answers during business hours • Contact Form: Fill out the form on our Contact Us page and we'll respond as soon as possible. Our support team is available Monday–Saturday, 9 AM – 6 PM and we're always happy to help with questions, changes to your booking, or any concerns.",
    },
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="bg-[var(--surface)] py-6 md:py-20 transition-colors duration-300">
      <div className="container mx-auto w-10/12 ">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-20 items-start">
          {/* Left Side - Header */}
          <SlideUp delay={0.15}>
            <div className="space-y-8">
              {/* Header with Hello Icon */}
              <div className="flex items-center gap-3 md:mb-8">
                <div className="p-2">
                  <HelloIcon />
                </div>
                <span className="text-[#00603A] font-semibold font-serif text-lg">
                  FAQs
                </span>
              </div>

              {/* Main Heading */}
              <div className="md:space-y-6">
                <h2 className="text-3xl lg:text-5xl font-semibold font-serif text-[#1a1a1a] leading-tight">
                  {/* Got Questions?
                  <br />
                  We've Got Answers */}Help Hub:  <br /> Questions & Answers
                </h2>
              </div>

              {/* Decorative dots */}
              {/* <div className="flex gap-2 mt-8">
              <div className="w-2 h-2 bg-[#00603A] rounded-full"></div>
              <div className="w-2 h-2 bg-[#A8D5BA] rounded-full"></div>
              <div className="w-2 h-2 bg-[#A8D5BA] rounded-full"></div>
            </div> */}
            </div>
          </SlideUp>
          {/* Right Side - FAQ Items */}
          <SlideUp delay={0.25}>
            <div className="relative">
              {/* Top gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-8 md:h-20 bg-gradient-to-b from-[var(--faq-overlay-top)] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
              
              {/* Scrollable content */}
              <div 
                className="space-y-4 h-[30rem] overflow-y-auto overflow-x-hidden touch-pan-y" 
                style={{msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'}}
              >
              <div className="md:h-[1.2rem]"></div>
                {faqData.map((faq) => (
                  <div
                    key={faq.id}
                    className={`border border-[var(--faq-border)] rounded-lg overflow-hidden transition-all duration-300 bg-[var(--faq-card-bg)] shadow-sm shadow-[var(--faq-shadow)] ${
                      openFAQ === faq.id
                        ? "border-[var(--accent-strong)] shadow-[var(--faq-shadow-active)]"
                        : "hover:border-[var(--faq-border-hover)]"
                    }`}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-3 text-left flex items-center justify-between bg-transparent hover:bg-[var(--faq-card-hover)] transition-colors duration-200 touch-manipulation"
                    >
                      <span className="text-[var(--faq-question)] font-medium text-base pr-4 transition-colors duration-300">
                        {faq.question}
                      </span>
                      <div
                        className={`flex-shrink-0 w-6 h-6 flex items-center rounded-full justify-center transition-all duration-300 ${
                          openFAQ === faq.id ? "rotate-45" : ""
                        }`}
                        style={{
                          background:
                            openFAQ === faq.id
                              ? "var(--faq-icon-bg-active)"
                              : "var(--faq-icon-bg)",
                          color:
                            openFAQ === faq.id
                              ? "var(--faq-icon-color-active)"
                              : "var(--faq-icon-color)",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3.5V12.5M3.5 8H12.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === faq.id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      } bg-[var(--faq-card-bg)]`}
                    >
                      <div className="px-6 pb-4 transition-colors duration-300">
                        <p className="text-[var(--faq-answer)] text-sm leading-relaxed whitespace-pre-line transition-colors duration-300">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="md:h-[1.2rem]"></div>
              </div>
              
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-8 md:h-20 bg-gradient-to-t from-[var(--faq-overlay-bottom)] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
