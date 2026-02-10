import { motion } from 'motion/react';
import { CheckCircle, Phone, MessageCircle, Truck, Clock, Gift } from 'lucide-react';

interface ThankYouPageProps {
  orderData: {
    fullName: string;
    phoneNumber: string;
    whatsappNumber: string;
    deliveryAddress: string;
    state: string;
    bundle: number;
    quantity: number;
  };
}

interface InfoCard {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: React.ReactNode;
  detail?: React.ReactNode;
}

export function ThankYouPage({ orderData }: ThankYouPageProps) {
  const bundleDetails = [
    { name: '1 Braider', price: '₦24,999', items: '1x 360° Auto Braider' },
    { name: '2 Braiders', price: '₦49,998', items: '2x 360° Auto Braiders + Free Carrying Case' },
    { name: '3 Braiders', price: '₦74,997', items: '4x 360° Auto Braiders + Free Premium Carrying Case' },
  ];

  const selectedBundleInfo = bundleDetails[orderData.bundle];
  const bundleNames = ['Buy 1', 'Buy 2 (Best Value)', 'Buy 3 Get 1 Free'];
  const bundleName = bundleNames[orderData.bundle];
  const infoCards: InfoCard[] = [
    {
      icon: Phone,
      title: "We'll Contact You Shortly",
      description: (
        <>
          Our customer care team will contact you via <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-semibold)]">phone</span> or{' '}
          <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-semibold)]">WhatsApp</span> within the next few hours to confirm your order details and delivery address.
        </>
      ),
      detail: `Check WhatsApp: ${orderData.phoneNumber}`,
    },
    {
      icon: Truck,
      title: 'Fast & Free Delivery',
      description: (
        <>
          Your order will be delivered to <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-semibold)]">{orderData.state}</span> within{' '}
          <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-semibold)]">1-3 working days</span>.
        </>
      ),
      detail: 'FREE nationwide delivery included',
    },
  ];

  const promoPoints = [
    'FREE Delivery - No shipping fees at all',
    'Pay on Delivery - Cash or transfer when you receive',
    'Special Discount - Up to 70% off original price',
    '1-Year Warranty - Full manufacturer warranty',
  ];

  return (
    <div className="fixed inset-0 bg-[var(--color-background)] z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
          role="main"
          aria-label="Order confirmation page"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center shadow-[var(--shadow-brand-lg)]">
                <CheckCircle className="w-14 h-14 text-white" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-4xl lg:text-5xl font-[var(--font-weight-bold)] mb-4">
              Thank You<span className="text-[var(--color-brand-primary)]">,</span> {orderData.fullName}<span className="text-[var(--color-brand-primary)]">!</span> 🎉
            </h1>
            <p className="text-[var(--color-foreground-muted)] text-xl mb-2">
              Your order has been received successfully!
            </p>
            <p className="text-[var(--color-brand-primary)] text-lg font-[var(--font-weight-semibold)]">
              Order Confirmation Sent
            </p>
          </motion.div>

          {/* Order Receipt Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[var(--color-surface)] border-2 border-[var(--color-brand-primary)] rounded-2xl p-8 mb-8 shadow-[var(--shadow-brand-md)]"
          >
            <div className="text-center mb-6 pb-6 border-b border-[var(--color-border)]">
              <h2 className="text-white text-2xl font-[var(--font-weight-bold)] mb-2">📦 Order Receipt</h2>
              <p className="text-[var(--color-foreground-muted)] text-sm">Order ID: #{Date.now().toString().slice(-8)}</p>
            </div>

            {/* Order Items */}
            <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
              <h3 className="text-white font-[var(--font-weight-bold)] mb-4">Order Items</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-[var(--font-weight-semibold)]">{bundleName}</p>
                    <p className="text-[var(--color-foreground-muted)] text-sm">{selectedBundleInfo.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-[var(--font-weight-semibold)]">{selectedBundleInfo.price}</p>
                    <p className="text-[var(--color-foreground-muted)] text-sm">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
              <h3 className="text-white font-[var(--font-weight-bold)] mb-3">Delivery To</h3>
              <div className="space-y-2 text-[var(--color-foreground-muted)] text-sm">
                <p><span className="text-white font-[var(--font-weight-semibold)]">Name:</span> {orderData.fullName}</p>
                <p><span className="text-white font-[var(--font-weight-semibold)]">Location:</span> {orderData.state}</p>
                <p><span className="text-white font-[var(--font-weight-semibold)]">Address:</span> {orderData.deliveryAddress}</p>
                <p><span className="text-white font-[var(--font-weight-semibold)]">Contact:</span> {orderData.phoneNumber}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 bg-[var(--color-background)]/50 p-4 rounded-lg">
              <div className="flex justify-between text-[var(--color-foreground-muted)]">
                <span>Subtotal:</span>
                <span>{selectedBundleInfo.price}</span>
              </div>
              <div className="flex justify-between text-[var(--color-foreground-muted)]">
                <span>Shipping:</span>
                <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-semibold)]">FREE</span>
              </div>
              <div className="flex justify-between text-white font-[var(--font-weight-bold)] text-lg border-t border-[var(--color-border)] pt-2 mt-2">
                <span>Total:</span>
                <span className="text-[var(--color-brand-primary)]">{selectedBundleInfo.price}</span>
              </div>
              <p className="text-[var(--color-brand-primary)] text-xs font-[var(--font-weight-semibold)] mt-3">✓ Pay on Delivery</p>
            </div>
          </motion.div>

          {/* Information Cards */}
          <section aria-label="Order details" className="space-y-4 mb-8">
            {infoCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-[var(--color-surface)] border-2 border-[var(--color-brand-primary)] rounded-2xl p-6 shadow-[var(--shadow-brand-md)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-brand-primary)]/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[var(--color-brand-primary)]" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-[var(--font-weight-bold)] text-lg mb-2">{card.title}</h3>
                      <p className="text-[var(--color-foreground-muted)] leading-relaxed mb-3">{card.description}</p>
                      {card.detail && (
                        <div className="flex items-center gap-2 text-[var(--color-foreground-subtle)] text-sm">
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          <span>{card.detail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}

            {/* Promo Benefits */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              aria-label="Promotional benefits"
              className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-2xl p-6 shadow-[var(--shadow-brand-lg)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-[var(--font-weight-bold)] text-lg mb-3">
                    🎊 You're Lucky! Beginning-of-Year Promo Benefits:
                  </h3>
                  <ul className="space-y-2 text-white/95 flex flex-col items-center text-center">
                    {promoPoints.map((point, index) => (
                      <li key={index} className="flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          </section>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            role="note"
            className="bg-[var(--color-surface)]/50 border border-[var(--color-border)] rounded-xl p-4 mb-8"
          >
            <p className="text-[var(--color-foreground-subtle)] text-sm text-center leading-relaxed">
              <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-semibold)]">Important:</span> Please keep your phone nearby.
              Our team will call you to confirm your order. If you miss the call, we'll send a WhatsApp message.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-block text-[var(--color-brand-primary)] hover:text-white font-[var(--font-weight-semibold)] underline transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] rounded px-2"
              >
                ← Back to Home
              </button>

              <a
                href={`https://wa.me/13364596552?text=${encodeURIComponent('hi please am intrested in this product.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_8px_20px_rgba(37,211,102,0.18)] hover:bg-[#1ebe57] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path fill="currentColor" d="M20.52 3.48A11.91 11.91 0 0 0 12.01.01C6.48.01 1.98 4.51 1.98 10.04c0 1.77.46 3.5 1.34 5.02L.5 23.5l8.62-2.27a11.9 11.9 0 0 0 10.4-17.75zM12.01 20.9c-1.07 0-2.12-.28-3.02-.81l-.21-.13-5.12 1.35 1.36-4.99-.14-.25A8.05 8.05 0 0 1 3.98 10.04 8.01 8.01 0 0 1 11.99 2.04a8.02 8.02 0 0 1 7.02 11.86 7.98 7.98 0 0 1-7 4.99z" />
                  <path fill="#fff" d="M17.1 14.2c-.3-.15-1.77-.88-2.05-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.18.2-.36.22-.67.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.17.2-.3.3-.5.1-.2 0-.38-.01-.52-.01-.15-.68-1.64-.94-2.24-.25-.58-.5-.5-.68-.51-.18-.01-.39-.01-.6-.01-.2 0-.52.07-.8.38-.28.32-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.22 2.16 3.5 5.23 4.91 3.07 1.42 3.07.95 3.62.89.55-.06 1.77-.72 2.02-1.42.24-.7.24-1.3.17-1.42-.06-.12-.28-.19-.58-.34z" />
                </svg>
                <span className="font-[var(--font-weight-semibold)]">Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-[var(--color-foreground-subtle)] text-sm">
              Questions? WhatsApp us anytime!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
