import { motion } from 'motion/react';

const IMAGES = [
  new URL('../../assets/images/sample/p1.jpeg', import.meta.url).href,
  new URL('../../assets/images/sample/pm1.jpeg', import.meta.url).href,
  new URL('../../assets/images/sample/prod1.jpeg', import.meta.url).href,
  new URL('../../assets/images/sample/prod3.jpeg', import.meta.url).href,
  new URL('../../assets/images/sample/prod4.jpeg', import.meta.url).href,
  new URL('../../assets/images/sample/b3.jpeg', import.meta.url).href,
];

export function ProductView() {
  return (
    <section className="bg-[var(--color-surface)] px-4 py-12 mt-10 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <h3 className="text-white text-2xl font-bold">Product View</h3>
          <p className="text-[var(--color-foreground-muted)]">Gallery of actual product images</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {IMAGES.map((src, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="glossy-shimmer overflow-hidden rounded-xl bg-[var(--color-background)] p-2">
              <img src={src} alt={`Product ${i + 1}`} className="w-full h-48 object-cover rounded-lg" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
