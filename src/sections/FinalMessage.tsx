import ScrollReveal from '@/components/ScrollReveal';
import PetalBackground from '@/components/PetalBackground';
import { finalMessage } from '@/data/content';

export default function FinalMessage() {
  return (
    <section
      id="final"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-burgundy-700 via-burgundy-800 to-burgundy-900 px-6 py-24 text-center"
    >
      <PetalBackground count={14} />

      <div className="relative z-10 mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="whitespace-pre-line font-serif text-2xl italic leading-relaxed text-cream-100/90 sm:text-3xl">
            {finalMessage.text}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mt-10 whitespace-pre-line font-telugu text-xl leading-relaxed text-blush-200/90 sm:text-2xl">
            {finalMessage.telugu}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="mt-14">
            <p className="font-serif text-lg italic text-cream-100/60">
              {finalMessage.signoff}
            </p>
            <p className="mt-2 font-script text-4xl text-blush-200 sm:text-5xl">
              {finalMessage.signature}
              <span className="ml-2 text-blush-300">❤</span>
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={700}>
          <div className="mx-auto mt-16 max-w-xs">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blush-300/40 to-transparent" />
            <p className="mt-6 font-serif text-lg italic text-cream-100/50">
              {finalMessage.closing}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
