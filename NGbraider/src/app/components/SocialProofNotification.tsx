import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  city: string;
  country: string;
  items: number;
  flag: string;
}

const notifications: Notification[] = [
  { id: 1, name: 'Grace Okoromadu', city: 'Lagos', country: 'Nigeria', items: 4, flag: '🇳🇬' },
  { id: 2, name: 'Nana Adebayo', city: 'Abuja', country: 'Nigeria', items: 2, flag: '🇳🇬' },
  { id: 3, name: 'Samuel Tunde', city: 'Ibadan', country: 'Nigeria', items: 1, flag: '🇳🇬' },
  { id: 4, name: 'Amina Yusuf', city: 'Kano', country: 'Nigeria', items: 3, flag: '🇳🇬' },
  { id: 5, name: 'Chidinma Okoro', city: 'Enugu', country: 'Nigeria', items: 1, flag: '🇳🇬' },
  { id: 6, name: 'Kossi Mensah', city: 'Port Harcourt', country: 'Nigeria', items: 2, flag: '🇳🇬' },
  { id: 7, name: 'Blessing Eze', city: 'Calabar', country: 'Nigeria', items: 2, flag: '🇳🇬' },
  { id: 8, name: 'Kwame Asante', city: 'Benin City', country: 'Nigeria', items: 1, flag: '🇳🇬' },
  { id: 9, name: 'Marie Kone', city: 'Warri', country: 'Nigeria', items: 3, flag: '🇳🇬' },
  { id: 10, name: 'Fatima Bello', city: 'Kaduna', country: 'Nigeria', items: 2, flag: '🇳🇬' },
];

export function SocialProofNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Show notification for 4 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(showTimer);
  }, [isVisible, currentIndex]);

  useEffect(() => {
    if (isVisible) return;

    // Wait 2 seconds before showing next notification
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(nextTimer);
  }, [isVisible]);

  const currentNotification = notifications[currentIndex];

  const handleClick = () => {
    // Open the bundle selector first (App listens for empty detail to show selector)
    const event = new CustomEvent('openOrderPopup', { detail: {} });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            onClick={handleClick}
            className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border-2 border-[#FF1493]/40 rounded-2xl shadow-lg px-4 py-3 max-w-xs cursor-pointer hover:scale-105 transition-all"
            role="status"
            aria-live="polite"
            aria-label={`New order placed: ${currentNotification.items} ${currentNotification.items === 1 ? 'item' : 'items'}`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)]/20 to-[var(--color-brand-secondary)]/20 border border-[var(--color-border)] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[var(--color-brand-primary)]" aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[var(--color-foreground-muted)] text-sm leading-relaxed">
                  Someone nearby just placed an order
                </p>
                <p className="text-[var(--color-foreground-subtle)] text-xs mt-0.5">
                  Ordered {currentNotification.items} {currentNotification.items === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Subtle pulse indicator */}
              <div className="flex-shrink-0">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
            {/* Chat-tail */}
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-[rgba(255,255,255,0.03)] border-b-2 border-l-2 border-[#FF1493]/40 rotate-45" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}