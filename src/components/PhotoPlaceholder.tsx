import { useState } from 'react';
import { ImageOff } from 'lucide-react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  /** Fallback gradient while no real photo is uploaded. */
  fallbackHint?: string;
};

/**
 * Image with graceful fallback. Drop your real photos at the path in `src`
 * (see src/data/content.ts) and they'll appear automatically — no code change
 * needed. Until then, a soft gradient placeholder is shown.
 */
export default function PhotoPlaceholder({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackHint,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-blush-100 via-cream-100 to-rose-100 ${className}`}
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 text-burgundy-400/60">
          <ImageOff className="h-6 w-6" strokeWidth={1.4} />
          {fallbackHint && (
            <span className="font-serif text-xs italic tracking-wide">
              {fallbackHint}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
