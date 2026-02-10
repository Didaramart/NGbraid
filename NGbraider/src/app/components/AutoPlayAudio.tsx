import { useEffect, useRef } from 'react';

export function AutoPlayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const src = new URL('../../assets/audio/mp3.mpeg', import.meta.url).href;
    const audio = new Audio(src);
    audio.preload = 'auto';
    audioRef.current = audio;

    const tryPlay = async () => {
      if (playedRef.current) return;
      try {
        await audio.play();
        playedRef.current = true;
        removeListeners();
      } catch (e) {
        // Play failed (browser policy, etc.) — keep listeners to retry on next gesture
      }
    };

    const events = ['click', 'scroll', 'keydown', 'touchstart', 'pointerdown'] as const;

    const addListeners = () => events.forEach((ev) => window.addEventListener(ev, tryPlay, { passive: true }));
    const removeListeners = () => events.forEach((ev) => window.removeEventListener(ev, tryPlay));

    addListeners();

    // If user leaves page and returns, ensure autoplay only once per load
    return () => {
      removeListeners();
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (e) {}
      }
    };
  }, []);

  return null;
}
