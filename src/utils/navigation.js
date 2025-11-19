import { useRouter } from "next/navigation";
import { smoothScrollToSection } from "./smoothScroll";

// Utility function to handle cross-page navigation with scroll to sections
export const navigateToSection = (sectionId, router, offset = 140, duration = 1500) => {
  // Check if we're on the home page
  const isHomePage = window.location.pathname === '/';
  
  if (isHomePage) {
    // If already on home page, just scroll to section
    smoothScrollToSection(sectionId, offset, duration);
  } else {
    // If on different page, navigate to home with section hash
    router.push(`/#${sectionId}`);
    
    // Wait for navigation to complete, then scroll to section
    setTimeout(() => {
      smoothScrollToSection(sectionId, offset, duration);
    }, 100);
  }
};

// Hook version for easier use in components
export const useNavigateToSection = () => {
  const router = useRouter();
  
  return (sectionId, offset = 140, duration = 1500) => {
    navigateToSection(sectionId, router, offset, duration);
  };
};
