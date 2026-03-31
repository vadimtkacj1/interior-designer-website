import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'ליווי אישי ומקצועי',
    description:
      'ליווי מלא משלב הרעיון הראשוני ועד לביצוע הסופי. מיועד ללקוחות פרטיים ועסקיים, ליצירת חלל הרמוני, פונקציונלי ומעוצב המותאם בדיוק לצרכים שלכם.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
      </svg>
    ),
  },
  {
    title: 'שרטוט ותכנון אדריכלי',
    description:
      'הכנת תוכניות עבודה מפורטות ומדויקות — חשמל, אינסטלציה, הריסה ובנייה. אנחנו מתרגמים את החזון שלכם למסמכים טכניים מקצועיים המהווים בסיס איתן לכל תהליך שיפוץ או בנייה.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
        <line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
  },
  {
    title: 'מידול והדמיות בתלת-ממד',
    description:
      'שירותי מידול מתקדמים המאפשרים להמחיש את החלל, החומרים והתאורה בצורה מוחשית — כדי שתוכלו לראות את התוצאה עוד לפני שהתחלתם ולקבל החלטות בביטחון מלא.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const ServicesLead = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      dir="rtl"
      lang="he"
      className={`section-reveal-ready relative overflow-hidden bg-beige-light py-14 md:py-20 lg:py-24 ${
        revealed ? 'section-reveal-active' : ''
      }`}
      aria-label="שירותים"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center md:px-8 lg:px-12">
        <div
          className="reveal-child mb-16 md:mb-20"
          style={{ '--reveal-stagger': 0 }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
            <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
              שירותים
            </span>
            <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-14">
          {services.map((service, index) => (
            <div
              key={index}
              className={`reveal-child flex flex-col justify-center${index === services.length - 1 && services.length % 2 !== 0 ? ' lg:col-span-2 lg:max-w-lg lg:mx-auto' : ''}`}
              style={{ '--reveal-stagger': index + 1 }}
            >
              <div className="reveal-icon mb-6 flex justify-center text-dark/60">{service.icon}</div>
              <h3 className="mb-4 text-center text-2xl font-semibold leading-[1.12] tracking-tight text-dark md:text-3xl">
                {service.title}
              </h3>
              <p className="text-center text-base leading-relaxed text-gray-600 md:text-lg">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesLead;
