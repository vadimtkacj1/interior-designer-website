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
  const [inView, setInView] = useState(false);
  const isEven = index % 2 === 0;
  const stepNum = String(index + 1).padStart(2, '0');

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.disconnect(); }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Чётные:  [←картинка] [цифра↓] [текст→]
  // Нечётные: [←текст]   [цифра↓] [картинка→]
  const imgAnim = inView
    ? 'opacity-100 translate-x-0'
    : 'opacity-0 -translate-x-24';

  const numAnim = inView
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10';

  const textAnim = inView
    ? 'opacity-100 translate-x-0'
    : 'opacity-0 translate-x-24';

  const image = step.image && (
    <div
      className={`order-1 md:order-none w-full md:w-[42%] shrink-0 transition-all duration-700 ease-out ${imgAnim}`}
      style={{ transitionDelay: '0ms' }}
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
      className={`order-2 md:order-none shrink-0 self-center transition-all duration-700 ease-out ${numAnim}`}
      style={{ transitionDelay: '100ms' }}
    >
      <span className="block text-[6rem] font-semibold leading-none tracking-tight text-dark/10 md:text-[8rem] lg:text-[10rem] select-none">
        {stepNum}
      </span>
    </div>
  );

  const text = (
    <div
      className={`order-3 md:order-none flex-1 transition-all duration-700 ease-out ${textAnim}`}
      style={{ transitionDelay: '200ms' }}
    >
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-dark md:text-4xl lg:text-5xl">
        {step.title}
      </h2>
      <p className="mt-5 text-right text-base leading-relaxed text-gray-500 md:text-lg lg:text-xl max-w-xl">
        {step.body}
      </p>
    </div>
  );

  return (
    <div
      ref={rowRef}
      dir="rtl"
      lang="he"
      className="flex flex-col md:flex-row items-center gap-8 md:gap-10 px-8 py-12 md:px-16 md:py-14 lg:px-24 lg:py-16"
    >
      {isEven ? (
        <>
          {image}
          {number}
          {text}
        </>
      ) : (
        <>
          {text}
          {number}
          {image}
        </>
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
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-dark/45">
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
