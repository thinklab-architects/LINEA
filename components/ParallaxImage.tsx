import React, { useRef, useEffect, useState } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string; // Class for the outer container
    imgClassName?: string; // Class for the img element (e.g. grayscale, hover effects)
    speed?: number; // Parallax speed factor (e.g. 0.1)
}

import React, { useRef, useEffect } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string; // Class for the outer container
    imgClassName?: string; // Class for the img element
    speed?: number; // Parallax speed factor (e.g. 0.1)
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    alt,
    className = "",
    imgClassName = "",
    speed = 0.15
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let lastScrollY = window.scrollY;

        const updatePosition = () => {
            if (!containerRef.current || !imageWrapperRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if in viewport (with buffer)
            if (rect.top < windowHeight && rect.bottom > 0) {
                const centerY = windowHeight / 2;
                const elementCenterY = rect.top + rect.height / 2;
                const distanceFromCenter = elementCenterY - centerY;

                // Calculate offset
                const offset = distanceFromCenter * speed;

                // Direct DOM manipulation for performance
                imageWrapperRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        };

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            // Request animation frame to sync with refresh rate
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(() => {
                    updatePosition();
                    animationFrameId = 0;
                });
            }
        };

        // Initial position
        updatePosition();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updatePosition);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
            {/* 
        Wrapper for the translation. 
        Height is 140% to allow for significant movement (-20% top offset).
      */}
            <div
                ref={imageWrapperRef}
                className="absolute inset-x-0 -top-[20%] h-[140%] w-full will-change-transform"
            >
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover ${imgClassName}`}
                />
            </div>
        </div>
    );
};

export default ParallaxImage;
