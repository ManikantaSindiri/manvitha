import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { letter } from '@/data/content';

export default function LoveLetter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [started, setStarted] = useState(false);

  const fullText = letter.body.join('\n');
  const totalChars = fullText.length;

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
            setStarted(true);
            if (prefersReduced) {
              setRevealed(totalChars);
            } else {
              let i = 0;
              const interval = setInterval(() => {
                i += 2;
                setRevealed(Math.min(i, totalChars));
                if (i >= totalChars) clearInterval(interval);
              }, 24);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalChars]);

  const visibleText = fullText.slice(0, revealed);
  const typing = started && revealed < totalChars;

  return (
    <section
      id="letter"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-burgundy-600 via-burgundy-700 to-burgundy-800 px-6 py-24 sm:py-32"
    >
      {/* paper sheet */}
      <ScrollReveal>
        <div className="mx-auto max-w-2xl">
          <div className="relative rounded-[2rem] bg-cream-50 p-8 shadow-2xl shadow-burgundy-900/40 sm:p-12">
            {/* deckle edge glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  'radial-gradient(80% 60% at 50% 0%, rgba(255,209,220,0.4), transparent 70%)',
              }}
            />
            <h2 className="relative font-script text-4xl text-burgundy-700 sm:text-5xl">
              {letter.salutation}
            </h2>

            <div className="relative mt-6 min-h-[20rem]">
              <p
                className={`whitespace-pre-line font-serif text-lg leading-relaxed text-burgundy-700/90 sm:text-xl ${
                  typing ? 'letter-cursor' : ''
                }`}
              >
                {visibleText}
              </p>
            </div>

            <div className="relative mt-8 text-right">
              <p className="font-serif text-base italic text-burgundy-600/70">
                {letter.signoff}
              </p>
              <p className="mt-1 font-script text-3xl text-burgundy-700 sm:text-4xl">
                {letter.signature}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
