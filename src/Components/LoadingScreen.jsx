"use client";
import React, { useEffect, useRef } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

const LoadingScreen = () => {
  const { isLoading } = useLoading();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && isLoading) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch(err => console.log('Video play failed:', err));
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999]"
      style={{
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0b3a26',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '100vh',
          objectFit: 'fill',
          zIndex: 1
        }}
      >
        <source src="/Images/loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingScreen;
