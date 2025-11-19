"use client"
import { useLoading } from '@/contexts/LoadingContext';

// Custom hook for managing loading states
// export const useLoadingManager = () => {
//   const { startLoading, stopLoading, setLoading } = useLoading();

//   const withLoading = async (asyncFunction, loadingMessage = 'Loading...') => {
//     try {
//       startLoading(loadingMessage);
//       const result = await asyncFunction();
//       return result;
//     } finally {
//       stopLoading();
//     }
//   };

//   const simulateLoading = (duration = 1000, message = 'Loading.dsf.jhbdsbhd.') => {
//     startLoading(message);
//     setTimeout(() => {
//       stopLoading();
//     }, duration);
//   };

//   return {
//     startLoading,
//     stopLoading,
//     setLoading,
//     withLoading,
//     simulateLoading,
//   };
// };

// Hook for page transition loading
// export const usePageTransition = () => {
//   const { startLoading, stopLoading } = useLoading();

//   const handlePageTransition = (callback, loadingMessage = 'Loading page...') => {
//     startLoading(loadingMessage);
    
//     // Quick transition with minimal delay for better UX
//     setTimeout(() => {
//       if (callback) callback();
//       stopLoading();
//     }, 150);
//   };

//   return { handlePageTransition };
// };

// Hook for form submission loading
export const useFormLoading = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleFormSubmit = async (submitFunction, loadingMessage = 'Submitting...') => {
    try {
      startLoading(loadingMessage);
      const result = await submitFunction();
      return result;
    } finally {
      stopLoading();
    }
  };

  return { handleFormSubmit };
};
