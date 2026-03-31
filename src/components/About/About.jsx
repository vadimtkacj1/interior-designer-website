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

  return (
    <section
      ref={sectionRef}
      id="about"
      dir="rtl"
      className={`section-reveal-ready relative overflow-hidden bg-beige-light pt-24 pb-16 lg:pt-32 lg:pb-24 ${revealed ? 'section-reveal-active' : ''}`}
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 max-w-7xl relative">
        
        {/* ── Заголовок (אודות) ── */}
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

        <div className="relative flex flex-col items-center z-10">
          <div className="relative flex flex-col items-center w-full max-w-4xl text-center">
            
            {/* ── Верхний текст ── */}
            <div
              className="reveal-child mb-10 lg:mb-14 px-2"
              style={{ '--reveal-stagger': 1 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-[2.35rem] font-bold text-dark mb-4 leading-tight tracking-tight">
                מעצבת פנים ומומחית לתכנון ומידול תלת-ממדי מתקדם
              </h2>
              <p className="text-base md:text-lg font-medium text-dark/80 max-w-[45ch] mx-auto">
                אני משלבת בסיס של הרמוניה קלאסית עם הנדסה טכנית קפדנית כדי ליצור חללים שהם גם יפהפיים וגם מבוצעים בשלמות.
              </p>
            </div>

            {/* ── Блок Фото + Имя ── */}
            <div
              className="reveal-child relative flex flex-col items-center w-full mb-12 lg:mb-20"
              style={{ '--reveal-stagger': 2 }}
            >
              {/* Alexandra: Еще чуть выше (-translate-y-36) для мобилок */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -translate-y-42 lg:-translate-y-28">
                <span
                  className="block text-[26vw] lg:text-[22rem] text-dark/10 whitespace-nowrap"
                  style={{ 
                    fontFamily: "'Dancing Script', cursive", 
                    fontWeight: 600,
                    lineHeight: 1
                  }}
                  dir="ltr"
                >
                  Alexandra
                </span>
              </div>

              {/* Портрет */}
              <div className="relative z-10 w-full max-w-[260px] sm:max-w-xs">
                <img
                  src="/designer.png" 
                  alt="אלכסנדרה פאצינה"
                  className="w-full h-auto mx-auto"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ── Описание снизу ── */}
            <div
              className="reveal-child space-y-6 px-2 pb-8"
              style={{ '--reveal-stagger': 3 }}
            >
              <p className="max-w-[65ch] mx-auto text-base md:text-lg leading-[1.8] text-dark/70">
                עם הכשרה מקצועית ממכללת קונספט וניסיון טכני עשיר בתכנון פרויקטים הדורשים דיוק מקסימלי, אני מביאה לעולם העיצוב סטנדרט ביצוע גבוה ומוקפד.
              </p>
              <p className="max-w-[65ch] mx-auto text-base md:text-lg leading-[1.8] text-dark/70">
                הסטודיו שלי מציע מעטפת שירותים מלאה (מא' ועד ת') – החל מתכנון דירות קבלן, דרך עיצוב נגרות אישית, ועד להדמיות פוטוריאליסטיות ברמה הגבוהה ביותר שיאפשרו לכם לראות את התוצאה הסופית עוד לפני תחילת העבודה.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;