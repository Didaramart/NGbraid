import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Card {
  id: number;
  title: string;
  price: string;
  rating: number;
  category: string;
  video: string;
  poster: string;
}

// Sample data with 6 videos from pgv folder
const CARDS: Card[] = [
  {
    id: 1,
    title: 'Sample 1',
    price: '$0',
    rating: 5,
    category: 'Demo',
    video: '/assets/videos/pgv/vvv1.mp4',
    poster: 'https://images.unsplash.com/photo-1518737119991-c1f86e0d7f70?w=300&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Sample 2',
    price: '$0',
    rating: 5,
    category: 'Demo',
    video: '/assets/videos/pgv/vvv2.mp4',
    poster: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Sample 3',
    price: '$0',
    rating: 5,
    category: 'Demo',
    video: '/assets/videos/pgv/vvv3.mp4',
    poster: 'https://images.unsplash.com/photo-1540932549986-b146847d6ecb?w=300&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Sample 4',
    price: '$0',
    rating: 5,
    category: 'Demo',
    video: '/assets/videos/pgv/vvv4.mp4',
    poster: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Sample 5',
    price: '$0',
    rating: 5,
    category: 'Demo',
    video: '/assets/videos/pgv/vvv5.mp4',
    poster: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'Sample 6',
    price: '$0',
    rating: 5,
    category: 'Demo',
    video: '/assets/videos/pgv/vvv6.mp4',
    poster: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop',
  },
];

interface VideoCardProps {
  card: Card;
  isActive: boolean;
}

function VideoCard({ card, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Play/pause based on carousel active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isVisible) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, isVisible]);

  // Intersection Observer for viewport visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (videoRef.current && !entry.isIntersecting) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-60 md:w-60 flex-shrink-0 h-80 md:h-96">
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 w-full h-full">
        {/* Video Area - Full Card */}
        <video
          ref={videoRef}
          src={card.video}
          poster={card.poster}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 w-full max-w-7xl mt-8">
        <div className="text-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openOrderPopup', { detail: {} }))}
            className="shimmer-button inline-flex items-center gap-3 bg-[#FF1493] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#FF1493]/90 transition-shadow shadow-lg"
          >
            ORDER NOW 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export function Samples() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<number | undefined>(undefined);

  const totalCards = CARDS.length;
  const angleStep = 360 / totalCards;

  // Calculate active index from rotation
  useEffect(() => {
    const normalized = ((-rotation % 360) + 360) % 360;
    const calculated = Math.round(normalized / angleStep) % totalCards;
    setActiveIndex(calculated);
  }, [rotation, angleStep, totalCards]);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setRotation((prev) => prev - angleStep);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [angleStep]);

  const handleNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setRotation((prev) => prev - angleStep);
  };

  const handlePrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setRotation((prev) => prev + angleStep);
  };

  const handleDotClick = (index: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    const targetRotation = -(index * angleStep);
    setRotation(targetRotation);
  };

  return (
    <section className="relative min-h-screen bg-[var(--color-background)] px-4 py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
            filter: 'blur(150px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Our <span className="text-[#FF6B35]">Samples</span>
          </h2>
          <p className="text-lg text-gray-400">Discover our finest creations</p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="flex flex-col items-center gap-12">
          {/* Carousel */}
          <div
            style={{ perspective: '1200px' }}
            className="relative h-96 md:h-[500px] w-full flex items-center justify-center"
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`,
                transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="relative w-full h-full"
            >
              {CARDS.map((card, index) => {
                const cardRotation = index * angleStep;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const radius = isMobile ? 280 : 420;

                return (
                  <div
                    key={card.id}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${cardRotation}deg) translateZ(${radius}px)`,
                      backfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <VideoCard
                      card={card}
                      isActive={activeIndex === index}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="shimmer-button w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-[#FF1493]/50 flex items-center justify-center hover:bg-white/20 hover:border-[#FF1493]/70 text-white transition-all duration-300"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {CARDS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`shimmer-button rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'w-8 h-2 bg-[#FF1493]/70'
                      : 'w-2 h-2 bg-[#FF1493]/40 hover:bg-[#FF1493]/60'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="shimmer-button w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-[#FF1493]/50 flex items-center justify-center hover:bg-white/20 hover:border-[#FF1493]/70 text-white transition-all duration-300"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
