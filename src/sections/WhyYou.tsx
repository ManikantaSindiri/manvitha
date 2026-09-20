import {
  Smile,
  HeartHandshake,
  ShieldCheck,
  Ear,
  Home,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { reasons, whyYou } from '@/data/content';

const ICONS: Record<string, LucideIcon> = {
  smile: Smile,
  'heart-handshake': HeartHandshake,
  'shield-check': ShieldCheck,
  ear: Ear,
  home: Home,
  sparkles: Sparkles,
  user: UserRound,
};

export default function WhyYou() {
  return (
    <section
      id="why-you"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-warmwhite to-blush-50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl text-burgundy-700 sm:text-5xl md:text-6xl">
            {whyYou.title}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = ICONS[r.icon] ?? Sparkles;
            return (
              <ScrollReveal key={i} delay={(i % 3) * 100}>
                <article className="group h-full rounded-3xl border border-blush-100 bg-white/60 p-7 shadow-md shadow-burgundy-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-100 to-rose-100 text-rose-500 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-burgundy-700">
                    {r.title}
                  </h3>
                  <p className="mt-2 font-serif text-base italic leading-relaxed text-burgundy-600/70">
                    {r.text}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-16 whitespace-pre-line text-center font-serif text-2xl italic text-burgundy-700 sm:text-3xl">
            {whyYou.closing}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
