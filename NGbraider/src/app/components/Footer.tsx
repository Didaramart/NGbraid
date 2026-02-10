import { motion } from 'motion/react';
import { Phone, MessageCircle, Truck, Clock } from 'lucide-react';

interface FooterSection {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  items: string[];
}

export function Footer() {
  const footerSections: FooterSection[] = [
    {
      icon: Phone,
      title: 'Contact Us',
      items: ['📞 +1(336)4596552 (WhatsApp)', '💬 Click to chat 24/7'],
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      items: ['Chat with us 24/7', '+1(336)4596552'],
    },
    {
      icon: Truck,
      title: 'Delivery',
      items: ['FREE Nationwide', 'All 36 States + FCT'],
    },
    {
      icon: Clock,
      title: 'Payment',
      items: ['Pay on Delivery', 'Cash or Transfer'],
    },
  ];

  return (
    <footer className="bg-[var(--color-background)] border-t-4 border-[var(--color-brand-primary)] font-[var(--font-family-base)]">
      {/* Promotional Banner */}
      <div
        className="bg-[var(--color-brand-primary)] overflow-hidden py-3"
        role="region"
        aria-live="off"
        aria-label="Promotional information"
      >
        <motion.div
          className="whitespace-nowrap text-white font-semibold tracking-wide text-lg"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          aria-hidden="true"
        >
          <span className="inline-block px-6">
            ✨ Lightweight ABS design • Portable 220×80mm • Perfect for travel
          </span>
          
          <span className="inline-block px-6">
            📞 WhatsApp: +1(336)4596552
          </span>
          <span className="inline-block px-6">
            🚚 FREE Delivery Nationwide (1-3 Days)
          </span>
          <span className="inline-block px-6">
            💵 Pay on Delivery Available
          </span>
          <span className="inline-block px-6">
            🎁 Beginning-of-Year Promo - Limited Stock!
          </span>
          <span className="inline-block px-6">
            📞 WhatsApp: +1(336)4596552
          </span>
          <span className="inline-block px-6">
            🚚 FREE Delivery Nationwide (1-3 Days)
          </span>
          <span className="inline-block px-6">
            💵 Pay on Delivery Available
          </span>
          <span className="inline-block px-6">
            🎁 Beginning-of-Year Promo - Limited Stock!
          </span>
        </motion.div>
      </div>

      {/* Contact & Info Section */}
      <section className="bg-[var(--color-surface)] px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <nav className="grid md:grid-cols-4 gap-6 text-center md:text-left">
            {footerSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.title} className="space-y-3">
                  <h3 className="text-[var(--color-brand-primary)] font-[var(--font-weight-bold)] text-lg flex items-center justify-center md:justify-start gap-2">
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                    {section.title}
                  </h3>
                  <ul className="text-[var(--color-foreground-muted)] text-sm space-y-1 flex flex-col items-center md:items-start">
                    {section.items.map((item, index) => (
                      <li key={index} className="text-center md:text-left">{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Copyright Bar */}
      <div className="bg-[var(--color-background)] border-t border-[var(--color-border)] px-4 py-4">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <div className="text-[var(--color-brand-primary)] font-[var(--font-weight-bold)] text-xl">
            360° AUTOMATIC HAIR BRAIDER
          </div>
          <p className="text-[var(--color-foreground-subtle)] text-sm">
            © 2026 360° Auto Braider Nigeria. All rights reserved. Made with ❤️ for men and women.
          </p>
        </div>
      </div>
    </footer>
  );
}