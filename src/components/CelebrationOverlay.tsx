import { useEffect, useMemo, useState } from 'react';

type Piece = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
  kind: 'heart' | 'petal' | 'spark';
};

const COLORS = [
  '#ff8aa8',
  '#ffb3c6',
  '#fdd1d9',
  '#f76a8e',
  '#e54e74',
  '#ffd1dc',
  '#fff5f7',
];

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

/**
 * One-shot celebration burst. Pass `active` to start; it renders nothing
 * while inactive and self-clears after the animation finishes.
 */
export default function CelebrationOverlay({
  active,
  onDone,
}: {
  active: boolean;
  onDone?: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active && !reduced) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 6000);
      return () => clearTimeout(t);
    }
    if (active && reduced) {
      onDone?.();
    }
  }, [active, reduced, onDone]);

  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const r = Math.random();
      const kind: Piece['kind'] = r > 0.6 ? 'heart' : r > 0.3 ? 'petal' : 'spark';
      return {
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
        kind,
      };
    });
  }, []);

  if (!show) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.kind === 'heart' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 21s-7.5-4.9-10-9.6C.4 8.3 2 5 5.2 5c1.9 0 3.2 1.1 3.8 2.2C9.6 6.1 10.9 5 12.8 5 16 5 17.6 8.16 11.4 12 21z" />
            </svg>
          ) : p.kind === 'spark' ? (
            <span
              style={{
                display: 'block',
                width: p.size / 2,
                height: p.size / 2,
                borderRadius: '50%',
                background: p.color,
                boxShadow: `0 0 ${p.size}px ${p.color}`,
              }}
            />
          ) : (
            <svg width={p.size} height={p.size * 1.4} viewBox="0 0 20 28">
              <path d="M10 0 C16 6 18 14 10 28 C2 14 4 6 10 0 Z" fill={p.color} />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
