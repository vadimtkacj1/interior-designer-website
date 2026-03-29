import React from 'react';
import Parallax from '../Parallax/Parallax';

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
  return (
    <section
      id="services"
      dir="rtl"
      lang="he"
      className="relative overflow-hidden bg-beige-light py-20 md:py-32 lg:py-40"
      aria-label="שירותים"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Parallax
          speed={0.22}
          speedX={0.16}
          className="absolute right-0 top-[20%] h-[min(55vw,480px)] w-[min(55vw,480px)] translate-x-1/4 rounded-full bg-[#2D4733]/[0.04] blur-[80px] md:blur-[100px]"
        />
        <Parallax
          speed={-0.18}
          speedX={-0.12}
          className="absolute left-0 bottom-[8%] h-[min(48vw,400px)] w-[min(48vw,400px)] -translate-x-1/4 rounded-full bg-[#C4A574]/[0.08] blur-[70px]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-right md:px-8 lg:px-12">

        <Parallax speed={-0.09} speedX={0.05} className="mb-16 block md:mb-20">
          <div className="flex items-center justify-start gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-dark/50">
              שירותים
            </span>
            <span className="h-px w-10 shrink-0 bg-dark/25" aria-hidden />
          </div>
        </Parallax>

        <div className="grid grid-cols-1 gap-16 md:gap-20 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-20">
          {services.map((service, index) => (
            <Parallax
              key={index}
              speed={0.1 + index * 0.06}
              speedX={index % 2 === 0 ? 0.08 : -0.08}
              className="block"
            >
              <div>
                <div className="mb-6 text-dark/60">{service.icon}</div>
                <h3 className="mb-4 text-2xl font-semibold leading-[1.12] tracking-tight text-dark md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                  {service.description}
                </p>
              </div>
            </Parallax>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesLead;
