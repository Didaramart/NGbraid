import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export function HowItWorks() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Clip',
      description: 'Attach the braider to your hair section',
      icon: '📎',
    },
    {
      number: '02',
      title: 'Twist',
      description: 'Press the button and let it auto-twist',
      icon: '🔄',
    },
    {
      number: '03',
      title: 'Style',
      description: 'Perfect braids ready in seconds!',
      icon: '✨',
    },
  ];

  return (
    <section className="bg-[#050505] px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="text-[#FF1493]">Works</span>
          </h2>
          <p className="text-white/70 text-xl">3 Simple Steps to Perfection</p>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 relative rounded-2xl overflow-hidden border-4 border-[#FF1493] shadow-[0_0_60px_rgba(255,20,147,0.4)] max-w-3xl mx-auto"
        >
            <div className="aspect-square bg-gradient-to-br from-[#1a0a1a] to-[#050505]">
            <video
              ref={videoRef}
              src="/assets/videos/mainvideo1.mp4"
              className="w-full h-full object-cover"
              controls
              loop
              playsInline
            />
            </div>


          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-[#FF1493] rounded-full px-4 py-2 text-white font-bold">
            How It Works
          </div>
        </motion.div>

        {/* Product Description + Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border-2 border-[#FF1493] rounded-2xl p-6 lg:p-10 mb-12 shadow-[0_0_30px_rgba(255,20,147,0.12)]"
        >
          <div className="prose prose-invert max-w-none text-white">
            <h3 className="text-2xl font-bold mb-3">Easy & Versatile Braiding</h3>
            <p>
              This Automatic Hair Braider na the easiest way to get fine braids fast. Package get 1 braider (batteries no
              include). Whether you want fancy braided style or simple twists, this tool go give you plenty ways to flex
              your creativity.
            </p>

            <h4 className="text-xl font-semibold mt-4">Make More Than Braids</h4>
            <p>
              No be only hair — this machine sabi craft too. You fit use am for bracelet, rope knitting, and more. E go
              boost your creativity and give you new skills wey everybody go notice.
            </p>

            <h4 className="text-xl font-semibold mt-4">How E Dey Work — Simple Steps</h4>
            <p>
              No stress. Put two hair buns for top hook, press to lock, flip the switch make e twist quick to the roots,
              remove, then tie with band. Anybody fit use am — mama, oga, young girl — e simple.
            </p>

            <h4 className="text-xl font-semibold mt-4">Light & Easy to Carry</h4>
            <p>
              Made from strong ABS and fine parts, this braider light and compact — perfect to carry for travel or keep
              for quick styles anytime. Put am for bag, go, and style anywhere.
            </p>

            <h4 className="text-xl font-semibold mt-4">Small Warnings — Make Am Work Well</h4>
            <p>
              For best result, comb your hair first. This braider best for long, straight, or smooth hair. If your hair
              short or very curly, e fit no work sharp-sharp. Follow small steps and you go dey happy with the results.
            </p>

            <h4 className="text-xl font-semibold mt-6">Small Product Story</h4>
            <p>
              This new automatic braider dey make styling easy — quick steps, quick results. E fit work with straight,
              curly, thick or thin hair (for best result, follow guideline) and e go help you create fine hairstyles fast.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold">Specifications</h5>
                <ul className="list-disc list-inside text-sm text-white/90 mt-2">
                  <li>Material: ABS + Electronic Components</li>
                  <li>Power: 25W - 39W</li>
                  <li>Battery: 2 × AA Batteries (Not Included)</li>
                  <li>Item Size: 220 × 80 mm / 8.66 × 3.15 in</li>
                  <li>Package Size: 220 × 80 × 35 mm / 8.66 × 3.15 × 1.38 in</li>
                  <li>Package Weight: 200 g / 7.05 ounce</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold">Package List</h5>
                <ul className="list-disc list-inside text-sm text-white/90 mt-2">
                  <li>1 × Automatic Hair Braid Tool</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openOrderPopup', { detail: {} }))}
                className="shimmer-button inline-flex items-center gap-3 bg-[#FF1493] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#FF1493]/90 transition-shadow shadow-lg"
              >
                ORDER NOW 🛒
              </button>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-[#0a0a0a] border-2 border-[#FF1493] rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(255,20,147,0.2)] hover:shadow-[0_0_50px_rgba(255,20,147,0.4)] transition-shadow">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-[#FF1493] text-sm font-bold mb-2">{step.number}</div>
                <h3 className="text-white text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg
                    className="w-8 h-8 text-[#FF1493]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
