import { useEffect, useRef, useState } from 'react';
import { realization } from '@/data/content';

/**
 * Cinematic section: starts dark, each line appears in sequence as you scroll
 * into view, then warms to blush as the final line lands.
 */
export default function TheRealization() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [warmed, setWarmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReduced) {
              setStep(realization.lines.length);
              setWarmed(true);
              return;
            }
            realization.lines.forEach((_, i) => {
              setTimeout(() => setStep(i + 1), i * 1400);
            });
            setTimeout(
              () => setWarmed(true),
              realization.lines.length * 1400 + 600
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progress = step / realization.lines.length;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 transition-colors duration-[2500ms]"
      style={{
        backgroundColor: warmed
          ? '#5a2230'
          : `rgb(${26 + progress * 50}, ${16 + progress * 22}, ${21 + progress * 26})`,
      }}
    >
      {/* warm glow that grows with progress */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[2500ms]"
        style={{
          opacity: warmed ? 1 : progress * 0.5,
          background:
            'radial-gradient(50% 45% at 50% 50%, rgba(247,106,142,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {realization.lines.map((line, i) => {
          const shown = step > i;
          const isLast = i === realization.lines.length - 1;
          return (
            <p
              key={i}
              className={`mb-6 font-serif transition-all duration-1000 ${
                isLast ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
              } ${
                shown
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              } ${isLast ? 'text-blush-200' : 'text-cream-100/85'}`}
            >
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
}
