import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

// Animated Counter Component
function AnimatedCounter({
  target,
  isDecimal = false,
  duration = 2000,
}: {
  target: number;
  isDecimal?: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, isDecimal, duration]);

  return <div ref={elementRef}>{isDecimal ? count.toFixed(1) : count}</div>;
}

export function SocialProof() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when visible
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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#050505] px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-[#FF1493]">NG Braider</span> 💕
          </h2>
          <p className="text-white/70 text-xl">Trusted by thousands across Nigeria</p>
        </motion.div>

        {/* Interactive Review Card with Full Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 80px rgba(255, 20, 147, 0.6)',
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,20,147,0.4)] max-w-5xl mx-auto cursor-pointer outline-none focus:outline-none"
        >
          {/* Full Video Container */}
          <div className="relative overflow-hidden bg-black aspect-[9/16] w-full">
            <video
              ref={videoRef}
              src="/assets/videos/v/vio2.mp4"
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          </div>

          {/* Footer Stats Bar - Styled like Announcement Bar with Scrolling */}
          <div className="bg-[#FF1493] overflow-hidden py-3">
            <motion.div
              className="whitespace-nowrap text-white font-bold tracking-wide flex items-center"
              animate={{ x: [0, -1200] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ willChange: 'transform' }}
            >
              <span className="inline-flex items-center gap-8 px-4">
                <span className="flex items-baseline gap-1">
                  👥 <AnimatedCounter target={4800} duration={2000} /> + Customers
                </span>
                <span className="text-white/70">•</span>
                <span className="flex items-baseline gap-1">
                  ⭐ <AnimatedCounter target={4.9} isDecimal={true} duration={2000} /> / 5 Rating
                </span>
                <span className="text-white/70">•</span>
                <span className="flex items-baseline gap-1">
                  😊 <AnimatedCounter target={98} duration={2000} /> % Recommend
                </span>
              </span>
              <span className="inline-flex items-center gap-8 px-4">
                <span className="flex items-baseline gap-1">
                  👥 <AnimatedCounter target={4800} duration={2000} /> + Customers
                </span>
                <span className="text-white/70">•</span>
                <span className="flex items-baseline gap-1">
                  ⭐ <AnimatedCounter target={4.9} isDecimal={true} duration={2000} /> / 5 Rating
                </span>
                <span className="text-white/70">•</span>
                <span className="flex items-baseline gap-1">
                  😊 <AnimatedCounter target={98} duration={2000} /> % Recommend
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-8 items-center"
        >
          {[
            { text: 'Pay on Delivery', emoji: '💳' },
            { text: 'Free Nationwide Shipping', emoji: '🚚' },
            { text: '1-Year Warranty', emoji: '🛡️' },
            { text: '1-3 Days Delivery', emoji: '⚡' },
          ].map(
            (badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-[#0a0a0a] border border-[#FF1493] rounded-lg px-6 py-3 text-white/90 font-medium"
              >
                <span className="mr-2">{badge.emoji}</span>{badge.text}
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}