import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface StickyHeaderProps {
  isPopupOpen?: boolean;
}

export function StickyHeader({ isPopupOpen = false }: StickyHeaderProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 18,
  });
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll detection for header collapse/expand
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // If scrolling down, hide header. If scrolling up, show it
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else {
          // Scrolling up
          setIsHeaderVisible(true);
        }
        lastScrollYRef.current = currentScrollY;
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleOrderNow = () => {
    const event = new CustomEvent('openOrderPopup', { detail: {} });
    window.dispatchEvent(event);
  };

  const shouldShowHeader = !isPopupOpen && isHeaderVisible;

  return (
    <header
      className="sticky top-0 z-50 bg-[var(--color-background)] font-[var(--font-family-base)] overflow-hidden"
      aria-hidden={isPopupOpen}
    >
      {/* Scrolling Announcement Bar - hidden when popup is open */}
      {!isPopupOpen && (
        <div
          className="bg-[var(--color-brand-primary)] overflow-hidden py-2"
          role="region"
          aria-live="polite"
          aria-label="Promotional announcement"
        >
          <motion.div
            className="whitespace-nowrap text-white font-semibold tracking-wide"
            animate={{ x: [0, -800] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
            aria-hidden="true"
            style={{ willChange: 'transform' }}
          >
            <span className="inline-block px-4">
              🔥 Hurry! Men & Women ordering now! 🔥 Limited Stock! 🔥 FREE Delivery Nationwide! 🔥
            </span>
            <span className="inline-block px-4">
              🔥 Hurry! Men & Women ordering now! 🔥 Limited Stock! 🔥 FREE Delivery Nationwide! 🔥
            </span>
          </motion.div>
        </div>
      )}

      {/* Main Header Bar with CTA and Timer */}
      <motion.div
        initial={{ height: 'auto' }}
        animate={{ height: shouldShowHeader ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-[var(--color-background)] border-b border-[var(--color-border)] overflow-hidden"
      >
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-brand-primary)] font-bold text-lg">360° BRAIDER</span>
          </div>

          {/* Timer Display - Hidden on small screens */}
          <div className="hidden md:flex items-center gap-2 text-[var(--color-foreground-muted)] text-sm">
            <span>Sale ends in:</span>
            <div className="flex gap-2">
              <span className="bg-[var(--color-brand-primary)] text-black font-bold px-2 py-1 rounded min-w-[2rem] text-center" aria-label={`${timeLeft.hours} hours`}>
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span aria-hidden="true">:</span>
              <span className="bg-[var(--color-brand-primary)] text-black font-bold px-2 py-1 rounded min-w-[2rem] text-center" aria-label={`${timeLeft.minutes} minutes`}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span aria-hidden="true">:</span>
              <span className="bg-[var(--color-brand-primary)] text-black font-bold px-2 py-1 rounded min-w-[2rem] text-center" aria-label={`${timeLeft.seconds} seconds`}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/13364596552?text=${encodeURIComponent('hi please am intrested in this product.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-button bg-[#25D366]/20 text-white font-bold px-4 py-2 rounded-lg backdrop-blur-md border border-[#25D366]/60 hover:bg-[#25D366]/30 hover:border-[#25D366]/80 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] flex items-center gap-2"
              aria-label="Chat on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                <path fill="currentColor" d="M20.52 3.48A11.91 11.91 0 0 0 12.01.01C6.48.01 1.98 4.51 1.98 10.04c0 1.77.46 3.5 1.34 5.02L.5 23.5l8.62-2.27a11.9 11.9 0 0 0 10.4-17.75zM12.01 20.9c-1.07 0-2.12-.28-3.02-.81l-.21-.13-5.12 1.35 1.36-4.99-.14-.25A8.05 8.05 0 0 1 3.98 10.04 8.01 8.01 0 0 1 11.99 2.04a8.02 8.02 0 0 1 7.02 11.86 7.98 7.98 0 0 1-7 4.99z" />
                <path fill="#25D366" d="M17.1 14.2c-.3-.15-1.77-.88-2.05-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.18.2-.36.22-.67.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.17.2-.3.3-.5.1-.2 0-.38-.01-.52-.01-.15-.68-1.64-.94-2.24-.25-.58-.5-.5-.68-.51-.18-.01-.39-.01-.6-.01-.2 0-.52.07-.8.38-.28.32-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.22 2.16 3.5 5.23 4.91 3.07 1.42 3.07.95 3.62.89.55-.06 1.77-.72 2.02-1.42.24-.7.24-1.3.17-1.42-.06-.12-.28-.19-.58-.34z" />
              </svg>
              <span className="hidden sm:inline">WHATSAPP</span>
            </a>

            {/* Order Now Button */}
            <button
              onClick={handleOrderNow}
              className="shimmer-button bg-white/10 text-white font-bold px-6 py-2 rounded-lg backdrop-blur-md border border-[#FF1493]/50 hover:bg-white/20 hover:border-[#FF1493]/70 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
              aria-label="Begin ordering process"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
      </motion.div>
    </header>
  );
}