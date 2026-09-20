import {
  Heart,
  Ear,
  ShieldCheck,
  Coffee,
  BookOpen,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { aboutMe } from '@/data/content';

const ICONS: Record<string, LucideIcon> = {
  heart: Heart,
  ear: Ear,
  'shield-check': ShieldCheck,
  coffee: Coffee,
  'book-open': BookOpen,
  sparkles: Sparkles,
};

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative overflow-hidden bg-gradient-to-b from-burgundy-800 via-burgundy-700 to-rose-100 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.4em] text-blush-200/70">
            {aboutMe.subtitle}
          </p>
          <h2 className="mt-3 text-center font-serif text-4xl text-cream-100 sm:text-5xl md:text-6xl">
            {aboutMe.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center font-serif text-lg italic leading-relaxed text-cream-100/70 sm:text-xl">
            {aboutMe.intro}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aboutMe.traits.map((trait, i) => {
            const Icon = ICONS[trait.icon] ?? Sparkles;
            return (
              <ScrollReveal key={i} delay={(i % 3) * 100}>
                <article className="group h-full rounded-3xl border border-cream-100/15 bg-burgundy-900/40 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blush-300/30 hover:bg-burgundy-900/60">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-300/20 to-rose-300/20 text-blush-200 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-cream-100 sm:text-2xl">
                    {trait.title}
                  </h3>
                  <p className="mt-2 font-serif text-base italic leading-relaxed text-cream-100/60">
                    {trait.text}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-16 whitespace-pre-line text-center font-serif text-2xl italic leading-relaxed text-cream-100/80 sm:text-3xl">
            {aboutMe.closing}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
