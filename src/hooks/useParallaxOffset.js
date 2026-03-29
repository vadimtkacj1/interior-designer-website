import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Parallax from distance to viewport center (vertical scroll).
 * @param {number} speedY — vertical multiplier (typical 0.08–0.35)
 * @param {number} speedX — horizontal drift using same driver (typical -0.12–0.12)
 */
export function useParallaxOffset(speedY = 0.12, speedX = 0) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const delta = viewportCenter - centerY;
      setOffset({
        x: delta * speedX,
        y: delta * speedY,
      });
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [speedY, speedX]);

  const reduced = typeof window !== 'undefined' && prefersReducedMotion();
  const x = reduced ? 0 : offset.x;
  const y = reduced ? 0 : offset.y;

  return {
    ref,
    style: {
      transform: `translate3d(${x}px, ${y}px, 0)`,
      willChange: reduced ? undefined : 'transform',
    },
  };
}
