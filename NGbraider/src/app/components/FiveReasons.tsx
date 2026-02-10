import { motion } from 'motion/react';
import { RotateCw, Shield, Hand, Battery, Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface Reason {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: string;
}

export function FiveReasons() {
  const reasons: Reason[] = [
    {
      icon: RotateCw,
      title: '360° Rotation',
      description: 'Perfectly twisted braids from every angle with automatic rotation technology.',
    },
    {
      icon: Shield,
      title: 'Hair-Safe Sensor',
      description: 'Smart sensors prevent pulling and damage, keeping your hair healthy and protected.',
    },
    {
      icon: Hand,
      title: 'One-Handed Use',
      description: 'Ergonomic design lets you style with just one hand - no more arm fatigue.',
    },
    {
      icon: Battery,
      title: 'Long Battery Life',
      description: 'Up to 50 braids per charge with fast USB-C charging. Style anywhere, anytime.',
    },
    {
      icon: Sparkles,
      title: 'Salon Results',
      description: 'Professional-quality braids at home. Save hundreds on salon visits.',
    },
    {
      icon: RotateCw,
      title: 'Versatile Applications',
      description:
        "Not just for hair — use the braider for crafts like bracelets and rope knitting. Sparks creativity and expands practical skills.",
    },
  ];

  return (
    <section className="bg-[var(--color-surface)] px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl lg:text-5xl font-[var(--font-weight-bold)] mb-4">
            Why Men &amp; Women <span className="text-[var(--color-brand-primary)]">
              Love
            </span>{' '}
            It
          </h2>
          <p className="text-[var(--color-foreground-muted)] text-xl">The Ultimate Hair Braiding Solution</p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-background)] border-2 border-[var(--color-brand-primary)] rounded-2xl p-6 text-center shadow-[var(--shadow-brand-sm)] hover:shadow-[var(--shadow-brand-md)] transition-all focus-within:ring-2 focus-within:ring-[var(--color-brand-primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-background)]"
              >
                {/* Icon Circle */}
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center shadow-[var(--shadow-brand-sm)]">
                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-white text-lg font-[var(--font-weight-bold)] mb-3">{reason.title}</h3>
                <p className="text-[var(--color-foreground-muted)] text-sm leading-relaxed">{reason.description}</p>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openOrderPopup', { detail: {} }))}
            className="shimmer-button inline-flex items-center gap-3 bg-[#FF1493] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#FF1493]/90 transition-shadow shadow-lg"
          >
            ORDER NOW 🛒
          </button>
        </div>
      </div>
    </section>
  );
}
