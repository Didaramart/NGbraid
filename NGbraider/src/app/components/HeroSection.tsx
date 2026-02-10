import { motion } from 'motion/react';
import { useEffect, useState, useRef, useMemo, memo } from 'react';

export const HeroSection = memo(function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const productVideoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer for background hero video autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (heroVideoRef.current) {
          if (entry.isIntersecting && !prefersReducedMotion) {
            heroVideoRef.current.play().catch(() => {
              // Autoplay may be blocked, fallback to user interaction
            });
          } else {
            heroVideoRef.current.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    if (heroVideoRef.current) {
      observer.observe(heroVideoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Intersection Observer for product demo video autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (productVideoRef.current) {
          if (entry.isIntersecting) {
            productVideoRef.current.play().catch(() => {
              // Autoplay may be blocked, user can click to play
            });
          } else {
            productVideoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (productVideoRef.current) {
      observer.observe(productVideoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOrderNow = () => {
    const event = new CustomEvent('openOrderPopup', { detail: {} });
    window.dispatchEvent(event);
  };

  // Customer images array
  const customerImages = useMemo(() => [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  ], []);

  return (
    <section id="hero-section" className="relative min-h-screen bg-[#050505] px-4 py-20 overflow-hidden">
      {/* VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 overflow-hidden bg-[#050505]">
        {/* Video Background Container */}
        {!prefersReducedMotion && !videoFailed && (
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: '#0a0015',
            }}
          >
            <source src={new URL('../../assets/videos/herovideo.mp4', import.meta.url).href} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback Background for video failure, prefers-reduced-motion, or loading */}
        {(prefersReducedMotion || videoFailed) && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a1a] via-[#050505] to-[#0a0015]" />
        )}

        {/* Subtle Dark Overlay for Text Readability - Lightened for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none" />

        {/* Premium Vignette Edge Fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(5,5,5,0.6) 100%)',
          }}
        />
      </div>

      {/* Content Layer (stays on top) */}
      <div className="max-w-7xl mx-auto relative z-10" style={{ willChange: 'auto', transform: 'translateZ(0)' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-white text-5xl lg:text-7xl font-bold leading-tight">
              Perfect Braids in <span className="text-[#FF1493]">Seconds</span>
              <br />
              No Wahala, No Stress.
            </h1>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white/80 text-xl lg:text-2xl"
            >
              Comot tired arms — make fine braids quick-quick. This small machine go give you salon-level braids for
              house. E light, e portable, and ready for travel (batteries no include).
            </motion.p>

            <div className="pt-4 space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrderNow}
                className="shimmer-button bg-[var(--color-background)] text-white font-bold text-2xl px-12 py-5 rounded-2xl backdrop-blur-md border-4 border-[#FF1493] hover:bg-white/10 transition-all shadow-[0_0_40px_rgba(255,20,147,0.4)]"
              >
                GRAB 50% OFF NOW!
              </motion.button>

              <div className="flex items-center gap-4 text-white/70">
                <div className="flex -space-x-2">
                  {customerImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Customer portrait ${index + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="text-sm">
                  <span className="text-[#FF1493] font-bold">4,800+</span> Happy Customers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-4 border-[#FF1493] shadow-[0_0_60px_rgba(255,20,147,0.5)]">
              <div className="aspect-square bg-gradient-to-br from-[#1a0a1a] to-[#050505]">
                <video
                  ref={productVideoRef}
                  src="/assets/videos/H1.mp4"
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              </div>

              {/* Video Placeholder Overlay (no play icon) */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />

              {/* Duration Badge */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-[#FF1493] rounded-full px-4 py-2 text-white font-bold">
                25s Demo
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-4 top-1/4 bg-[#FF1493] text-white font-bold px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(255,20,147,0.7)]"
            >
              50% OFF
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -left-4 bottom-1/4 bg-black border-2 border-[#FF1493] text-white font-bold px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(255,20,147,0.5)]"
            >
              Free Shipping
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});