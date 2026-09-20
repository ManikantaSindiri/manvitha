import ScrollReveal from '@/components/ScrollReveal';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { story, timeline } from '@/data/content';

export default function OurStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-gradient-to-b from-warmwhite via-cream-50 to-blush-50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="text-center font-serif text-4xl leading-tight text-burgundy-700 sm:text-5xl md:text-6xl">
            {story.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-12 space-y-2 text-center">
          {story.intro.map((line, i) => (
            <p
              key={i}
              className="font-serif text-xl italic text-burgundy-600/80 sm:text-2xl"
            >
              {line}
            </p>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-10 text-center font-serif text-2xl text-burgundy-700 sm:text-3xl">
            {story.reveal}
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-20">
          <div
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blush-300 via-rose-300 to-blush-200 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />
          <ul className="space-y-12">
            {timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={i}
                  className={`relative flex flex-col gap-4 pl-12 sm:pl-0 ${
                    left ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* node */}
                  <span
                    className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-400 ring-4 ring-warmwhite sm:left-1/2"
                    aria-hidden="true"
                  />
                  <div className="sm:w-1/2 sm:px-8">
                    <ScrollReveal>
                      <article className="glass rounded-3xl p-6 shadow-lg shadow-burgundy-900/5">
                        <div className="mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                          <PhotoPlaceholder
                            src={item.image}
                            alt={item.title}
                            fallbackHint={item.imageHint}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.3em] text-rose-400">
                          {item.label}
                        </p>
                        <h3 className="font-serif text-2xl text-burgundy-700">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-serif text-base italic text-burgundy-600/70">
                          {item.description}
                        </p>
                      </article>
                    </ScrollReveal>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
