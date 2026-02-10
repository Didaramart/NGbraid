import { motion } from 'motion/react';
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

export function OrderFormSection() {
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
      deliveryAvailable1to3Days: null,
      customDeliveryDate: '',
    });

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
          bundle: ['1 Braider', '2 Braiders', '3 Braiders'][formData.bundle],
          deliveryAvailable1to3Days: formData.deliveryAvailable1to3Days,
          customDeliveryDate: formData.customDeliveryDate,
        }),
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
              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FF1493] focus:outline-none focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="e.g., 0801234567"
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FF1493] focus:outline-none focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="e.g., 0801234567"
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FF1493] focus:outline-none focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  State *
                </label>
                <select
                  required
                  aria-label="Select your state"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white focus:border-[#FF1493] focus:outline-none focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all"
                >
                  <option value="">Select your state</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state} className="bg-[#0a0a0a]">
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Full Delivery Address *
                </label>
                <textarea
                  required
                  value={formData.deliveryAddress}
                  onChange={(e) => handleChange('deliveryAddress', e.target.value)}
                  placeholder="Enter your full delivery address (street, area, landmark)"
                  rows={3}
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FF1493] focus:outline-none focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  <Package className="w-4 h-4 inline mr-2" />
                  Select Bundle *
                </label>
                <select
                  required
                  aria-label="Select your bundle"
                  value={formData.bundle}
                  onChange={(e) => handleChange('bundle', parseInt(e.target.value))}
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white focus:border-[#FF1493] focus:outline-none focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all"
                >
                  <option value={0} className="bg-[#0a0a0a]">1 Braider - ₦24,999 (Save ₦20,001)</option>
                  <option value={1} className="bg-[#0a0a0a]">2 Braiders - ₦49,998 (Save ₦40,002) 🔥 BEST VALUE</option>
                  <option value={2} className="bg-[#0a0a0a]">3 Braiders - ₦74,997 (Save ₦105,003)</option>
                </select>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-3">
                  Can you receive the product between 1-3 days? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.deliveryAvailable1to3Days === true}
                      onChange={() => setFormData((prev) => ({ ...prev, deliveryAvailable1to3Days: true, customDeliveryDate: '' }))}
                      className="w-4 h-4 rounded border-2 border-[#FF1493] bg-[#050505] accent-[#FF1493] cursor-pointer"
                    />
                    <span className="text-white text-sm">Yes, I can receive it</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.deliveryAvailable1to3Days === false}
                      onChange={() => setShowDeliveryDateModal(true)}
                      className="w-4 h-4 rounded border-2 border-[#FF1493] bg-[#050505] accent-[#FF1493] cursor-pointer"
                    />
                    <span className="text-white text-sm">No, I need a different date</span>
                  </label>
                </div>
                {formData.deliveryAvailable1to3Days === false && formData.customDeliveryDate && (
                  <p className="text-[#FF1493] text-xs mt-2">Delivery date: {formData.customDeliveryDate}</p>
                )}
              </div>

              <div className="bg-[#FF1493]/10 border border-[#FF1493]/30 rounded-xl p-4">
                <p className="text-white/90 text-sm leading-relaxed">
                  <span className="font-bold text-[#FF1493]">Payment:</span> Pay on delivery (Cash or Transfer)<br />
                  <span className="font-bold text-[#FF1493]">Delivery:</span> 1-3 working days (FREE nationwide)<br />
                  <span className="font-bold text-[#FF1493]">Contact:</span> We'll call/WhatsApp to confirm your order
                </p>
              </div>
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

          {/* Delivery Date Modal */}
          {showDeliveryDateModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0a0a0a] border-4 border-[#FF1493] rounded-2xl p-6 max-w-sm w-full pointer-events-auto text-center"
              >
                <h3 className="text-white text-lg font-bold mb-4">When can you receive the product?</h3>
                <input
                  type="text"
                  placeholder="e.g., Next Tuesday, 5th March, 2 weeks"
                  value={formData.customDeliveryDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customDeliveryDate: e.target.value }))}
                  className="w-full bg-[#050505] border-2 border-[#FF1493]/50 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FF1493] focus:outline-none mb-4"
                />
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeliveryDateModal(false)}
                    disabled={!formData.customDeliveryDate}
                    className="flex-1 shimmer-button bg-[#FF1493] text-white font-bold py-3 rounded-xl hover:bg-[#FF1493]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowDeliveryDateModal(false);
                      setFormData((prev) => ({
                        ...prev,
                        deliveryAvailable1to3Days: null,
                        customDeliveryDate: '',
                      }));
                    }}
                    className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl border border-[#FF1493]/50 hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
          {showDeliveryDateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDeliveryDateModal(false);
                setFormData((prev) => ({
                  ...prev,
                  deliveryAvailable1to3Days: null,
                  customDeliveryDate: '',
                }));
              }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm pointer-events-auto"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
