import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const MENU_TRANSITION_MS = 320;

const navBarRowClass =
  'mx-auto flex h-20 w-full min-w-0 max-w-[1600px] flex-row-reverse items-center justify-between px-6 md:h-24 md:px-12 lg:px-20';

const menuOverlayHeaderClass =
  'mx-auto flex h-20 w-full min-w-0 max-w-[1600px] shrink-0 flex-row-reverse items-center justify-between border-b border-dark/[0.06] px-6 md:h-24 md:px-12 lg:px-20';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuReveal, setMenuReveal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    if (prefersReducedMotion()) {
      setMenuReveal(false);
      setIsMobileMenuOpen(false);
      return;
    }
    setMenuReveal(false);
    window.setTimeout(() => setIsMobileMenuOpen(false), MENU_TRANSITION_MS);
  }, []);

  const scrollTo = useCallback(
    (id) => {
      const reduced = prefersReducedMotion();
      if (isMobileMenuOpen) {
        if (reduced) {
          setIsMobileMenuOpen(false);
          setMenuReveal(false);
        } else {
          setMenuReveal(false);
          window.setTimeout(() => setIsMobileMenuOpen(false), MENU_TRANSITION_MS);
        }
      }
      const scrollDelay = isMobileMenuOpen && !reduced ? MENU_TRANSITION_MS : 0;
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }, scrollDelay);
    },
    [isMobileMenuOpen],
  );

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setMenuReveal(true));
      return () => cancelAnimationFrame(id);
    }
    let id2;
    const id1 = requestAnimationFrame(() => {
      setMenuReveal(false);
      id2 = requestAnimationFrame(() => setMenuReveal(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      if (id2 !== undefined) cancelAnimationFrame(id2);
    };
  }, [isMobileMenuOpen]);

  const mobileMenu =
    isMobileMenuOpen &&
    createPortal(
      <div
        dir="rtl"
        lang="he"
        className={`fixed inset-0 z-[100] flex h-[100dvh] min-h-[100dvh] w-full max-w-none flex-col overflow-y-auto overscroll-contain bg-beige-light transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuReveal ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט"
      >
        <div className={menuOverlayHeaderClass}>
          <div className="flex min-w-0 items-center">
            <img src="/logo.svg" alt="אלכסנדרה פאצינה" className="h-12 w-auto max-w-[min(100%,12rem)] object-contain sm:max-w-none" />
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="shrink-0 p-2 text-dark/70 transition-opacity hover:opacity-80"
            aria-label="סגור תפריט"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-10 px-6 py-12">
          {[
            { id: 'services', label: 'שירותים', delay: '75ms' },
            { id: 'portfolio', label: 'עבודות', delay: '120ms' },
            { id: 'contact', label: 'יצירת קשר', delay: '165ms' },
          ].map(({ id, label, delay }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              style={{ transitionDelay: menuReveal ? delay : '0ms' }}
              className={`text-2xl font-semibold uppercase tracking-widest text-dark/70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-dark ${
                menuReveal ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>,
      document.body,
    );

  return (
    <nav
      dir="rtl"
      lang="he"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? 'border-b border-dark/4 bg-beige-light/90 backdrop-blur-md md:bg-beige-light/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className={navBarRowClass}>
        <div className="flex min-w-0 items-center">
          <img
            src="/logo.svg"
            alt="אלכסנדרה פאצינה"
            className="h-12 w-auto object-contain md:h-16 transition-[filter] duration-300"
            style={!scrolled ? { filter: 'brightness(0) invert(1)' } : undefined}
          />
        </div>

        <button
          type="button"
          onClick={() => (isMobileMenuOpen ? closeMenu() : setIsMobileMenuOpen(true))}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="תפריט"
        >
          <span className={`h-px w-6 transition-colors duration-300 ${scrolled ? 'bg-dark/80' : 'bg-white'}`} />
          <span className={`h-px w-6 transition-colors duration-300 ${scrolled ? 'bg-dark/80' : 'bg-white'}`} />
          <span className={`h-px w-6 transition-colors duration-300 ${scrolled ? 'bg-dark/80' : 'bg-white'}`} />
        </button>

        <div className="hidden items-center gap-12 md:flex lg:gap-16">
          <button
            type="button"
            onClick={() => scrollTo('services')}
            className={`text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${scrolled ? 'text-dark/60 hover:text-dark' : 'text-white/80 hover:text-white'}`}
          >
            שירותים
          </button>
          <button
            type="button"
            onClick={() => scrollTo('portfolio')}
            className={`text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${scrolled ? 'text-dark/60 hover:text-dark' : 'text-white/80 hover:text-white'}`}
          >
            עבודות
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className={`text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${scrolled ? 'text-dark/60 hover:text-dark' : 'text-white/80 hover:text-white'}`}
          >
            יצירת קשר
          </button>
        </div>
      </div>

      {mobileMenu}
    </nav>
  );
};

export default Navbar;
