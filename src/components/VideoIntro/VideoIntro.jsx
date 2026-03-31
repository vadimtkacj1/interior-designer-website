import { useEffect, useRef } from 'react';

const VideoIntro = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const handleScroll = () => {
      if (!contentRef.current) return;
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      const scale = 1 - progress * 0.1;
      const opacity = 1 - progress * 0.75;
      contentRef.current.style.transform = `scale(${scale})`;
      contentRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: window.innerHeight, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className="sticky top-0 z-0 w-full h-screen overflow-hidden" dir="rtl" lang="he">
      <style>{`
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%       { transform: translateY(10px); opacity: 1; }
        }
        .bounce-arrow { animation: bounceArrow 2s ease-in-out infinite; }

        @keyframes videoReveal {
          0%   { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .video-title {
          animation: videoReveal 1.4s cubic-bezier(0.19, 1, 0.22, 1) 0.3s both;
        }
        .video-sub {
          animation: videoReveal 1.4s cubic-bezier(0.19, 1, 0.22, 1) 0.65s both;
        }
        .video-btn {
          animation: videoReveal 1.4s cubic-bezier(0.19, 1, 0.22, 1) 0.95s both;
        }
      `}</style>

      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text content */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white" style={{ willChange: 'transform, opacity' }}>
        <h1 className="video-title mb-5 text-[2.4rem] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[5.5rem]">
          עיצוב חסר פשרות.<br />עד הפרט האחרון.
        </h1>
        <p className="video-sub mx-auto mb-10 max-w-xl text-base font-normal leading-[1.8] text-white/80 md:text-lg">
          סטודיו בוטיק לאדריכלות ועיצוב פנים המעניק מעטפת מלאה. משלב הקונספט ועד קבלת המפתח, אנו יוצרים חללים מרשימים, חכמים ומותאמים אישית לאורח החיים שלכם.
        </p>
        <button
          type="button"
          dir="ltr"
          onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="video-btn inline-flex items-center justify-center gap-3 bg-[#2D4733] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#243829] focus:outline-none"
        >
          <span dir="rtl">השאירו פרטים לשיחת ייעוץ</span>
          <span aria-hidden>→</span>
        </button>
      </div>

      {/* Scroll button */}
      <button
        type="button"
        onClick={scrollToHero}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white cursor-pointer focus:outline-none"
        aria-label="גלול למטה"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] opacity-70">גלול</span>
        <span className="bounce-arrow flex items-center justify-center w-10 h-10 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
    </section>
  );
};

export default VideoIntro;
