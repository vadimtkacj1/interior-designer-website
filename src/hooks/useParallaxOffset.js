import { useEffect, useRef } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const MOBILE_MQ = '(max-width: 767.98px)';

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches;
}

/** Коефіцієнт руху на телефоні — менше пікселів, менше навантаження й візуальних артефактів */
const MOBILE_SPEED_FACTOR = 0.55;

const subscribers = new Set();
let rafScheduled = false;
let globalListening = false;

function flushParallax() {
  rafScheduled = false;
  if (typeof window === 'undefined') return;

  const vh = window.innerHeight;
  const viewportCenter = vh / 2;
  const factor = isMobileViewport() ? MOBILE_SPEED_FACTOR : 1;

  for (const sub of subscribers) {
    const el = sub.ref.current;
    if (!el || !el.isConnected) continue;
    const rect = el.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const delta = viewportCenter - centerY;
    const x = delta * sub.speedX * factor;
    const y = delta * sub.speedY * factor;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}

function scheduleParallax() {
  if (rafScheduled) return;
  rafScheduled = true;
  requestAnimationFrame(flushParallax);
}

function attachGlobalIfNeeded() {
  if (globalListening) return;
  window.addEventListener('scroll', scheduleParallax, { passive: true });
  window.addEventListener('resize', scheduleParallax, { passive: true });
  globalListening = true;
}

function addSubscriber(sub) {
  const wasEmpty = subscribers.size === 0;
  subscribers.add(sub);
  if (wasEmpty) attachGlobalIfNeeded();
  scheduleParallax();
}

function removeSubscriber(sub) {
  subscribers.delete(sub);
  const el = sub.ref.current;
  if (el) {
    el.style.transform = '';
    el.style.willChange = '';
  }
  if (subscribers.size === 0 && globalListening) {
    window.removeEventListener('scroll', scheduleParallax);
    window.removeEventListener('resize', scheduleParallax);
    globalListening = false;
    rafScheduled = false;
  }
}

/**
 * Parallax від відстані до центру вікна.
 * Один rAF на кадр для всіх елементів + прямий запис у DOM (без setState при скролі).
 */
export function useParallaxOffset(speedY = 0.12, speedX = 0) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const sub = { ref, speedY, speedX };
    addSubscriber(sub);

    const el = ref.current;
    if (el) {
      el.style.willChange = isMobileViewport() ? '' : 'transform';
    }

    return () => {
      removeSubscriber(sub);
    };
  }, [speedY, speedX]);

  return { ref, style: {} };
}
