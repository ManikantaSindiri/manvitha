import { useState } from 'react';
import { Lock, ArrowRight, Heart } from 'lucide-react';
import PetalBackground from '@/components/PetalBackground';
import { landing, entryPassword } from '@/data/content';

/**
 * Password gate shown before the landing page. Tanvitha must type the
 * password to enter. Once correct, the app remembers in localStorage so
 * she doesn't have to re-enter on refresh (but the proposal lock is
 * enforced separately by the database).
 */
export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === entryPassword.toLowerCase()) {
      setError(false);
      setLeaving(true);
      setTimeout(onUnlock, 700);
    } else {
      setError(true);
    }
  };

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream-50 via-warmwhite to-blush-50 px-6 text-center transition-all duration-700 ${
        leaving ? 'opacity-0 scale-105' : 'opacity-100'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 38%, rgba(255,209,220,0.55) 0%, transparent 70%)',
        }}
      />
      <PetalBackground count={12} />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blush-200 to-rose-200 text-rose-500 shadow-lg shadow-rose-200/50">
          <Lock className="h-7 w-7" strokeWidth={1.5} />
        </div>

        <p className="mb-2 font-sans text-xs uppercase tracking-[0.4em] text-burgundy-400/70">
          A little secret door
        </p>

        <h1 className="font-serif text-4xl leading-tight text-burgundy-700 sm:text-5xl">
          {landing.greeting}
          <span className="ml-2 inline-block animate-heartbeat text-blush-500">
            <Heart className="inline h-7 w-7 fill-blush-400" />
          </span>
        </h1>

        <p className="mt-4 font-serif text-lg italic text-burgundy-600/70">
          Type the magic word to get in.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 w-full">
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="The magic word..."
            autoFocus
            aria-label="Entry password"
            className={`w-full rounded-full border bg-white/70 px-6 py-3.5 text-center font-serif text-lg text-burgundy-700 outline-none transition backdrop-blur-sm placeholder:text-burgundy-300/50 focus:ring-2 ${
              error
                ? 'border-rose-400 focus:ring-rose-300'
                : 'border-blush-200 focus:border-rose-400 focus:ring-rose-200'
            }`}
          />
          {error && (
            <p className="mt-3 text-sm text-rose-500 animate-fade-in">
              That's not it. Try again, it's our little word.
            </p>
          )}

          <button
            type="submit"
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 px-8 py-4 font-sans text-sm font-medium tracking-wide text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-rose-500/50 active:scale-95"
          >
            <span>Enter</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  );
}
