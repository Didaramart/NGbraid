import { StickyHeader } from './components/StickyHeader';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorks } from './components/HowItWorks';
import { Samples } from './components/Samples';
import { FiveReasons } from './components/FiveReasons';
import { SocialProof } from './components/SocialProof';
import { SeeInAction } from './components/SeeInAction';
import { PricingBundles } from './components/PricingBundles';
import { OrderFormSection } from './components/OrderFormSection';
import { Footer } from './components/Footer';
import { SocialProofNotification } from './components/SocialProofNotification';
import { AutoPlayAudio } from './components/AutoPlayAudio';
import { OrderPopup, OrderFormData } from './components/OrderPopup';
import { ThankYouPage } from './components/ThankYouPage';
import { BundleSelector } from './components/BundleSelector';
import { FloatingButton } from './components/FloatingButton';
import { ScrollReveal } from './components/ScrollReveal';
import { useState, useEffect } from 'react';

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBundleSelectorOpen, setIsBundleSelectorOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [suggestedQuantity, setSuggestedQuantity] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);

  useEffect(() => {
    // Listen for custom event to open popup or bundle selector
    const handleOpenPopup = (event: Event) => {
      const customEvent = event as CustomEvent<{ bundleId?: number; quantity?: number }>;
      // If bundleId is provided, open order popup directly
      if (customEvent.detail.bundleId !== undefined) {
        setSelectedBundle(customEvent.detail.bundleId);
        setSuggestedQuantity(customEvent.detail.quantity || 1);
        setIsPopupOpen(true);
      } else {
        // Otherwise, show bundle selector first
        setIsBundleSelectorOpen(true);
      }
    };

    window.addEventListener('openOrderPopup', handleOpenPopup);
    return () => window.removeEventListener('openOrderPopup', handleOpenPopup);
  }, []);

  const handleBundleSelect = (bundleId: number, quantity: number) => {
    setSelectedBundle(bundleId);
    setSuggestedQuantity(quantity);
    setIsPopupOpen(true);
  };

  const handleOrderSubmit = async (formData: OrderFormData) => {
    // Show thank you page immediately
    setOrderData(formData);
    setIsPopupOpen(false);
    setShowThankYou(true);
    console.log('Order received, thank you page displayed:', formData);

    // Send order to Formspree in the background
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
        }),
      });
      console.log('Form data sent to Formspree successfully');
    } catch (error) {
      console.error('Background form submission to Formspree failed:', error);
    }
  };
  if (showThankYou && orderData) {
    return (
      <ThankYouPage
        orderData={{
          fullName: orderData.fullName,
          phoneNumber: orderData.phoneNumber,
          whatsappNumber: orderData.whatsappNumber,
          deliveryAddress: orderData.deliveryAddress,
          state: orderData.state,
          bundle: orderData.bundle,
          quantity: orderData.quantity,
        }}
      />
    );
  }

  return (
    <div className="bg-[var(--color-background)] min-h-screen font-[var(--font-family-base)]">
      <StickyHeader isPopupOpen={isPopupOpen || isBundleSelectorOpen} />
      <ScrollReveal />
      
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorks />
        <Samples />
        <FiveReasons />
        <SocialProof />
        <SeeInAction />
        <PricingBundles />
      </main>

      <OrderFormSection />

      <Footer />
      
      {/* Floating Social Proof Notifications */}
      <SocialProofNotification />

      {/* Bundle Selector Modal */}
      <BundleSelector
        isOpen={isBundleSelectorOpen}
        onClose={() => setIsBundleSelectorOpen(false)}
        onSelectBundle={handleBundleSelect}
      />

      {/* Order Popup */}
      <OrderPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleOrderSubmit}
        selectedBundle={selectedBundle}
        suggestedQuantity={suggestedQuantity}
      />

      {/* Background audio that plays once after first user interaction */}
      <AutoPlayAudio />

      {/* Floating Button for Cart/Back-to-Top */}
      <FloatingButton 
        onOrderClick={() => window.dispatchEvent(new CustomEvent('openOrderPopup', { detail: {} }))}
      />
    </div>
  );
}