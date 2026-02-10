import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // If user prefers reduced motion, make sections visible immediately
      document.querySelectorAll('section').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            // once visible, unobserve to avoid repeated work
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    sections.forEach((section) => {
      // add base reveal class if not present
      if (!section.classList.contains('reveal')) {
        section.classList.add('reveal');
      }
      observer.observe(section);
    });

    // Observe for dynamically added sections
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.tagName.toLowerCase() === 'section') {
            const s = node as HTMLElement;
            if (!s.classList.contains('reveal')) s.classList.add('reveal');
            observer.observe(s);
          }
          // also check within container for nested sections
          node.querySelectorAll?.('section').forEach((nested: Element) => {
            const s = nested as HTMLElement;
            if (!s.classList.contains('reveal')) s.classList.add('reveal');
            observer.observe(s);
          });
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
