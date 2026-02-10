import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MapPin, Phone, User, Package } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  deliveryAddress: string;
  state: string;
  quantity: number;
  bundle: number;
  deliveryAvailable1to3Days?: boolean | null;
  customDeliveryDate?: string;
}

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export function OrderFormSectionBackup() {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    deliveryAddress: '',
    state: '',
    quantity: 1,
    bundle: 1,
    deliveryAvailable1to3Days: null,
    customDeliveryDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeliveryDateModal, setShowDeliveryDateModal] = useState(false);

  // Listen for bundle selection from PricingBundles
  useEffect(() => {
    const handleBundleSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ bundleId: number; quantity: number }>;
      setFormData((prev) => ({
        ...prev,
        bundle: customEvent.detail.bundleId,
        quantity: customEvent.detail.quantity,
      }));
    };

    window.addEventListener('bundleSelected', handleBundleSelected);
    return () => window.removeEventListener('bundleSelected', handleBundleSelected);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show success message immediately
    alert('Order submitted! We will contact you shortly to confirm.');
    setFormData({
      fullName: '',
      phoneNumber: '',
      whatsappNumber: '',
      deliveryAddress: '',
      state: '',
      quantity: 1,
      bundle: 1,
    });

    // Send to Formspree in the background
    try {
      await fetch('https://formspree.io/f/mgolvkoa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          whatsappNumber: formData.whatsappNumber,
          deliveryAddress: formData.deliveryAddress,
          state: formData.state,
          quantity: formData.quantity,
          bundle: ['1 Braider', '2 Braiders', '3 Braiders'][formData.bundle],                deliveryAvailable1to3Days: formData.deliveryAvailable1to3Days,
                customDeliveryDate: formData.customDeliveryDate,        }),
      });
    } catch (error) {
      console.error('Background form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof OrderFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="order-form-section" className="bg-[var(--color-surface)] px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-[#FF1493] to-[#ff1493cc] p-6 rounded-2xl inline-block">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">Complete Your Order</h2>
                <p className="text-white/90 text-sm">Fill the form below to place your order</p>
              </div>
            </div>

            <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3">
              <p className="text-white text-sm font-semibold">
                🎉 Beginning-of-Year Promo: <span className="text-black">FREE Delivery + Pay on Delivery!</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-background)] border-2 border-[var(--color-brand-primary)] rounded-3xl p-8 md:p-12 shadow-[var(--shadow-brand-md)]"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* (form fields...) copied from original */}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-button w-full bg-white/10 text-white font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-md border border-[#FF1493]/40 hover:bg-white/20 hover:border-[#FF1493]/60 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              PLACE ORDER NOW 🎉
            </motion.button>

            <p className="text-white/50 text-xs text-center mt-4">By placing this order, you agree to our terms and conditions</p>
          </form>

          {/* Delivery Date Modal (omitted in backup for brevity) */}
        </motion.div>
      </div>
    </section>
  );
}
