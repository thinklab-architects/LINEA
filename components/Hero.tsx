/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import cover1 from '../images/cover page/1.png';
import cover2 from '../images/cover page/2.jpg';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [cover1, cover2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#D6D1C7]">

      {/* Background Images - Carousel */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={src}
            alt={`Hero background ${index + 1}`}
            className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
          />
        </div>
      ))}

      {/* Soft Mist Overlay - stays on top */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#433E38]/20 to-[#2C2A26]/40 mix-blend-multiply z-0"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-6">
        <div className="animate-fade-in-up w-full md:w-auto">
          <span className="block text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/90 mb-6 backdrop-blur-sm bg-white/5 border border-white/20 px-4 py-2 mx-0 md:mx-auto w-fit">
            Digital Craft Meets Organic Calm
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-4 drop-shadow-lg">
            Flowing <span className="italic text-[#F5F2EB]">Silence.</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-white/90 mb-8 font-serif">
            流動的靜謐
          </h2>
          <p className="max-w-lg mx-0 md:mx-auto text-lg md:text-xl text-white/90 font-light leading-relaxed mb-12 text-shadow-md">
            Architectural lines, learning from nature.<br />
            師法自然的建築線條，構築獨一無二的日常。
          </p>

          <a
            href="#products"
            onClick={(e) => handleNavClick(e, 'products')}
            className="group relative px-10 py-4 bg-[#F5F2EB] text-[#2C2A26] text-sm font-semibold uppercase tracking-widest hover:bg-white transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl inline-block"
          >
            <span className="relative z-10 group-hover:text-[#2C2A26]">View Collection</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;