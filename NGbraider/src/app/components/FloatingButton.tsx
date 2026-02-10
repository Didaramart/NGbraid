import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowUp } from 'lucide-react';

interface FloatingButtonProps {
  onOrderClick: () => void;
}

export function FloatingButton({ onOrderClick }: FloatingButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isBundleSection, setIsBundleSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Roughly the height of hero section

      // Show button after passing hero section (after scrolling ~100px past it)
      setIsVisible(scrollY > heroHeight + 100);

      // Check if user has reached bundle section (pricing bundles)
      const bundleSection = document.getElementById('pricing-bundles');
      if (bundleSection) {
        const bundleSectionPosition = bundleSection.getBoundingClientRect().top;
        setIsBundleSection(bundleSectionPosition < window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCartClick = () => {
    onOrderClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 z-40 pointer-events-none"
    >
      <motion.button
        onClick={isBundleSection ? handleBackToTop : handleCartClick}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-auto w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border-2 border-[#FF1493]/60 hover:bg-white/25 hover:border-[#FF1493]/80 shadow-lg hover:shadow-[0_0_30px_rgba(255,20,147,0.5)] transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
        aria-label={isBundleSection ? 'Back to top' : 'Order now'}
        title={isBundleSection ? 'Back to top' : 'Order now'}
      >
        {isBundleSection ? (
          <ArrowUp className="w-7 h-7 text-white" />
        ) : (
          <ShoppingCart className="w-7 h-7 text-white" />
        )}
      </motion.button>
    </motion.div>
  );
}
