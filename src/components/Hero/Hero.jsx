import React from 'react';
import Parallax from '../Parallax/Parallax';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      dir="rtl"
      lang="he"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-beige-light pt-20 md:pt-16"
    >
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl px-4 text-center md:max-w-2xl md:px-8 lg:max-w-[42rem]">
          <h1 className="mb-8 text-5xl font-bold leading-[1.08] tracking-tight text-dark md:mb-10 md:text-6xl lg:text-[6rem] xl:text-[7rem]">
            <Parallax speed={-0.09} speedX={0.04} className="block">
              <span className="block">עיצוב.</span>
            </Parallax>
            <Parallax speed={-0.14} speedX={-0.05} className="mt-1 block md:mt-0">
              <span className="block">בנייה. קיימות.</span>
            </Parallax>
          </h1>
          <Parallax speed={-0.07} speedX={0.03} className="block">
            <p className="mx-auto mb-12 max-w-2xl text-lg font-normal leading-[1.75] text-dark/85 md:mb-14 md:max-w-lg md:text-base lg:text-lg lg:leading-[1.8]">
              ביצוע אדריכלי ועיצוב פנים במעגל מלא. מקונספטים רגשיים ושרטוטים מדויקים, ועד לניהול פרויקטים מאלף ועד תו ושילוב מערכות סולאריות.
            </p>
          </Parallax>
          <Parallax speed={-0.05} className="flex justify-center">
            <button
              type="button"
              dir="ltr"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center gap-3 rounded-none bg-[#2D4733] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#243829] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4733] focus-visible:ring-offset-2 focus-visible:ring-offset-beige-light md:px-9 md:py-3.5 md:text-sm"
            >
              <span dir="rtl">בקש חזון בלעדי</span>
              <span className="text-base leading-none md:text-sm" aria-hidden>
                →
              </span>
            </button>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default Hero;
