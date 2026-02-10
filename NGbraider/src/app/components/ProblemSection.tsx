import { useEffect, useRef } from 'react';
import '../../styles/carousel.css';

export function ProblemSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ensure the track width is duplicated for seamless scroll
    const el = trackRef.current;
    if (!el) return;
    // add animate class after mount to avoid jank on SSR
    requestAnimationFrame(() => el.classList.add('animate'));
  }, []);

  const images = [
    '/assets/images/placeholders/lc1.jpeg',
    '/assets/images/placeholders/lc2.jpeg',
    '/assets/images/placeholders/lc3.jpeg',
    '/assets/images/placeholders/lc4.jpeg',
    '/assets/images/placeholders/lc5.jpeg',
    '/assets/images/placeholders/lc6.jpeg',
  ];

  return (
    <section className="carousel-section">
      <div className="carousel-wrapper">
        <h2 className="carousel-title">The Struggle Is Real</h2>

        <div className="marquee" aria-hidden="false">
          <div ref={trackRef} className="marquee-track" role="list">
            {images.concat(images).map((src, i) => (
              <div role="listitem" key={i}>
                <img src={src} alt={`Product placeholder ${i % images.length + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
