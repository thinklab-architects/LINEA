import React, { useRef, useEffect } from 'react';

interface ParallaxMediaProps {
    src: string;
    alt?: string; // Optional for video
    type?: 'image' | 'video'; // Explicit type or auto-detect
    className?: string; // Class for the outer container
    mediaClassName?: string; // Class for the img/video element
    speed?: number; // Parallax speed factor
    poster?: string; // For video
}

const ParallaxMedia: React.FC<ParallaxMediaProps> = ({
    src,
    alt = "",
    type,
    className = "",
    mediaClassName = "",
    speed = 0.15,
    poster
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaWrapperRef = useRef<HTMLDivElement>(null);

    // Auto-detect type if not provided
    const isVideo = type === 'video' || src.match(/\.(mp4|webm|mov)$/i);

    useEffect(() => {
        let animationFrameId: number;
        let lastScrollY = window.scrollY;

        const updatePosition = () => {
            if (!containerRef.current || !mediaWrapperRef.current) return;

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
                mediaWrapperRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        };

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(() => {
                    updatePosition();
                    animationFrameId = 0;
                });
            }
        };

        updatePosition(); // Initial

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
                ref={mediaWrapperRef}
                className="absolute inset-x-0 -top-[20%] h-[140%] w-full will-change-transform"
            >
                {isVideo ? (
                    <video
                        className={`w-full h-full object-cover ${mediaClassName}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={poster}
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        className={`w-full h-full object-cover ${mediaClassName}`}
                    />
                )}
            </div>
        </div>
    );
};

export default ParallaxMedia;
