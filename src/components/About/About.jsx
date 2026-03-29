import React from 'react';

const About = () => {
  return (
    <section id="about" dir="rtl" className="section relative overflow-hidden bg-[#f5f4f0]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -right-[10%] top-[8%] h-[min(50vw,420px)] w-[min(50vw,420px)] rounded-full bg-[#2D4733]/[0.05] blur-[76px] md:blur-[96px]" />
        <div className="absolute -left-[6%] bottom-[12%] h-[min(42vw,340px)] w-[min(42vw,340px)] rounded-full bg-white/50 blur-[48px] md:blur-[64px]" />
      </div>
      <div className="container relative z-10">
        <div className="mb-12 text-right md:mb-16 lg:mb-20">
          <div className="flex items-center justify-start gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-dark/50">
              אודות
            </span>
            <span className="h-px w-10 shrink-0 bg-dark/25" aria-hidden />
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="order-2 w-full text-right lg:order-1 lg:w-1/2">
            <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]">
              <span className="text-dark/40">שלום,</span>
              <br />
              אני אלכסנדרה.
            </h2>

            <div className="mt-8 space-y-4">
              <p className="text-base font-semibold text-dark md:text-lg">
                מעצבת פנים ואדריכלית רב-תחומית.
              </p>
              <p className="max-w-prose text-base leading-relaxed text-gray-600 md:text-lg">
                אני משלבת בסיס של הרמוניה קלאסית עם הנדסה טכנית קפדנית כדי ליצור חללים שהם גם יפהפיים וגם מבוצעים בשלמות.
              </p>
            </div>
          </div>

          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <div className="flex justify-start lg:justify-end" dir="ltr">
              <div className="aspect-4/5 w-[min(100%,15.5rem)] shrink-0 overflow-hidden rounded-sm shadow-sm sm:w-[min(100%,17rem)] md:rounded-md lg:w-full lg:max-w-md">
                <img
                  src="/designer.png"
                  alt="אלכסנדרה פאצינה"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
