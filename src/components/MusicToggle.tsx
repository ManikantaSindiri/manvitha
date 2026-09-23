import { useEffect, useRef } from 'react';

/**
 * Starts the song when the experience opens. Browsers may require the first
 * tap or key press before allowing audio playback.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/Oh%20Sita%20Hey%20Rama.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';
    audioRef.current = audio;

    const start = () => {
      void audio.play().then(() => {
        window.removeEventListener('pointerdown', start);
        window.removeEventListener('keydown', start);
        window.removeEventListener('touchstart', start);
      }).catch(() => {
        // Keep listening until a user gesture is accepted by the browser.
      });
    };

    start();
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);
    window.addEventListener('touchstart', start, { passive: true });

    return () => {
      audio.pause();
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
      audioRef.current = null;
    };
  }, []);

  return null;
}
