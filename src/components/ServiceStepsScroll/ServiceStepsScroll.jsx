import React, { useEffect, useRef, useState } from 'react';
import img1 from '../../assets/images/portfolio1.jpg';
import img2 from '../../assets/images/portfolio2.jpeg';
import img3 from '../../assets/images/portfolio3.jpg';
import img4 from '../../assets/images/portfolio4.jpeg';
import img5 from '../../assets/images/portfolio5.jpeg';
import img6 from '../../assets/images/portfolio6.jpeg';

const steps = [
  {
    title: 'היכרות והפרוגרמה',
    body: 'פגישת ייעוץ ראשונית להבנת אורח החיים, התקציב והחלומות שלכם. בניית פרוגרמה — מסמך המפרט כמה חדרים דרושים, מה השימושים של כל חלל ואיזה סגנון עיצובי מועדף. המעצבת מודדת את הדירה בשטח כדי ליצור תוכנית מצב קיים.',
    image: img1,
  },
  {
    title: 'תכנון רעיוני',
    body: 'סקיצות ותכנון מערך (Layout): העמדת ריהוט וחלוקת חללים — המעצבת מציעה מספר אופציות לסידור הבית. לוח השראה (Moodboard): גיבוש השפה הוויזואלית — חומרים, צבעים וטקסטורות.',
    image: img2,
  },
  {
    title: 'תוכניות עבודה לביצוע',
    body: 'תרגום התכנון לשפת הקבלנים: תוכנית הריסה ובנייה, חשמל ותאורה, אינסטלציה, ריצוף ופריסות, נגרות מפורטת למטבח וארונות, מיזוג אוויר ותוכנית מטבח.',
    image: img3,
  },
  {
    title: 'רכישות',
    body: 'ימי רכישות מרוכזים ביחד עם הלקוח: בחירת ריצוף, חיפויים, כלים סניטריים, מטבח, תאורה ורהיטים. הכנת כתב כמויות — רשימה מפורטת לקבלן לצורך הצעת מחיר מדויקת.',
    image: img4,
  },
  {
    title: 'פיקוח עליון',
    body: 'המעצבת מגיעה לאתר בנקודות קריטיות — לפני יציקת חשמל, תחילת ריצוף ועוד — כדי לוודא שהקבלן עובד לפי התוכניות. פתרון בעיות בשטח בזמן אמת לאורך כל תהליך השיפוץ.',
    image: img5,
  },
  {
    title: 'גמר והלבשה',
    body: 'הפינישים האחרונים שהופכים את הדירה לבית: בחירת וילונות, שטיחים, תמונות ואקססוריז. סידור סופי והעמדת כל הרהיטים במקומם.',
    image: img6,
  },
];

function StepRow({ step, index }) {
  const rowRef = useRef(null);
  const imgRef = useRef(null);
  const numRef = useRef(null);
  const textRef = useRef(null);
  const isEven = index % 2 === 0;
  const stepNum = String(index + 1).padStart(2, '0');

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    let rafId = null;

    const update = () => {
      const rect = row.getBoundingClientRect();
      const wh = window.innerHeight;
      const p = (rect.top + rect.height / 2 - wh / 2) / wh;
      const visible = rect.top < wh * 0.9 && rect.bottom > 0;
      const opacity = visible ? '1' : '0';

      if (imgRef.current) {
        imgRef.current.style.transform = `translateX(${p * 80}px)`;
        imgRef.current.style.opacity = opacity;
      }
      if (numRef.current) {
        numRef.current.style.transform = `translateY(${p * 40}px)`;
        numRef.current.style.opacity = opacity;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateX(${-p * 60}px)`;
        textRef.current.style.opacity = opacity;
      }
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const image = step.image && (
    <div
      ref={imgRef}
      className="order-1 md:order-0 w-full md:w-[42%] shrink-0"
      style={{ opacity: 0, willChange: 'transform' }}
    >
      <img
        src={step.image}
        alt={step.title}
        className="w-full h-64 md:h-80 lg:h-105 object-cover"
        loading="lazy"
      />
    </div>
  );

  const number = (
    <div
      ref={numRef}
      className="order-2 md:order-0 shrink-0 self-center"
      style={{ opacity: 0, willChange: 'transform' }}
    >
      <span
        className="block text-[6rem] font-semibold leading-none tracking-tight md:text-[8rem] lg:text-[10rem] select-none"
        style={{ color: '#C8B89A' }}
      >
        {stepNum}
      </span>
    </div>
  );

  const text = (
    <div
      ref={textRef}
      className="order-3 md:order-0 flex-1"
      style={{ opacity: 0, willChange: 'transform' }}
    >
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-dark md:text-4xl lg:text-5xl text-center">
        {step.title}
      </h2>
      <p className="mt-5 text-center text-base leading-relaxed text-gray-500 md:text-lg lg:text-xl max-w-xl">
        {step.body}
      </p>
    </div>
  );

  return (
    <div
      ref={rowRef}
      dir="rtl"
      lang="he"
      className="flex flex-col md:flex-row items-center gap-8 md:gap-10 px-8 py-12 md:px-16 md:py-14 lg:px-24 lg:py-16 overflow-hidden"
    >
      {isEven ? (
        <>{image}{number}{text}</>
      ) : (
        <>{text}{number}{image}</>
      )}
    </div>
  );
}

const ServiceStepsScroll = () => {
  const headerRef = useRef(null);
  const [headerInView, setHeaderInView] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderInView(true); io.disconnect(); } },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-beige-light" aria-label="שלבי שירות">
      <div
        ref={headerRef}
        dir="rtl"
        lang="he"
        className={`px-8 pb-0 pt-14 md:px-16 md:pt-16 lg:px-24 transition-all duration-700 ease-out ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex items-center justify-start gap-4">
          <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
            שלבי העבודה
          </span>
          <span className="h-px w-10 shrink-0 bg-dark/20" aria-hidden />
        </div>
      </div>

      <div>
        {steps.map((step, i) => (
          <StepRow key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ServiceStepsScroll;
