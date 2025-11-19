"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  // Initial page load - keep loading until everything is loaded
  useEffect(() => {
    // Wait for window load event to ensure all resources are loaded
    const handleLoad = () => {
      // Add a minimum loading time to prevent flickering
      setTimeout(() => {
        setIsInitialLoad(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Additional smooth transition
      }, 2000); // Minimum 2 seconds loading
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback timer in case load event doesn't fire
    const fallbackTimer = setTimeout(() => {
      setIsInitialLoad(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 4000); // Maximum 4 seconds

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const startLoading = (message = '') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    // Only allow stopping if it's not the initial load
    if (!isInitialLoad) {
      setIsLoading(false);
    }
  };

  const setLoading = (loading, message = '') => {
    setLoadingMessage(message);
    // Only allow changing loading state if it's not the initial load
    if (!isInitialLoad) {
      setIsLoading(loading);
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        startLoading,
        stopLoading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
