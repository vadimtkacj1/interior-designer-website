import Parallax from '../Parallax/Parallax';

import portfolio1 from '../../assets/images/portfolio1.jpg';
import portfolio2 from '../../assets/images/portfolio2.jpeg';
import portfolio3 from '../../assets/images/portfolio3.jpg';
import portfolio4 from '../../assets/images/portfolio4.jpeg';

// Mobile: photos peek from top/bottom edges (no text overlap)
// Desktop (lg+): fully visible, scattered around text
const PHOTOS = [
  {
    src: portfolio1,
    alt: 'עיצוב פנים',
    posClass: 'top-0 right-[3%] lg:top-[3%] lg:right-[5%] xl:right-[7%]',
    sizeClass: 'w-[130px] h-[176px] lg:w-[185px] lg:h-[252px] xl:w-[210px] xl:h-[284px]',
    rotate: '5deg',
    radius: '120px 120px 12px 12px',
    speed: -0.14,
    speedX: -0.07,
    delay: '0.3s',
  },
  {
    src: portfolio2,
    alt: 'עיצוב פנים',
    posClass: 'bottom-0 left-[3%] lg:bottom-[7%] lg:left-[5%] xl:left-[7%]',
    sizeClass: 'w-[125px] h-[168px] lg:w-[178px] lg:h-[242px] xl:w-[200px] xl:h-[270px]',
    rotate: '-6deg',
    radius: '120px 120px 12px 12px',
    speed: -0.09,
    speedX: 0.06,
    delay: '0.55s',
  },
  {
    src: portfolio3,
    alt: 'עיצוב פנים',
    posClass: 'top-0 left-[3%] lg:top-[24%] lg:left-[4%] xl:left-[6%]',
    sizeClass: 'w-[115px] h-[156px] lg:w-[162px] lg:h-[220px] xl:w-[182px] xl:h-[246px]',
    rotate: '-3deg',
    radius: '110px 110px 10px 10px',
    speed: -0.19,
    speedX: 0.09,
    delay: '0.75s',
  },
  {
    src: portfolio4,
    alt: 'עיצוב פנים',
    posClass: 'bottom-0 right-[3%] lg:bottom-[13%] lg:right-[4%] xl:right-[6%]',
    sizeClass: 'w-[120px] h-[162px] lg:w-[170px] lg:h-[232px] xl:w-[192px] xl:h-[260px]',
    rotate: '8deg',
    radius: '115px 115px 10px 10px',
    speed: -0.07,
    speedX: -0.05,
    delay: '1.0s',
  },
];

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      dir="rtl"
      lang="he"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#f5f4f0] min-h-screen pt-[max(10rem,env(safe-area-inset-top,0px)+4.5rem)] pb-36 md:pt-16 md:pb-20"
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes cinematicReveal {
          0% {
            transform: translateY(120%) rotate(2deg);
            transform-origin: left bottom;
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotate(0);
            transform-origin: left bottom;
            opacity: 1;
          }
        }
        @keyframes softFocus {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(20px) scale(0.98);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0) scale(1);
          }
        }
        @keyframes photoReveal {
          from {
            opacity: 0;
            filter: blur(8px);
            transform: rotate(var(--r)) translateY(18px) scale(0.94);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: rotate(var(--r)) translateY(0) scale(1);
          }
        }
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top center; opacity: 0.5; }
          45%  { transform: scaleY(1); transform-origin: top center; opacity: 1; }
          55%  { transform: scaleY(1); transform-origin: bottom center; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom center; opacity: 0; }
        }
        .reveal-wrap {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 0.2em;
          margin-bottom: -0.2em;
        }
        .reveal-text {
          display: inline-block;
          opacity: 0;
          animation: cinematicReveal 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .blur-fade {
          opacity: 0;
          animation: softFocus 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .photo-card {
          opacity: 0;
          animation: photoReveal 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .scroll-line {
          animation: scrollPulse 2.4s ease-in-out 2.8s infinite;
        }
      `}</style>

      {/* Backgrounds */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/marble-texture.jpg')" }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 9s ease-in-out infinite',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f5f4f0]/80 via-[#f5f4f0]/40 to-[#f5f4f0]/90" />

      {PHOTOS.map((photo) => (
        <Parallax
          key={photo.src}
          speed={photo.speed}
          speedX={photo.speedX}
          className={`absolute z-4 ${photo.posClass}`}
        >
          <div
            className={`photo-card overflow-hidden shadow-2xl ${photo.sizeClass}`}
            style={{
              '--r': photo.rotate,
              animationDelay: photo.delay,
              borderRadius: photo.radius,
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Parallax>
      ))}

      {/* Soft edge fade so photos blend at corners */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none hidden lg:block"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 50% 50%, transparent 0%, rgba(245,244,240,0.55) 100%)',
        }}
      />

      {/* Text content */}
      <div className="container relative z-10 mt-8">
        <div className="mx-auto flex flex-col items-center text-center max-w-xl px-4 md:max-w-lg md:px-0">

          <h1 className="mb-6 text-[2.4rem] font-bold leading-[1.08] tracking-tight text-dark sm:text-5xl md:mb-10 md:text-6xl lg:text-[6rem] xl:text-[7rem]">
            <Parallax speed={-0.15} speedX={0.07} className="block">
              <span className="reveal-wrap">
                <span className="reveal-text" style={{ animationDelay: '0.05s' }}>עיצוב חסר פשרות.</span>
              </span>
            </Parallax>
            <Parallax speed={-0.05} speedX={-0.07} className="mt-1 block">
              <span className="reveal-wrap">
                <span className="reveal-text" style={{ animationDelay: '0.25s' }}>עד הפרט האחרון.</span>
              </span>
            </Parallax>
          </h1>

<Parallax speed={-0.07} speedX={0.03} className="block w-full">
            <p
              className="blur-fade mx-auto mb-12 max-w-2xl text-center text-lg font-normal leading-[1.75] text-dark/85 md:mb-14 md:max-w-lg md:text-base lg:text-lg lg:leading-[1.8]"
              style={{ animationDelay: '0.55s' }}
            >
              סטודיו בוטיק לאדריכלות ועיצוב פנים המעניק מעטפת מלאה. משלב הקונספט ועד קבלת המפתח, אנו יוצרים חללים מרשימים, חכמים ומותאמים אישית לאורח החיים שלכם.
            </p>
          </Parallax>

  <Parallax speed={-0.05} className="flex justify-center">
            <button
              type="button"
              dir="ltr"
              onClick={() => scrollToSection('contact')}
              className="blur-fade inline-flex items-center justify-center gap-3 rounded-none bg-[#2D4733] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#243829] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4733] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f4f0] md:px-9 md:py-3.5 md:text-sm"
              style={{ animationDelay: '0.8s' }}
            >
              <span className="text-base leading-none md:text-sm" aria-hidden>←</span>
              <span dir="rtl">השאירו פרטים לשיחת ייעוץ</span>
            </button>
          </Parallax>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="blur-fade absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ animationDelay: '1.3s' }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-dark/30">גלול</span>
        <span className="scroll-line h-7 w-px bg-dark/20 block" />
      </div>

    </section>
  );
};

export default Hero;
