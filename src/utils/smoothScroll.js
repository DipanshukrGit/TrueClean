/**
 * Enhanced smooth scroll function with better visual feedback
 * @param {string} targetId - The ID of the target element
 * @param {number} offset - Optional offset from top (default: 80px for navbar)
 * @param {number} duration - Duration of scroll animation in milliseconds (default: 1200ms)
 */
export const smoothScrollToSection = (targetId, offset = 80, duration = 2000) => {
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with ID "${targetId}" not found`);
    return;
  }

  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Smoother easing function
  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuart(progress);
    
    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Quick smooth scroll function for immediate use
 * @param {string} targetId - The ID of the target element
 */
export const quickScrollTo = (targetId) => {
  smoothScrollToSection(targetId, 80, 800); // Faster scroll for immediate feedback
};
