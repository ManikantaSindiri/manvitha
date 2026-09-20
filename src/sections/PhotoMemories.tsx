import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { gallery } from '@/data/content';

export default function PhotoMemories() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((v) => (v === null ? v : (v + 1) % gallery.length));
      if (e.key === 'ArrowLeft')
        setActive((v) => (v === null ? v : (v - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  // masonry via CSS columns
  return (
    <section
      id="memories"
      className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-50 to-warmwhite px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.4em] text-rose-400">
            Moments I keep
          </p>
          <h2 className="mt-3 text-center font-serif text-4xl text-burgundy-700 sm:text-5xl">
            A little gallery of us
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center font-serif text-lg italic text-burgundy-600/70">
            Tap any photo to see it up close.
          </p>
        </ScrollReveal>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {gallery.map((photo, i) => (
            <ScrollReveal key={i} delay={(i % 3) * 80}>
              <button
                onClick={() => setActive(i)}
                className="group block w-full text-left"
                aria-label={`Open photo: ${photo.caption}`}
              >
                <figure className="polaroid transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm bg-blush-100">
                    <PhotoPlaceholder
                      src={photo.image}
                      alt={photo.caption}
                      fallbackHint={photo.imageHint}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 px-1">
                    <p className="font-script text-xl text-burgundy-700">
                      {photo.caption}
                    </p>
                    <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-burgundy-400/60">
                      {photo.date}
                    </p>
                  </figcaption>
                </figure>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fullscreen viewer */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-burgundy-900/80 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-2 z-10 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((v) => (v === null ? v : (v - 1 + gallery.length) % gallery.length));
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            className="absolute right-2 z-10 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((v) => (v === null ? v : (v + 1) % gallery.length));
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <figure
            className="relative max-h-[88vh] w-full max-w-2xl animate-rise"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream-100">
              <PhotoPlaceholder
                src={gallery[active].image}
                alt={gallery[active].caption}
                fallbackHint={gallery[active].imageHint}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-white">
              <p className="font-script text-2xl">{gallery[active].caption}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-white/60">
                {gallery[active].date}
              </p>
              <p className="mx-auto mt-3 max-w-md font-serif text-base italic text-white/80">
                {gallery[active].description}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
