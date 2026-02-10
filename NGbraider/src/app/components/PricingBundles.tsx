import { motion } from 'motion/react';
import { Check, Zap } from 'lucide-react';
import { useState } from 'react';
import { ProductView } from './ProductView';

interface Bundle {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  savings: string;
  popular: boolean;
  features: string[];
  quantity: number;
}

export function PricingBundles() {
  const [selectedBundle, setSelectedBundle] = useState(1);

  const bundles: Bundle[] = [
    {
      id: 0,
      name: 'Buy 1',
      subtitle: 'Single Unit',
      price: '₦24,999',
      originalPrice: '₦45,000',
      savings: 'Save ₦20,001',
      popular: false,
      quantity: 1,
      features: [
        '1x 360° Auto Braider (Batteries not included)',
        'Material: ABS + Electronic Components',
        'Power: 25W-39W',
        'USB-C Cable',
        'User Manual',
        '1-Year Warranty',
      ],
    },
    {
      id: 1,
      name: 'Buy 2',
      subtitle: 'Best Value',
      price: '₦49,998',
      originalPrice: '₦90,000',
      savings: 'Save ₦40,002',
      popular: true,
      quantity: 2,
      features: [
        '2x 360° Auto Braiders',
        '2x USB-C Cables',
        'User Manual',
        '1-Year Warranty',
        'Free Carrying Case',
      ],
    },
    {
      id: 2,
      name: 'Buy 3 Get 1 Free',
      subtitle: 'Ultimate Bundle',
      price: '₦74,997',
      originalPrice: '₦180,000',
      savings: 'Save ₦105,003',
      popular: false,
      quantity: 4,
      features: [
        '4x 360° Auto Braiders',
        '4x USB-C Cables',
        'User Manual',
        '1-Year Warranty',
        'Free Premium Carrying Case',
        'Extra Hair Clips Set',
      ],
    },
  ];

  const handleSelectBundle = (id: number) => {
    const bundle = bundles.find((b) => b.id === id);
    setSelectedBundle(id);
    // Dispatch bundle selection event
    const event = new CustomEvent('bundleSelected', { detail: { bundleId: id, quantity: bundle?.quantity || 1 } });
    window.dispatchEvent(event);
    // Scroll to the main order form section
    setTimeout(() => {
      const orderFormSection = document.getElementById('order-form-section');
      if (orderFormSection) {
        orderFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section id="pricing-bundles" className="bg-[var(--color-surface)] px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="text-[var(--color-brand-primary)]">Bundle</span>
          </h2>
          <p className="text-[var(--color-foreground-muted)] text-xl">Save more when you buy multiple!</p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {bundles.map((bundle, index) => (
            <motion.article
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-[var(--color-background)] rounded-3xl p-8 transition-all ${
                bundle.popular
                  ? 'border-4 border-[var(--color-brand-primary)] shadow-[var(--shadow-brand-lg)]'
                  : 'border-2 border-[var(--color-border)] shadow-[var(--shadow-brand-sm)]'
              } ${selectedBundle === bundle.id ? 'scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {bundle.popular && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-brand-primary)] text-white font-bold px-6 py-2 rounded-full shadow-[var(--shadow-brand-md)] flex items-center gap-2"
                  aria-label="Most popular option"
                >
                  <Zap className="w-4 h-4 fill-white" aria-hidden="true" />
                  <span>MOST POPULAR</span>
                </motion.div>
              )}

              {/* Card Header */}
              <div className="text-center mb-6 mt-4 h-16 flex flex-col justify-center">
                <h3 className="text-white text-2xl font-[var(--font-weight-bold)] mb-1 line-clamp-2">{bundle.name}</h3>
                <p className="text-[var(--color-brand-primary)] text-sm font-[var(--font-weight-semibold)]">{bundle.subtitle}</p>
              </div>

              {/* Price Section */}
              <div className="text-center mb-6 h-32 flex flex-col justify-center">
                <del className="text-[var(--color-foreground-subtle)] line-through text-lg block mb-1">
                  {bundle.originalPrice}
                </del>
                <div className="text-white text-5xl font-[var(--font-weight-bold)] mb-2">{bundle.price}</div>
                {bundle.savings && (
                  <div className="text-[var(--color-brand-primary)] font-[var(--font-weight-bold)] text-sm">{bundle.savings}</div>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 min-h-[200px] flex flex-col justify-start items-center text-center" aria-label={`Features included in ${bundle.name} package`}>
                {bundle.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center justify-center gap-3 text-[var(--color-foreground-muted)] text-sm h-6">
                    <Check className="w-5 h-5 text-[var(--color-brand-primary)] flex-shrink-0" aria-hidden="true" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectBundle(bundle.id)}
                type="button"
                className={`shimmer-button w-full py-4 rounded-xl font-[var(--font-weight-bold)] text-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] ${
                  bundle.popular
                    ? 'bg-white/15 text-white backdrop-blur-md border border-[#FF1493]/60 hover:bg-white/25 hover:border-[#FF1493]/80 focus:ring-white shadow-lg hover:shadow-xl'
                    : 'bg-white/10 text-white border border-[#FF1493]/40 backdrop-blur-md hover:bg-white/20 hover:border-[#FF1493]/60 focus:ring-white/50 shadow-lg hover:shadow-xl'
                }`}
                aria-pressed={selectedBundle === bundle.id}
              >
                {selectedBundle === bundle.id ? 'SELECTED ✓' : 'SELECT BUNDLE'}
              </motion.button>
            </motion.article>
          ))}
        </div>

        {/* Insert product images gallery close to bundle selection */}
        <ProductView />

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-[var(--color-background)] border-2 border-[var(--color-brand-primary)] rounded-full px-8 py-4 shadow-[var(--shadow-brand-md)]">
            <Check className="w-6 h-6 text-[var(--color-brand-primary)]" aria-hidden="true" />
            <span className="text-white font-[var(--font-weight-semibold)]">
              30-Day Money-Back Guarantee • Free Shipping • Secure Checkout
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}