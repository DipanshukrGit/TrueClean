"use client";
import React from "react";
import HelloIcon from "./Icons/HelloIcon";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner, New York",
      avatar: "SJ",
      rating: 5,
      text: "Excellent service from start to finish. The team was professional, punctual, and thorough. My home has never looked better. Highly recommend their services to anyone looking for quality cleaning.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner, Los Angeles",
      avatar: "MC",
      rating: 5,
      text: "Outstanding results every time. The staff is well-trained and uses eco-friendly products that I feel safe with around my family. Booking is easy and the service exceeds expectations.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Professional, Chicago",
      avatar: "ER",
      rating: 5,
      text: "As a busy professional, I appreciate their reliability and attention to detail. They handle everything with care and my space always looks immaculate when they're done.",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Property Manager, Miami",
      avatar: "DT",
      rating: 5,
      text: "Consistent quality and excellent customer service. They've been maintaining our properties for months and we couldn't be happier. Professional, trustworthy, and efficient.",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Retailer, Seattle",
      avatar: "LA",
      rating: 5,
      text: "The best cleaning service I've used. They pay attention to the little details that make a big difference. My space feels fresh and inviting after every visit.",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Entrepreneur, Boston",
      avatar: "JW",
      rating: 5,
      text: "Professional team that delivers exceptional results. Their thorough approach and commitment to quality make them stand out. I'm a satisfied repeat customer.",
    },
  ];

  // Create multiple duplicates for infinite scroll effect
  const createInfiniteArray = (arr, multiplier = 4) => {
    const result = [];
    for (let i = 0; i < multiplier; i++) {
      result.push(...arr.map(item => ({ ...item, id: `${item.id}-${i}` })));
    }
    return result;
  };

  // Split testimonials for desktop (3 columns) with duplicates
  const infiniteTestimonials = createInfiniteArray(testimonials);
  const column1 = infiniteTestimonials.filter((_, index) => index % 3 === 0);
  const column2 = infiniteTestimonials.filter((_, index) => index % 3 === 1);
  const column3 = infiniteTestimonials.filter((_, index) => index % 3 === 2);

  // For mobile: Use all testimonials in both rows with duplicates
  const infiniteTestimonialsForMobile = createInfiniteArray(testimonials);
  const row1 = infiniteTestimonialsForMobile; // All testimonials in both rows
  const row2 = infiniteTestimonialsForMobile; // All testimonials in both rows

  // For mobile: Create separate arrays for left and right moving carousels
  const mobileInfiniteTestimonials = createInfiniteArray(testimonials, 6);

  const TestimonialCard = ({ testimonial, duplicateKey }) => (
    <div
      key={duplicateKey || testimonial.id}
      className={`testimonial-card flex flex-col justify-between p-6 rounded-3xl border flex-shrink-0 w-80 md:w-auto transition-all duration-300`}
    >
      {/* Testimonial Text */}
      <p className="testimonial-text font-work-sans italic text-xs md:text-sm leading-relaxed mb-6 line-clamp-6 transition-colors duration-300">
        {testimonial.text}
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3">
        <div className="testimonial-avatar w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300">
          <span className="testimonial-avatar-text font-bold text-sm">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <h4 className="testimonial-name font-semibold text-sm transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="testimonial-role text-xs transition-colors duration-300">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
  <section className="bg-[var(--surface)] py-6 md:py-20 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto md:w-10/12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-2">
              <HelloIcon />
            </div>
            <span className="text-[var(--accent-strong)] font-semibold font-serif text-lg transition-colors duration-300">
              Our Testimonials
            </span>
          </div>

          <h2 className="md:hidden block text-3xl lg:text-6xl font-semibold font-serif text-[var(--foreground)] leading-tight mb-6 transition-colors duration-300">
            Voices That Reflect the Shine
          </h2>
          <h2 className="hidden md:!block text-3xl lg:text-6xl font-semibold font-serif text-[var(--foreground)] leading-tight mb-6 transition-colors duration-300">
            Voices That Reflect the
            <br />
            Shine
          </h2>
        </div>

        {/* Mobile Testimonials Carousel (Two horizontal rows) */}
        <div className="md:hidden relative h-[500px] overflow-hidden">
          {/* Gradient overlays for smooth transition */}
          {/* <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[#FAFFFA] to-transparent z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#FAFFFA] to-transparent z-10"></div> */}

          <div className="flex flex-col gap-6 h-full justify-center">
            {/* First Carousel - Moving Right */}
            <div className="overflow-hidden">
              <div className="animate-mobile-scroll-right flex gap-6">
                {mobileInfiniteTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`mobile-right-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    duplicateKey={`mobile-right-${testimonial.id}-${index}`}
                  />
                ))}
              </div>
            </div>

            {/* Second Carousel - Moving Left */}
            <div className="overflow-hidden">
              <div className="animate-mobile-scroll-left flex gap-6">
                {mobileInfiniteTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`mobile-left-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    duplicateKey={`mobile-left-${testimonial.id}-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Testimonials Carousel (Vertical) */}
        <div className="hidden md:block relative h-[600px] overflow-hidden">
          {/* Gradient overlays for smooth transition */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[var(--testimonial-overlay)] to-transparent z-10 transition-colors duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--testimonial-overlay)] to-transparent z-10 transition-colors duration-300"></div>

          {/* Three columns with alternating animations */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {/* Column 1 - Scroll Up */}
            <div className="animate-scroll-up">
              <div className="flex flex-col gap-6">
                {column1.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col1-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    duplicateKey={`col1-${testimonial.id}-${index}`}
                  />
                ))}
              </div>
            </div>

            {/* Column 2 - Scroll Down */}
            <div className="animate-scroll-down">
              <div className="flex flex-col gap-6">
                {column2.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col2-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    duplicateKey={`col2-${testimonial.id}-${index}`}
                  />
                ))}
              </div>
            </div>

            {/* Column 3 - Scroll Up (only on large screens) */}
            <div className="animate-scroll-up hidden lg:block">
              <div className="flex flex-col gap-6">
                {column3.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col3-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    duplicateKey={`col3-${testimonial.id}-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Desktop animations (unchanged from base code) */
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-75%);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(-75%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Mobile horizontal animations */
        @keyframes mobile-scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes mobile-scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Animation classes */
        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 5s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 5s linear infinite;
        }

        .animate-mobile-scroll-right {
          animation: mobile-scroll-right 40s linear infinite;
        }

        .animate-mobile-scroll-left {
          animation: mobile-scroll-left 40s linear infinite;
        }

        /* Hover pause for all animations */
        .animate-scroll-up:hover,
        .animate-scroll-down:hover,
        .animate-scroll-right:hover,
        .animate-scroll-left:hover,
        .animate-mobile-scroll-right:hover,
        .animate-mobile-scroll-left:hover {
          animation-play-state: paused;
        }

        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials