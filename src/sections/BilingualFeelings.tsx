import ScrollReveal from '@/components/ScrollReveal';
import { feelings } from '@/data/content';

export default function BilingualFeelings() {
  return (
    <section
      id="feelings"
      className="relative overflow-hidden bg-gradient-to-b from-warmwhite via-blush-50 to-cream-50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.4em] text-rose-400">
            In two languages
          </p>
          <h2 className="mt-3 text-center font-serif text-4xl text-burgundy-700 sm:text-5xl">
            What my heart says
          </h2>
        </ScrollReveal>

        <div className="mt-14 space-y-10">
          {feelings.map((f, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <article className="glass rounded-3xl p-8 shadow-lg shadow-burgundy-900/5 sm:p-10">
                <p className="whitespace-pre-line font-telugu text-2xl leading-relaxed text-burgundy-700 sm:text-3xl">
                  {f.telugu}
                </p>
                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-blush-200" />
                  <span className="font-serif text-rose-400">✦</span>
                  <span className="h-px flex-1 bg-blush-200" />
                </div>
                <p className="whitespace-pre-line font-serif text-xl italic leading-relaxed text-burgundy-600/80 sm:text-2xl">
                  {f.english}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
