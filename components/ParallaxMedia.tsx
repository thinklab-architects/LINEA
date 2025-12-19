import React, { useRef, useEffect } from 'react';

interface ParallaxMediaProps {
    src: string;
    alt?: string;
    type?: 'image' | 'video';
    className?: string; // Class for the outer container
    mediaClassName?: string; // Class for the img/video element
    speed?: number; // Parallax speed factor
    poster?: string;
    scrollScrub?: boolean; // If true, video playback is controlled by scroll
}

const ParallaxMedia: React.FC<ParallaxMediaProps> = ({
    src,
    alt = "",
    type,
    className = "",
    mediaClassName = "",
    speed = 0.15,
    poster,
    scrollScrub = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    // Auto-detect type if not provided
    const isVideo = type === 'video' || src.match(/\.(mp4|webm|mov)$/i);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const enableScrubbing = scrollScrub && !isMobile;

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

                // 1. Parallax Position
                const offset = distanceFromCenter * speed;
                mediaWrapperRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;

                // 2. Scroll Scrubbing (Video Only)
                if (isVideo && scrollScrub && videoRef.current && videoRef.current.duration) {
                    // Calculate progress: 0 when top enters bottom of screen, 1 when bottom leaves top of screen
                    // Actually, let's map it so the video plays fully while the element traverses the viewport.

                    // Total distance the element travels to cross the viewport = windowHeight + rect.height
                    // Current position in that journey = windowHeight - rect.top
                    const travelDistance = windowHeight + rect.height;
                    const currentTravel = windowHeight - rect.top;

                    let progress = currentTravel / travelDistance;
                    // Clamp between 0 and 1
                    progress = Math.max(0, Math.min(1, progress));

                    // Set currentTime
                    if (Number.isFinite(videoRef.current.duration)) {
                        videoRef.current.currentTime = progress * videoRef.current.duration;
                    }
                }
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

        // Initial setup
        if (isVideo && scrollScrub && videoRef.current) {
            // Ensure it's paused initially if we are scrubbing
            videoRef.current.pause();
        }
        updatePosition();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updatePosition);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [speed, scrollScrub, isVideo]);

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
                        ref={videoRef}
                        className={`w-full h-full object-cover ${mediaClassName}`}
                        // Only autoplay if scrubbing is NOT enabled (or if on mobile)
                        autoPlay={!enableScrubbing}
                        muted
                        loop={!enableScrubbing}
                        playsInline
                        webkit-playsinline="true"
                        preload="auto"
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
