import { motion } from 'motion/react';
import { ShieldCheck, Lock } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const inputClasses = 'w-full bg-[var(--color-background)] border-2 border-[var(--color-brand-primary)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-primary)] focus:shadow-[var(--shadow-brand-sm)] transition-all placeholder-white/50';

const FormSection: React.FC<{
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}> = ({ stepNumber, title, children }) => (
  <fieldset className="mb-8">
    <legend className="sr-only">{title}</legend>
    <h3 className="text-white text-2xl font-[var(--font-weight-bold)] mb-6 flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-white font-[var(--font-weight-bold)]"
        aria-hidden="true"
      >
        {stepNumber}
      </div>
      {title}
    </h3>
    {children}
  </fieldset>
);

const FormField: React.FC<{
  label: string;
  id: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  icon?: React.ComponentType<{ className: string }>;
}> = ({ label, id, type = 'text', name, value, onChange, required, placeholder, icon: Icon }) => (
  <div>
    <label htmlFor={id} className="block text-[var(--color-foreground-muted)] mb-2 font-[var(--font-weight-medium)]">
      {label} {required && <span className="text-[var(--color-error)]">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClasses}
        placeholder={placeholder}
      />
      {Icon && (
        <Icon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[var(--color-brand-primary)] pointer-events-none" />
      )}
    </div>
  </div>
);

export function OrderForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show success message immediately
    alert('Order submitted! We will contact you shortly to confirm.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
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
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        }),
      });
    } catch (error) {
      console.error('Background form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-[var(--color-background)] px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white text-4xl lg:text-5xl font-[var(--font-weight-bold)] mb-4">
            Complete Your <span className="text-[var(--color-brand-primary)]">Order</span>
          </h2>
          <p className="text-[var(--color-foreground-muted)] text-xl">
            Limited time offer - 50% OFF expires in{' '}
            <span className="text-[var(--color-brand-primary)] font-[var(--font-weight-bold)]">2 hours!</span>
          </p>
        </motion.div>

        {/* Order Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)] border-2 border-[var(--color-brand-primary)] rounded-3xl p-8 md:p-12 shadow-[var(--shadow-brand-md)]"
        >
          {/* Step 1: Contact Information */}
          <FormSection stepNumber={1} title="Contact Information">
            <div className="space-y-4">
              <FormField
                label="Full Name"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@example.com"
                />
                <FormField
                  label="Phone"
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </FormSection>

          {/* Step 2: Shipping Address */}
          <FormSection stepNumber={2} title="Shipping Address">
            <div className="space-y-4">
              <FormField
                label="Street Address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main St"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  label="City"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                />
                <FormField
                  label="State"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="NY"
                />
                <FormField
                  label="ZIP Code"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                />
              </div>
            </div>
          </FormSection>

          {/* Security Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-[var(--color-foreground-muted)] text-sm">
              <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-foreground-muted)] text-sm">
              <Lock className="w-5 h-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-foreground-muted)] text-sm">
              <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <span>30-Day Guarantee</span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="shimmer-button w-full bg-white/10 text-white font-[var(--font-weight-bold)] text-2xl py-6 rounded-2xl backdrop-blur-md border border-[#FF1493]/40 hover:bg-white/20 hover:border-[#FF1493]/60 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            🔒 SECURE MY ORDER - 50% OFF
          </motion.button>

          <p className="text-center text-[var(--color-foreground-subtle)] text-sm mt-4">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
