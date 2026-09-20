import { useEffect, useRef } from 'react';

/**
 * Starts the song when the experience opens. Browsers may require the first
 * tap or key press before allowing audio playback.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/song.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';
    audioRef.current = audio;

    const start = () => {
      void audio.play().catch(() => {
        // The first user interaction will retry playback if autoplay is blocked.
      });
    };

    start();
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      audioRef.current = null;
    };
  }, []);

  return null;
}
