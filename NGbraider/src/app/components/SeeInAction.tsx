import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface Video {
  id: number;
  title: string;
  src: string;
}

const VIDEOS: Video[] = [
  { id: 1, title: 'Demo 1', src: '/assets/videos/last/svo1.mp4' },
  { id: 2, title: 'Demo 2', src: '/assets/videos/last/svo2.mp4' },
  { id: 3, title: 'Demo 3', src: '/assets/videos/last/vio4.mp4' },
  { id: 4, title: 'Demo 4', src: '/assets/videos/last/vio5.mp4' },
  { id: 5, title: 'Demo 5', src: '/assets/videos/last/vio6.mp4' },
  { id: 6, title: 'Demo 6', src: '/assets/videos/last/vio7.mp4' },
];

export function SeeInAction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play video when carousel index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  // Pause video when section is not visible (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? VIDEOS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === VIDEOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[var(--color-background)] px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
            See in <span className="text-[var(--color-brand-primary)]">Action</span>
          </h2>
          <p className="text-[var(--color-foreground-muted)] text-xl">
            Watch our hair braider in action with real results
          </p>
        </motion.div>

        {/* Video Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
          ref={containerRef}
        >
          {/* Main Video Display */}
          <div className="relative bg-[#0a0a0f] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,20,147,0.3)] max-w-sm mx-auto aspect-[6/19]">
            <video
              ref={videoRef}
              key={currentIndex}
              src={VIDEOS[currentIndex].src}
              className="w-full h-full object-cover"
              controls
              controlsList="nodownload"
              poster=""
            />
          </div>

          {/* Video Title */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6"
          >
            <p className="text-white/80 font-medium">
              {currentIndex + 1} / {VIDEOS.length}
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-10">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              className="shimmer-button w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-[#FF1493]/50 hover:bg-white/20 hover:border-[#FF1493]/70 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {VIDEOS.map((video, index) => (
                <motion.button
                  key={video.id}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`shimmer-button relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border transition-all focus:outline-none focus:ring-2 backdrop-blur-sm ${
                    currentIndex === index
                      ? 'border-[#FF1493]/70 ring-2 ring-[#FF1493]/60 shadow-lg'
                      : 'border-[#FF1493]/40 opacity-60 hover:opacity-80'
                  }`}
                  aria-label={`Go to ${video.title}`}
                  aria-pressed={currentIndex === index}
                >
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              className="shimmer-button w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-[#FF1493]/50 hover:bg-white/20 hover:border-[#FF1493]/70 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {VIDEOS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`shimmer-button rounded-full transition-all ${
                  currentIndex === index
                    ? 'w-8 h-2 bg-[#FF1493]/70'
                    : 'w-2 h-2 bg-[#FF1493]/40 hover:bg-[#FF1493]/60'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openOrderPopup', { detail: {} }))}
              className="shimmer-button inline-flex items-center gap-3 bg-[#FF1493] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#FF1493]/90 transition-shadow shadow-lg"
            >
              ORDER NOW 🛒
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
