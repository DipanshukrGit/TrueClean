"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CalenderIcon from "./Icons/CalenderIcon";
import DropdownArrowIcon from "./Icons/DropdownArrowIcon";
import MinusIcon from "./Icons/MinusIcon";
import CheckmarkIcon from "./Icons/CheckmarkIcon";
import PlusIcon from "./Icons/PlusIcon";
import CloseIcon from "./Icons/CloseIcon";
import SuccessIcon from "./Icons/SuccessIcon";
import ErrorIcon from "./Icons/ErrorIcon";
import WarningIcon from "./Icons/WarningIcon";
import LoadingSpinnerIcon from "./Icons/LoadingSpinnerIcon";

const BookingCalculator = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showServiceWarning, setShowServiceWarning] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    state: "",
    city: "",
    date: "",
    otherService: "",
  });

  // Check authentication and load user data
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      // Verify token and get user data
      fetch("/api/auth/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated && data.user) {
            setUser(data.user);
            // Pre-fill form with user data
            setFormData((prev) => ({
              ...prev,
              name: data.user.name || prev.name,
              email: data.user.email || prev.email,
              whatsapp: data.user.phone || prev.whatsapp,
            }));
          } else {
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_data');
          }
        })
        .catch(() => {
          localStorage.removeItem('user_token');
          localStorage.removeItem('user_data');
        });
    }
  }, []);

  const [expandedServices, setExpandedServices] = useState({});
  const [selectedServices, setSelectedServices] = useState({
    bathrooms: { selected: false, quantity: 0, unit: "00 Sq ft" },
    bedroom: { selected: false, quantity: 0, unit: " Room" },
    livingRoom: { selected: false, quantity: 0, unit: " Room" },
    kitchen: { selected: false, quantity: 0, unit: " Kitchen" },
    balcony: { selected: false, quantity: 0, unit: " Balcony" },
  });

  const toTitleCase = (value) => {
    if (!value) return "";
    return value
      .toString()
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const serviceDetails = {
    bathrooms:
      "WC, Cobweb removal, Floor, Wall Cleaning, Mirror cleaning, & Basin Cleaning",
    bedroom:
      "Wiping surface, Dusting, Sweeping, Mopping, Cobweb removal, Ceiling fan cleaning, lights, switchboard, windows, doors and tidy the bed",
    livingRoom:
      "Sofa, floor, furniture, wipe down of all surfaces, vacuum furniture",
    kitchen:
      "Tiles, slabs, sink, cabinets wiping, gas stove clean, exhaust fan, chimney clean",
    balcony: "Floor, railing, doors, grills",
  };

  const toggleCalculator = () => {
    const token = localStorage.getItem('user_token');
    
    // Check if user is logged in
    if (!token) {
      // Redirect to login page
      if (confirm('You need to login to book a cleaning service. Would you like to login now?')) {
        router.push('/login');
      }
      return;
    }

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // Reset states when opening/closing calculator
    if (newIsOpen) {
      setShowServiceWarning(false);
      setSubmitMessage({ type: "", text: "" });
    }
  };

  const toggleServiceExpansion = (service) => {
    setExpandedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const handleServiceSelection = (service) => {
    setSelectedServices((prev) => {
      const updated = {
        ...prev,
        [service]: {
          ...prev[service],
          selected: !prev[service].selected,
          quantity: !prev[service].selected ? 1 : prev[service].quantity,
        },
      };

      // Hide warning when user selects a service
      if (updated[service].selected) {
        setShowServiceWarning(false);
      }

      return updated;
    });
  };

  const updateQuantity = (service, increment) => {
    setSelectedServices((prev) => {
      const currentService = prev[service];
      const newQuantity = Math.max(0, currentService.quantity + increment);

      const updated = {
        ...prev,
        [service]: {
          ...currentService,
          quantity: newQuantity,
          selected: newQuantity > 0 ? true : currentService.selected,
        },
      };

      // Hide warning when user increases quantity
      if (newQuantity > 0) {
        setShowServiceWarning(false);
      }

      return updated;
    });
  };

  const handleInputChange = (field, value) => {
    // For WhatsApp field, only allow digits
    if (field === "whatsapp") {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, "");
      value = digitsOnly;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Hide submit message when user starts typing
    if (submitMessage.text) {
      setSubmitMessage({ type: "", text: "" });
    }
  };

  const handleSubmitQuote = async () => {
    // Clear any previous messages
    setSubmitMessage({ type: "", text: "" });

    // Validate required fields
    if (!formData.name || !formData.whatsapp || !formData.email) {
      setSubmitMessage({
        type: "error",
        text: "Please fill in your name, WhatsApp number, and email.",
      });
      return;
    }

    // WhatsApp number validation - must be at least 10 digits
    const whatsappDigits = formData.whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10) {
      setSubmitMessage({
        type: "error",
        text: "WhatsApp number must be at least 10 digits.",
      });
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Check if any services are selected
    const hasSelectedServices = Object.values(selectedServices).some(
      (service) => service.selected && service.quantity > 0
    );

    if (!hasSelectedServices) {
      setShowServiceWarning(true);
      // setSubmitMessage({ type: 'error', text: 'Please select at least one service with quantity greater than 0 to get your quote.' });
      return;
    }

    // Check authentication before submitting
    const token = localStorage.getItem('user_token');
    if (!token) {
      setSubmitMessage({
        type: "error",
        text: "Please login to book a service. Redirecting to login page...",
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          state: formData.state,
          city: formData.city,
          date: formData.date,
          otherService: formData.otherService,
          selectedServices: selectedServices,
        }),
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Booking request submitted successfully! View your bookings in the dashboard.",
        });

        // Reset form after a short delay
        setTimeout(() => {
          setFormData({
            name: user?.name || "",
            whatsapp: user?.phone || "",
            email: user?.email || "",
            state: "",
            city: "",
            date: "",
            otherService: "",
          });
          setSelectedServices({
            bathrooms: { selected: false, quantity: 0, unit: "00 Sq ft" },
            bedroom: { selected: false, quantity: 0, unit: " Room" },
            livingRoom: { selected: false, quantity: 0, unit: " Room" },
            kitchen: { selected: false, quantity: 0, unit: " Kitchen" },
            balcony: { selected: false, quantity: 0, unit: " Balcony" },
          });
          setSubmitMessage({ type: "", text: "" });
          setIsOpen(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('user_token');
          localStorage.removeItem('user_data');
          setSubmitMessage({
            type: "error",
            text: "Your session has expired. Please login again.",
          });
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setSubmitMessage({
            type: "error",
            text: errorData.error || "Failed to submit quote request. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitMessage({
        type: "error",
        text: "Failed to submit quote request. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ServiceItem = ({ service, label }) => {
    const serviceData = selectedServices[service];
    const isExpanded = expandedServices[service];

    return (
      <div className="mb-3">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors"
          onClick={() => handleServiceSelection(service)}
        >
          <div className="flex items-center justify-center md:justify-start w-full md:w-1/2 py-3 gap-2 md:border-b border-gray-500">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                serviceData.selected ? "bg-secondary/30" : "bg-gray-200"
              }`}
            >
              {serviceData.selected ? (
                <CheckmarkIcon className="w-3 h-3" color="#2D5A3D" />
              ) : (
                <CheckmarkIcon className="w-3 h-3" color="#6B7280" />
              )}
            </div>
            <span
              className={`text-sm text-center md:text-left font-medium transition-colors ${
                serviceData.selected ? "text-primary" : "text-gray-700"
              }`}
            >
              {label}
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-between w-full md:w-1/2 py-2 ">
            <div
              className="flex items-center space-x-2 md:space-x-3 border-b border-gray-500  gap-4 bg-gray-50 rounded-full px-2 md:px-3 py-1 w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => updateQuantity(service, -1)}
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  serviceData.selected && serviceData.quantity > 1
                    ? "bg-secondary/30 hover:bg-secondary/40"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                disabled={!serviceData.selected || serviceData.quantity <= 1}
              >
                <MinusIcon 
                  className="w-4 h-4" 
                  color={serviceData.selected && serviceData.quantity > 1 ? "#2D5A3D" : "#6B7280"} 
                />
              </button>
              <span className="text-gray-700 text-xs md:text-sm min-w-[60px] md:min-w-[80px] text-center font-medium flex-1">
                {serviceData.selected ? serviceData.quantity : 0}{" "}
                {serviceData.unit}
              </span>
              <button
                onClick={() => updateQuantity(service, 1)}
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  serviceData.selected
                    ? "bg-secondary/30 hover:bg-secondary/40"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <PlusIcon 
                  className="w-4 h-4" 
                  color={serviceData.selected ? "#2D5A3D" : "#6B7280"} 
                />
              </button>
            </div>

            {/* <button
              onClick={() => toggleServiceExpansion(service)}
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
            >
              <DropdownArrowIcon className="w-4 h-4" color="#9CA3AF" />
            </button> */}
          </div>
        </div>

        {serviceData.selected && (
          <div className="pt-1 px-3 font-work-sans">
            <p className="text-xs text-gray-600 leading-relaxed text-center md:text-left md:w-full font-work-sans italic">
              {serviceDetails[service]}
            </p>
          </div>
        )}

        {isExpanded && (
          <div className="mt-2 p-3 bg-gray-50 ">
            <p className="text-xs text-gray-600 italic ">
              {serviceDetails[service]}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleCalculator}
        className="fixed right-0 z-50 bg-primary text-white px-3 py-3 rounded-l-lg shadow-[0_4px_14px_0_rgba(46,125,50,0.39)] transition-colors duration-200 hidden md:!block"
        style={{
          top: "25%",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        Request Quotation
      </button>

      {/* Mobile Floating Button */}
      <button
        onClick={toggleCalculator}
        className="fixed bottom-4 left-4 z-50 bg-primary text-white px-4 py-3 rounded-full shadow-[0_4px_14px_0_rgba(46,125,50,0.39)] transition-colors duration-200 md:hidden"
      >
        <span className="text-sm font-medium">Request Quote</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-gradient-to-br from-black/20 via-black/10 to-black/5 z-50"
          onClick={toggleCalculator}
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(4px) saturate(100%)",
            WebkitBackdropFilter: "blur(4px) saturate(100%)",
          }}
        />
      )}

      {/* Sliding Calculator */}
      <div
        className={`fixed right-0 bottom-0 w-full md:w-[30rem] bg-white  transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen
            ? "translate-x-0 shadow-[0_-14px_50px_rgba(0,0,0,0.6)]"
            : "translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="h-full flex flex-col z-[1001]">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white px-4 md:px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-lg md:text-4xl font-semibold text-gray-800">
                  Book Your Cleaning Service
                </h2>
                <p className="text-gray-600 mt-2 md:mt-0 text-sm md:text-lg">
                  Why waste your valuable time on cleaning
                </p>
              </div>
              <button
                onClick={toggleCalculator}
                className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-4">
            {/* Basic Information */}
            <div className="space-y-3 mb-5">
              <div>
                <input
                  type="text"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border-b border-[#757575] placeholder:text-[#757575] outline-none text-base md:text-sm text-gray-800 bg-white"
                  inputMode="text"
                  autoComplete="name"
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  placeholder="WhatsApp number (min 10 digits)*"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    handleInputChange("whatsapp", e.target.value)
                  }
                  // maxLength="10"
                  className="w-full px-4 py-3 pr-12 border-b border-[#757575] placeholder:text-[#757575] outline-none text-base md:text-sm text-gray-800 bg-white"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414l-.043-.02z" />
                  </svg>
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border-b border-[#757575] placeholder:text-[#757575] outline-none text-base md:text-sm text-gray-800 bg-white"
                  required
                />
              </div>

              <div className="relative">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-4 py-3 pr-10 border-b border-[#757575] text-gray-800 outline-none appearance-none bg-white text-base md:text-sm"
                >
                  <option value="">Select State</option>
                  {/* <option value="maharashtra">Maharashtra</option>
                  <option value="delhi">Delhi</option>
                  <option value="karnataka">Karnataka</option> */}
                  <option value="gujarat">Gujarat</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <DropdownArrowIcon className="w-4 h-4" color="#9CA3AF" />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 border-b border-[#757575] placeholder:text-[#757575] outline-none text-base md:text-sm text-gray-800 bg-white"
                />
              </div>

              <div className="relative">
                <input
                  type="date"
                  placeholder="Pick a date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-b border-[#757575] placeholder:text-[#757575] outline-none text-base md:text-sm text-gray-800 bg-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <CalenderIcon />
                </div>
              </div>
            </div>

            {/* Services Selection */}
            <div className="mb-5">
              <h3 className="text-sm text-[#757575] mb-3">
                Select Below Service*
              </h3>

              <ServiceItem service="bathrooms" label="Bathrooms" />
              <ServiceItem service="bedroom" label="Bedroom Cleaning" />
              <ServiceItem service="livingRoom" label="Living Room Cleaning" />
              <ServiceItem service="kitchen" label="Kitchen Cleaning" />
              <ServiceItem service="balcony" label="Balcony Cleaning" />
            </div>

            {/* Other Service */}
            <div className="mb-5">
              <textarea
                placeholder="Request Other Service"
                value={formData.otherService}
                onChange={(e) =>
                  handleInputChange("otherService", e.target.value)
                }
                rows={1}
                className="w-full px-4 py-3 border-b border-[#757575] placeholder:text-[#757575] outline-none resize-none text-base md:text-sm text-gray-800 bg-white"
              />
            </div>

            {/* Submit Message */}
            {submitMessage.text && (
              <div
                className={`mb-4 p-3 rounded-lg border ${
                  submitMessage.type === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center">
                  {submitMessage.type === "success" ? (
                    <SuccessIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                  ) : (
                    <ErrorIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      submitMessage.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {submitMessage.text}
                  </span>
                </div>
              </div>
            )}

            {/* Service Warning (only shown when user tries to submit without services) */}
            {showServiceWarning && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <WarningIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-red-700 font-medium">
                    Please select at least one service to get your quote.
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Bottom Button */}
          <div className="flex-shrink-0 bg-white px-4 md:px-6 py-4 border-t border-gray-200">
            <button
              onClick={handleSubmitQuote}
              disabled={isLoading}
              className="w-full bg-primary text-white font-medium py-4 px-6 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingSpinnerIcon className="-ml-1 mr-3 h-5 w-5 text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Book Your Cleaning</span>
                  <DropdownArrowIcon className="w-6 h-6" color="#FFFFFF" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCalculator;
