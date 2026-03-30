import React, { useEffect, useRef, useState } from 'react';

const About = () => {
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
      id="about"
      dir="rtl"
      className={`section section-reveal-ready relative bg-[#f5f4f0] ${
        revealed ? 'section-reveal-active' : ''
      }`}
    >
      <div className="container relative z-10 ">
        <div
          className="reveal-child mb-12 text-right md:mb-16 lg:mb-20"
          style={{ '--reveal-stagger': 0 }}
        >
          <div className="flex items-center justify-start gap-3">
            <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
              אודות
            </span>
            <span
              className="reveal-accent-line h-px w-12 shrink-0 bg-dark/25 md:w-14"
              aria-hidden
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:gap-20">
          <div
            className="reveal-child order-2 w-full text-center lg:order-1 lg:w-1/2"
            style={{ '--reveal-stagger': 2 }}
          >
            <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]">
              <span className="text-dark/40">שלום,</span>
              <br />
              אני אלכסנדרה.
            </h2>

            <div className="mt-10 space-y-5">
              <p className="text-center text-base font-semibold text-dark md:text-lg">
                מעצבת פנים ואדריכלית רב-תחומית.
              </p>
              <p className="text-center max-w-prose text-base leading-relaxed text-gray-600 md:text-lg">
                אני משלבת בסיס של הרמוניה קלאסית עם הנדסה טכנית קפדנית כדי ליצור חללים שהם גם יפהפיים וגם מבוצעים בשלמות.
              </p>
            </div>
          </div>

          <div
            className="reveal-child order-1 flex w-full max-w-[17.5rem] justify-center sm:max-w-[17rem] lg:order-2 lg:max-w-md lg:w-1/2 lg:justify-end"
            dir="ltr"
            style={{ '--reveal-stagger': 1 }}
          >
            <figure className="mx-auto w-full lg:mr-0 lg:ml-auto ">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-none border border-dark/[0.12]">
                <img
                  src="/designer.png"
                  alt="אלכסנדרה פאצינה"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
