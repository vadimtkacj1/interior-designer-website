import { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); io.disconnect(); } },
      { threshold: 0.01, rootMargin: '0px 0px -2% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paragraphs = (
    <>
      <p className="text-base md:text-lg leading-[1.8] text-dark/70 max-w-[65ch] mx-auto lg:mx-0">
        עם הכשרה מקצועית ממכללת קונספט וניסיון טכני עשיר בתכנון פרויקטים הדורשים דיוק מקסימלי, אני מביאה לעולם העיצוב סטנדרט ביצוע גבוה ומוקפד.
      </p>
      <p className="text-base md:text-lg leading-[1.8] text-dark/70 max-w-[65ch] mx-auto lg:mx-0">
        הסטודיו שלי מציע מעטפת שירותים מלאה (מא' ועד ת') – החל מתכנון דירות קבלן, דרך עיצוב נגרות אישית, ועד להדמיות פוטוריאליסטיות ברמה הגבוהה ביותר שיאפשרו לכם לראות את התוצאה הסופית עוד לפני תחילת העבודה.
      </p>
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      dir="rtl"
      className={`section-reveal-ready relative overflow-hidden bg-beige-light pt-24 pb-16 lg:pt-32 lg:pb-24 ${revealed ? 'section-reveal-active' : ''}`}
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 max-w-7xl relative">

        {/* Label */}
        <div
          className="reveal-child relative mb-12 flex justify-center items-center gap-3 z-10"
          style={{ '--reveal-stagger': 0 }}
        >
          <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
          <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
            אודות
          </span>
          <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
        </div>

        {/* ── DESKTOP two-column grid (lg+) ── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center reveal-child" style={{ '--reveal-stagger': 1 }}>

          {/* Text — right column (RTL first) */}
          <div className="flex flex-col text-right">
            <h2 className="text-[2.35rem] font-bold text-dark mb-4 leading-tight tracking-tight">
              מעצבת פנים ומומחית לתכנון ומידול תלת-ממדי מתקדם
            </h2>
            <p className="text-lg font-medium text-dark/80 mb-6 leading-[1.8]">
              אני משלבת בסיס של הרמוניה קלאסית עם הנדסה טכנית קפדנית כדי ליצור חללים שהם גם יפהפיים וגם מבוצעים בשלמות.
            </p>
            <div className="space-y-5 text-right">
              {paragraphs}
            </div>
          </div>

          {/* Photo — left column (RTL second) */}
          <div className="relative flex justify-start">
            <span
              className="absolute top-0 left-0 right-0 -translate-y-8 flex justify-center pointer-events-none select-none text-[9rem] text-dark/[0.12] whitespace-nowrap z-0"
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600, lineHeight: 1 }}
              dir="ltr"
            >
              Alexandra
            </span>
            <div className="relative z-10 w-full max-w-[420px]">
              <img
                src="/designer.png"
                alt="אלכסנדרה פאצינה"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* ── MOBILE layout (original, unchanged) ── */}
        <div className="lg:hidden relative flex flex-col items-center z-10">
          <div className="relative flex flex-col items-center w-full max-w-4xl text-center">

            {/* Title + subtitle */}
            <div className="reveal-child mb-10 px-2" style={{ '--reveal-stagger': 1 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight tracking-tight">
                מעצבת פנים ומומחית לתכנון ומידול תלת-ממדי מתקדם
              </h2>
              <p className="text-base md:text-lg font-medium text-dark/80 max-w-[45ch] mx-auto">
                אני משלבת בסיס של הרמוניה קלאסית עם הנדסה טכנית קפדנית כדי ליצור חללים שהם גם יפהפיים וגם מבוצעים בשלמות.
              </p>
            </div>

            {/* Photo + watermark */}
            <div className="reveal-child relative flex flex-col items-center w-full mb-12" style={{ '--reveal-stagger': 2 }}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -translate-y-42">
                <span
                  className="block text-[26vw] text-dark/10 whitespace-nowrap"
                  style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600, lineHeight: 1 }}
                  dir="ltr"
                >
                  Alexandra
                </span>
              </div>
              <div className="relative z-10 w-full max-w-[260px] sm:max-w-xs">
                <img
                  src="/designer.png"
                  alt="אלכסנדרה פאצינה"
                  className="w-full h-auto mx-auto"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Description paragraphs */}
            <div className="reveal-child space-y-6 px-2 pb-8" style={{ '--reveal-stagger': 3 }}>
              {paragraphs}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
