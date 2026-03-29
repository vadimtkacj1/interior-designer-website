import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const MOBILE_MQ = '(max-width: 767.98px)';

function parallaxDisabledForViewport() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(MOBILE_MQ).matches;
}

/**
 * Parallax from distance to viewport center (vertical scroll).
 * Оновлює transform напряму в DOM — без setState під час скролу.
 */
export function useParallaxOffset(speedY = 0.12, speedX = 0) {
  const ref = useRef(null);
  const [parallaxAllowed, setParallaxAllowed] = useState(() => !parallaxDisabledForViewport());

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setParallaxAllowed(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !parallaxAllowed) {
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      if (!el.isConnected) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const delta = viewportCenter - centerY;
      const x = delta * speedX;
      const y = delta * speedY;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    el.style.willChange = 'transform';
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      el.style.transform = '';
      el.style.willChange = '';
    };
  }, [speedY, speedX, parallaxAllowed]);

  return { ref, style: {} };
}
