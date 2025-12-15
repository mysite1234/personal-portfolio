"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../page";

// Custom animation keyframes for Tailwind
const AnimationStyles = () => {
  return (
    <style jsx global>{`
      @keyframes slideInFromLeft {
        0% { opacity: 0; transform: translateX(-50px) skewX(-5deg); }
        100% { opacity: 1; transform: translateX(0) skewX(0); }
      }
      
      .animate-slide-left-06 {
        animation: slideInFromLeft 0.6s ease-out forwards;
        animation-delay: 0.6s;
        opacity: 0;
      }

      .animate-slide-left-07 {
        animation: slideInFromLeft 0.6s ease-out forwards;
        animation-delay: 0.7s;
        opacity: 0;
      }

      .animate-slide-left-08 {
        animation: slideInFromLeft 0.6s ease-out forwards;
        animation-delay: 0.8s;
        opacity: 0;
      }

      .animate-slide-left-09 {
        animation: slideInFromLeft 0.6s ease-out forwards;
        animation-delay: 0.9s;
        opacity: 0;
      }

      .animate-slide-left-10 {
        animation: slideInFromLeft 0.6s ease-out forwards;
        animation-delay: 1s;
        opacity: 0;
      }

      .animate-stat-card-08 {
        animation: slideInFromLeft 0.5s ease-out forwards;
        animation-delay: 0.8s;
        opacity: 0;
      }

      .animate-stat-card-09 {
        animation: slideInFromLeft 0.5s ease-out forwards;
        animation-delay: 0.9s;
        opacity: 0;
      }

      .animate-stat-card-10 {
        animation: slideInFromLeft 0.5s ease-out forwards;
        animation-delay: 1s;
        opacity: 0;
      }
    `}</style>
  );
};

// Download CV Button Component
const DownloadCVButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    
    try {
      // Using your specific PDF file path
      const response = await fetch("/Manoj_G_Resume.pdf");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Check if blob is valid
      if (blob.size === 0) {
        throw new Error("Empty PDF file");
      }
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Manoj_Frontend_Developer_Resume.pdf"; // Clean filename for download
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
      
    } catch (error) {
      console.error("Download failed:", error);
      setError(error.message);
      
      // Fallback: Try direct download method
      try {
        const link = document.createElement("a");
        link.href = "/Manoj.Resume.pdf";
        link.download = "Manoj_Frontend_Developer_Resume.pdf";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error("Fallback download also failed:", fallbackError);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full sm:w-auto bg-gradient-to-br from-teal-700 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg animate-slide-left-08 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          Failed to download. Please try again or <a href="/Manoj_G_Resume.pdf" target="_blank" className="underline">open in new tab</a>.
        </div>
      )}
    </>
  );
};

// Main Component
const AboutSection = () => {
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hoveringImage, setHoveringImage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  // Set mounted state on client-side only
  useEffect(() => {
    setMounted(true);
    
    // Preload image
    const img = new Image();
    img.src = "/profilenew.png";
    img.onload = () => {
      setImageLoaded(true);
      setIsLoadingImage(false);
    };
    img.onerror = () => {
      setImageError(true);
      setIsLoadingImage(false);
      console.error("Failed to load profile image");
    };
  }, []);

  // Typewriter effect - only runs on client side
  useEffect(() => {
    if (!mounted || !textRef.current) return;

    const text = "Hello, I'm Manoj";
    const el = textRef.current;
    
    // Clear any existing content
    el.textContent = "";
    
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
      } else {
        clearInterval(timer);
        setTypewriterDone(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [mounted]);

  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  const handleImageError = (e) => {
    console.error("Failed to load profile image from img tag");
    setImageError(true);
    setIsLoadingImage(false);
  };

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    setIsLoadingImage(false);
  };

  // Don't render animations until mounted
  if (!mounted) {
    return (
      <>
        <Header />
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-700 mb-4">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimationStyles />
      <Header />
      
      {/* Background - Full width */}
      <div className="w-full min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center relative overflow-hidden py-8">
        
        {/* Container - Full width with max width for content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Content Section - Takes full width on mobile, half on desktop */}
          <div className="w-full opacity-100">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-10 text-slate-800 relative">
              Frontend
              <br />
              Developer
              <span className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-teal-700 to-blue-600 rounded-full"></span>
            </h1>

            {/* Typewriter */}
            <div className="text-xl sm:text-2xl lg:text-2xl font-semibold text-teal-700 mb-10 overflow-hidden relative h-8 flex items-center w-full">
              <span ref={textRef} className="w-full"></span>
            </div>

            <div className="w-full">
              <p className={`text-base sm:text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed w-full animate-slide-left-06`}>
                Passionate about creating beautiful, functional, and user-centered
                digital experiences. I specialize in modern frontend technologies
                with a keen eye for design and performance.
              </p>
            </div>

            {/* Description 2 */}
            <div className="w-full">
              <p className={`text-base sm:text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed w-full animate-slide-left-07`}>
                With expertise in React ecosystem and modern development
                practices, I build scalable applications that deliver exceptional
                user experiences across all devices and platforms.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 my-10">
              {[
                { number: "3+", label: "Projects", className: "animate-stat-card-08" },
                { number: "2", label: "Years Exp", className: "animate-stat-card-09" },
                { number: "100%", label: "Satisfaction", className: "animate-stat-card-10" },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`w-full bg-white border border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-600/30 shadow-lg ${stat.className}`}
                >
                  <div className="text-3xl font-bold text-teal-700 mb-2 w-full">{stat.number}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider w-full">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Button Group - Full width */}
            <div className="w-full flex flex-col sm:flex-row gap-4 mt-10">
              <DownloadCVButton />
              <button 
                onClick={handleContactClick}
                className={`w-full sm:w-auto bg-white border-2 border-teal-700 text-teal-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal-700 hover:text-white shadow-lg animate-slide-left-09 flex items-center justify-center gap-2`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </button>
            </div>
          </div>

          {/* Visual Section - Full width on mobile, half on desktop */}
          <div className="w-full relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center opacity-100">
            <div 
              className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] aspect-square z-10 flex items-center justify-center"
              onMouseEnter={() => setHoveringImage(true)}
              onMouseLeave={() => setHoveringImage(false)}
            >
              {/* Gradient Border */}
              <div 
                className="absolute w-[120%] h-[120%] rounded-full p-2 z-0"
                style={{
                  background: 'conic-gradient(from 0deg, #0f766e 0%, #2563eb 25%, #0f766e 50%, #2563eb 75%, #0f766e 100%)',
                  boxShadow: '0 0 50px rgba(15, 118, 110, 0.2), 0 0 80px rgba(37, 99, 235, 0.1)'
                }}
              >
                <div className="absolute inset-2 bg-white rounded-full z-10"></div>
              </div>

              {/* Profile Image Container */}
              <div 
                className={`relative pt-[-30px] w-[calc(100%-22px)] h-[calc(100%-22px)] rounded-full overflow-hidden z-20 bg-white transition-all duration-500 ease-in-out border-4 border-transparent 
                  ${hoveringImage ? 'scale-105 rotate-2' : ''}`}
                style={{
                  boxShadow: hoveringImage 
                    ? '0 35px 70px rgba(0, 0, 0, 0.25), 0 20px 45px rgba(15, 118, 110, 0.3), 0 0 60px rgba(15, 118, 110, 0.15), inset 0 0 40px rgba(255, 255, 255, 0.9)'
                    : '0 25px 50px rgba(0, 0, 0, 0.15), 0 15px 35px rgba(15, 118, 110, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.8)'
                }}
              >
                {/* Show loading state */}
                {isLoadingImage && !imageError && (
                  <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse">
                    <div className="text-teal-700 text-[80px] sm:text-[120px] lg:text-[140px] font-black">
                      M
                    </div>
                  </div>
                )}

                {/* Show fallback only if image failed to load */}
                {imageError && (
                  <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-blue-50 text-teal-700 text-[80px] sm:text-[120px] lg:text-[140px] font-black shadow-inner">
                    M
                  </div>
                )}

                {!imageError && (
                  <img
                    ref={imgRef}
                    src="/profilenew.png"
                    alt="Manoj - Frontend Developer"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      hoveringImage ? 'scale-110' : ''
                    } ${isLoadingImage ? 'opacity-0' : 'opacity-100'}`}
                    style={{
                      filter: hoveringImage ? 'brightness(0.95) contrast(1.1)' : 'none'
                    }}
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;