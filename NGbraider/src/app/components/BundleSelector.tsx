import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Zap } from 'lucide-react';

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

interface BundleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBundle: (bundleId: number, quantity: number) => void;
}

export function BundleSelector({ isOpen, onClose, onSelectBundle }: BundleSelectorProps) {
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
        '1x 360° Auto Braider',
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
      ],
    },
  ];

  const handleSelectBundle = (bundle: Bundle) => {
    onSelectBundle(bundle.id, bundle.quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0a0a0a] border-4 border-[#FF1493] rounded-3xl shadow-[0_0_80px_rgba(255,20,147,0.6)] max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF1493] to-[#ff1493cc] p-6 relative">
                <button
                  type="button"
                  aria-label="Close bundle selector"
                  onClick={onClose}
                  className="shimmer-button absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#FF1493]/50 hover:border-[#FF1493]/70 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="text-center">
                  <h2 className="text-white text-3xl font-bold">Choose Your Bundle</h2>
                  <p className="text-white/90 text-sm mt-1">Select a bundle to continue with your order</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid md:grid-cols-3 gap-6">
                  {bundles.map((bundle) => (
                    <motion.div
                      key={bundle.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectBundle(bundle)}
                      className={`relative bg-[var(--color-background)] rounded-2xl p-6 cursor-pointer transition-all text-center flex flex-col items-center ${
                        bundle.popular
                          ? 'border-4 border-[#FF1493] shadow-[0_0_40px_rgba(255,20,147,0.4)]'
                          : 'border-2 border-[var(--color-border)]'
                      }`}
                    >
                      {/* Popular Badge */}
                      {bundle.popular && (
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF1493] text-white font-bold px-4 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg"
                        >
                          <Zap className="w-3 h-3 fill-white" />
                          BEST VALUE
                        </motion.div>
                      )}

                      {/* Bundle Info */}
                      <h3 className="text-white text-xl font-bold mb-1">{bundle.name}</h3>
                      <p className="text-[#FF1493] text-xs font-semibold mb-4">{bundle.subtitle}</p>

                      {/* Price */}
                      <div className="mb-4 text-center">
                        <del className="text-white/50 line-through text-sm block">{bundle.originalPrice}</del>
                        <div className="text-white text-3xl font-bold">{bundle.price}</div>
                        <p className="text-[#FF1493] font-semibold text-xs">{bundle.savings}</p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-6 flex flex-col items-center text-center">
                        {bundle.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/80 text-xs justify-center">
                            <Check className="w-4 h-4 text-[#FF1493] flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Select Button */}
                      <motion.button
                        type="button"
                        className={`shimmer-button w-full py-3 rounded-xl font-bold text-sm transition-all ${
                          bundle.popular
                            ? 'bg-[#FF1493] text-white hover:bg-[#FF1493]/90'
                            : 'bg-white/10 text-white border border-[#FF1493]/50 hover:bg-white/20 hover:border-[#FF1493]/70'
                        }`}
                      >
                        SELECT THIS BUNDLE 🛒
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
