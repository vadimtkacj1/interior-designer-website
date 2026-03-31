import React, { useEffect, useState } from 'react';
import { useParallaxOffset } from '../../hooks/useParallaxOffset';
import Parallax from '../Parallax/Parallax';
import marbleTexture from '../../assets/images/marble-texture.jpg';
import portfolio1 from '../../assets/images/portfolio1.jpg';
import portfolio2 from '../../assets/images/portfolio2.jpeg';
import portfolio3 from '../../assets/images/portfolio3.jpg';
import portfolio4 from '../../assets/images/portfolio4.jpeg';
import portfolio5 from '../../assets/images/portfolio5.jpeg';
import portfolio6 from '../../assets/images/portfolio6.jpeg';

const projects = [
  {
    title: 'פרויקט 1',
    category: 'עיצוב פנים',
    image: portfolio1,
    full: portfolio1,
  },
  {
    title: 'פרויקט 2',
    category: 'עיצוב פנים',
    image: portfolio2,
    full: portfolio2,
  },
  {
    title: 'פרויקט 3',
    category: 'עיצוב פנים',
    image: portfolio3,
    full: portfolio3,
  },
  {
    title: 'פרויקט 4',
    category: 'עיצוב פנים',
    image: portfolio4,
    full: portfolio4,
  },
  {
    title: 'פרויקט 5',
    category: 'עיצוב פנים',
    image: portfolio5,
    full: portfolio5,
  },
  {
    title: 'פרויקט 6',
    category: 'עיצוב פנים',
    image: portfolio6,
    full: portfolio6,
  },
];

const cardParallaxY = [0.07, -0.06, 0.05, -0.07, 0.06, -0.05];

function GalleryCard({ project, index, onOpen }) {
  const speedY = cardParallaxY[index % cardParallaxY.length];
  const { ref, style } = useParallaxOffset(speedY, 0);

  return (
    <article className="group relative mb-3 sm:mb-5 md:mb-8">
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-beige-light"
        aria-label={`פתיחה מלאה: ${project.title}`}
      >
        <div className="overflow-hidden rounded-md">
          <div ref={ref} style={style} className="w-full">
            <div className="relative aspect-[4/5] w-full">
              <img
                src={project.image}
                alt={project.title}
                width={800}
                height={1000}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

const Gallery = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const close = () => setOpenIndex(null);
  const active = openIndex !== null ? projects[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  return (
    <section
      id="portfolio"
      className="section relative overflow-x-clip scroll-mt-20 md:scroll-mt-24"
      dir="rtl"
      lang="he"
      style={{ backgroundImage: `url(${marbleTexture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 z-0 bg-beige-light/80" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Parallax
          speed={0.26}
          speedX={-0.14}
          className="absolute -right-[12%] top-[15%] h-[min(45vw,400px)] w-[min(45vw,400px)] rounded-full bg-[#2D4733]/[0.05] blur-[72px] md:blur-[88px]"
        />
        <Parallax
          speed={-0.2}
          speedX={0.16}
          className="absolute -left-[8%] bottom-[10%] h-[min(40vw,360px)] w-[min(40vw,360px)] rounded-full bg-[#C4A574]/[0.1] blur-[64px] md:blur-[80px]"
        />
        <Parallax
          speed={0.12}
          speedX={0.2}
          className="absolute left-1/3 top-[45%] h-[min(35vw,280px)] w-[min(35vw,280px)] rounded-full bg-dark/[0.025] blur-[56px]"
        />
      </div>
      <div className="container relative z-10">
        <div className="mb-12 text-center md:mb-16 lg:mb-20">
          <Parallax speed={-0.08} speedX={0.05} className="inline-block w-full">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
              <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
                עבודות
              </span>
              <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
            </div>
          </Parallax>
          <h2 className="section-title-gap text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]">
            פרויקטים שבוצעו
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 md:max-w-5xl md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <GalleryCard key={index} project={project} index={index} onOpen={setOpenIndex} />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/85 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-beige-light/95 text-dark shadow-md transition-colors hover:bg-beige-light focus:outline-none focus-visible:ring-2 focus-visible:ring-beige-light"
            aria-label="סגירה"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            <span className="text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>

          <div
            className="relative max-h-[min(92vh,100%)] max-w-[min(96vw,1400px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.full}
              alt={active.title}
              className="max-h-[min(92vh,100%)] w-auto max-w-full object-contain"
            />
            <p className="mt-3 text-center text-sm text-beige-light/90">
              {active.category} — {active.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
