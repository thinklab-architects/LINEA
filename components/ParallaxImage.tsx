import React, { useRef, useEffect, useState } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string; // Class for the outer container
    imgClassName?: string; // Class for the img element (e.g. grayscale, hover effects)
    speed?: number; // Parallax speed factor (e.g. 0.1)
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    alt,
    className = "",
    imgClassName = "",
    speed = 0.08
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let animationFrameId: number;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            // Only animate if in view (with some buffer)
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate relative position based on center of viewport
                const centerY = windowHeight / 2;
                const elementCenterY = rect.top + rect.height / 2;

                // Distance from center
                const distanceFromCenter = elementCenterY - centerY;

                // Apply speed - negative speed makes it move "slower" than scroll (parallax bg feel)
                // or positive to move faster. 
                // Typically for "image moving inside container", we shift the image opposite to scroll to keep it centered or create depth.
                // Let's use a subtle movement.
                setOffset(distanceFromCenter * speed);
            }
        };

        const animate = () => {
            handleScroll();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Use requestAnimationFrame for smoother updates, or just scroll listener
        // Just scroll listener is often enough for simple parallax if not heavy
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
            {/* 
        Wrapper for the translation. 
        Height is set to >100% (e.g. 120%) and top is negative to allow movement up/down without showing gaps.
      */}
            <div
                className="absolute inset-x-0 -top-[15%] h-[130%] w-full will-change-transform"
                style={{ transform: `translateY(${offset}px)` }}
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
