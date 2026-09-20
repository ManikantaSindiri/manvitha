import { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import PetalBackground from '@/components/PetalBackground';
import { landing } from '@/data/content';

export default function Landing({ onOpen }: { onOpen: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const handleOpen = () => {
    setLeaving(true);
    setTimeout(onOpen, 900);
  };

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream-50 via-warmwhite to-blush-50 px-6 text-center transition-all duration-700 ${
        leaving ? 'opacity-0 scale-105' : 'opacity-100'
      }`}
    >
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 38%, rgba(255,209,220,0.55) 0%, transparent 70%)',
        }}
      />
      <PetalBackground count={16} />

      <div className="relative z-10 flex flex-col items-center">
        <p
          className="mb-3 font-sans text-xs uppercase tracking-[0.4em] text-burgundy-400/70 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          A letter, just for you
        </p>

        <h1
          className="font-serif text-5xl leading-tight text-burgundy-700 sm:text-6xl md:text-7xl animate-fade-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          {landing.greeting}
          <span className="ml-2 inline-block animate-heartbeat text-blush-500">
            <Heart className="inline h-8 w-8 fill-blush-400 md:h-10 md:w-10" />
          </span>
        </h1>

        <p
          className="mt-6 max-w-md font-serif text-xl italic text-burgundy-600/80 sm:text-2xl animate-fade-up"
          style={{ animationDelay: '0.9s', opacity: 0 }}
        >
          {landing.subline}
        </p>

        <button
          onClick={handleOpen}
          disabled={leaving}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 px-8 py-4 font-sans text-sm font-medium tracking-wide text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-rose-500/50 active:scale-95 disabled:opacity-0 animate-glow-pulse"
          style={{ animationDelay: '1.4s', opacity: 0, animationFillMode: 'both' }}
        >
          <span>{landing.button}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p
          className="mt-10 font-sans text-xs text-burgundy-400/50 animate-fade-in"
          style={{ animationDelay: '1.8s', opacity: 0 }}
        >
          Best experienced with sound on, at your own pace.
        </p>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-soft-pulse text-burgundy-400/40"
        aria-hidden="true"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
          scroll
        </span>
      </div>
    </section>
  );
}
