import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children instead of the wrapper. */
  stagger?: boolean;
  /** Delay in ms before revealing. */
  delay?: number;
  /** Reveal only once (default) or every time it enters. */
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export default function ScrollReveal({
  children,
  className = '',
  stagger = false,
  delay = 0,
  once = true,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as as ElementType;

  return createElement(
    Tag,
    {
      ref: (node: HTMLElement | null) => {
        ref.current = node;
      },
      className: `${stagger ? 'reveal-stagger' : 'reveal'} ${
        visible ? 'is-visible' : ''
      } ${className}`,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
