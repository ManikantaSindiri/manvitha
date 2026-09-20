import { useEffect, useMemo, useState } from 'react';

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  hue: string;
  kind: 'petal' | 'heart' | 'spark';
};

const HUES = ['#ffd1dc', '#ffb3c6', '#ff8aa8', '#fbb0bd', '#fdd1d9', '#fff5f7'];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function PetalBackground({
  count = 18,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = Math.random();
      const kind: Petal['kind'] =
        r > 0.82 ? 'heart' : r > 0.55 ? 'spark' : 'petal';
      return {
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 18,
        drift: (Math.random() - 0.5) * 80,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        kind,
      };
    });
  }, [count]);

  if (reduced || !mounted) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error custom prop
            '--drift': `${p.drift}px`,
          }}
        >
          {p.kind === 'heart' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.hue}
              style={{ opacity: 0.55 }}
            >
              <path d="M12 21S3 15.5 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12Z" />
            </svg>
          ) : p.kind === 'spark' ? (
            <span
              style={{
                display: 'block',
                width: p.size / 2,
                height: p.size / 2,
                borderRadius: '50%',
                background: p.hue,
                boxShadow: `0 0 ${p.size}px ${p.hue}`,
                opacity: 0.6,
              }}
            />
          ) : (
            <svg
              width={p.size}
              height={p.size * 1.4}
              viewBox="0 0 20 28"
              style={{ opacity: 0.5 }}
            >
              <path
                d="M10 0 C16 6 18 14 10 28 C2 14 4 6 10 0 Z"
                fill={p.hue}
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
