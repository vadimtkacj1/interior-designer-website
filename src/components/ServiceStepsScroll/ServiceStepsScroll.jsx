import React, { useEffect, useRef, useState } from 'react';
import { useParallaxOffset } from '../../hooks/useParallaxOffset';

const steps = [
  {
    id: '01',
    title: 'היכרות והפרוגרמה',
    body:
      'פגישת ייעוץ ראשונית להבנת אורח החיים, התקציב והחלומות שלכם. בניית פרוגרמה — מסמך המפרט כמה חדרים דרושים, מה השימושים של כל חלל ואיזה סגנון עיצובי מועדף. המעצבת מודדת את הדירה בשטח כדי ליצור תוכנית מצב קיים.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop&q=80',
  },
  {
    id: '02',
    title: 'תכנון רעיוני',
    body:
      'סקיצות ותכנון מערך (Layout): העמדת ריהוט וחלוקת חללים — המעצבת מציעה מספר אופציות לסידור הבית. לוח השראה (Moodboard): גיבוש השפה הוויזואלית — חומרים, צבעים וטקסטורות.',
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop&q=80',
  },
  {
    id: '03',
    title: 'תוכניות עבודה לביצוע',
    body:
      'תרגום התכנון לשפת הקבלנים: תוכנית הריסה ובנייה, חשמל ותאורה, אינסטלציה, ריצוף ופריסות, נגרות מפורטת למטבח וארונות, מיזוג אוויר ותוכנית מטבח.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=800&fit=crop&q=80',
  },
  {
    id: '04',
    title: 'רכישות',
    body:
      'ימי רכישות מרוכזים ביחד עם הלקוח: בחירת ריצוף, חיפויים, כלים סניטריים, מטבח, תאורה ורהיטים. הכנת כתב כמויות — רשימה מפורטת לקבלן לצורך הצעת מחיר מדויקת.',
    image:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=800&fit=crop&q=80',
  },
  {
    id: '05',
    title: 'פיקוח עליון',
    body:
      'המעצבת מגיעה לאתר בנקודות קריטיות — לפני יציקת חשמל, תחילת ריצוף ועוד — כדי לוודא שהקבלן עובד לפי התוכניות. פתרון בעיות בשטח בזמן אמת לאורך כל תהליך השיפוץ.',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=800&fit=crop&q=80',
  },
  {
    id: '06',
    title: 'גמר והלבשה',
    body:
      'הפינישים האחרונים שהופכים את הדירה לבית: בחירת וילונות, שטיחים, תמונות ואקססוריז. סידור סופי והעמדת כל הרהיטים במקומם.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=800&fit=crop&q=80',
  },
];

function getMediaMatch(query) {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

function ImagePlaceholder({ src, title }) {
  const { ref, style } = useParallaxOffset(0.2, 0.06);

  const frame = (
    <div className="aspect-square w-full max-w-[min(76vmin,24rem)] overflow-hidden md:max-w-[min(48vmin,26rem)]">
      <div ref={ref} style={style} className="h-[118%] w-full">
        {src ? (
          <img src={src} alt={title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden>
            <svg className="h-1/4 w-1/4 text-[#1A1A1A]/25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex w-full items-center justify-center bg-beige-light px-6 py-4 md:px-12 md:py-6 lg:px-16 lg:py-8">
      {frame}
    </div>
  );
}

function TextPanel({ step, variant = 'slide' }) {
  const widthCls = variant === 'stack' ? 'w-full' : 'w-screen shrink-0';

  return (
    <div className={`${widthCls} ${variant === 'stack' ? 'min-h-0 md:min-h-[70vh]' : 'h-full'}`}>
      <div
        dir="rtl"
        lang="he"
        className="flex h-full min-h-0 flex-col justify-center overflow-y-auto bg-beige-light px-5 py-4 md:px-10 md:py-6 md:pl-14 md:pr-12 lg:pl-20 lg:pr-16"
      >
        <p className="text-sm font-normal text-dark/75 md:text-base">שלב {step.id}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]">
          {step.title}
        </h2>
        <div className="mt-3 h-px w-full bg-[#1A1A1A]" aria-hidden />
        <p className="mt-3 max-w-prose text-right text-base leading-relaxed text-gray-600 md:mt-4 md:text-lg">
          {step.body}
        </p>
      </div>
    </div>
  );
}

function ImagePanel({ step, variant = 'slide' }) {
  const widthCls = variant === 'stack' ? 'w-full' : 'w-screen shrink-0';

  return (
    <div className={`${widthCls} ${variant === 'stack' ? 'min-h-0 md:min-h-[70vh]' : 'h-full'}`}>
      <div className="flex h-full items-center justify-center bg-beige-light">
        <ImagePlaceholder src={step.image} title={step.title} />
      </div>
    </div>
  );
}

function DesktopSplitPanel({ step, variant = 'slide' }) {
  const widthCls = variant === 'stack' ? 'w-full' : 'w-screen shrink-0';

  return (
    <div
      className={`flex flex-row ${widthCls} ${variant === 'stack' ? 'min-h-0 md:min-h-[70vh]' : 'h-full'}`}
    >
      <div
        dir="rtl"
        lang="he"
        className="flex min-h-0 w-1/2 flex-col justify-center bg-beige-light px-6 py-4 md:px-10 md:py-6 md:pl-14 md:pr-12 lg:pl-20 lg:pr-16"
      >
        <p className="text-sm font-normal text-dark/75 md:text-base">שלב {step.id}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]">
          {step.title}
        </h2>
        <div className="mt-3 h-px w-full bg-[#1A1A1A]" aria-hidden />
        <p className="mt-3 max-w-prose text-right text-base leading-relaxed text-gray-600 md:mt-4 md:text-lg">
          {step.body}
        </p>
      </div>
      <div className="flex w-1/2 min-h-0 items-stretch justify-center bg-beige-light">
        <ImagePlaceholder src={step.image} title={step.title} />
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <header
      dir="rtl"
      lang="he"
      className="shrink-0 bg-beige-light px-6 pb-3 pt-4 md:px-10 md:pb-4 md:pt-5 lg:px-16"
    >
      <div className="mx-auto flex max-w-[100vw] items-center justify-start gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-dark/50">
          שלבי העבודה
        </span>
        <span className="h-px w-10 shrink-0 bg-dark/25" aria-hidden />
      </div>
    </header>
  );
}

const ServiceStepsScroll = () => {
  const sectionRef = useRef(null);
  const [tx, setTx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    getMediaMatch('(prefers-reduced-motion: reduce)'),
  );
  const [isDesktop, setIsDesktop] = useState(() => getMediaMatch('(min-width: 768px)'));

  const panels = isDesktop
    ? steps.map((s) => ({ kind: 'desktop', step: s }))
    : steps.flatMap((s) => [
        { kind: 'text', step: s },
        { kind: 'image', step: s },
      ]);
  const n = panels.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
      const raw = window.scrollY - top;
      const clamped = Math.min(Math.max(raw, 0), scrollable);
      const p = scrollable ? clamped / scrollable : 0;
      const maxX = (n - 1) * window.innerWidth;
      setTx(-p * maxX);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [n, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="bg-beige-light">
        <SectionHeader />
        <section aria-label="שלבי שירות">
          {panels.map((panel, idx) => (
            <div key={`${panel.kind}-${panel.step.id}-${idx}`} className="border-b border-[#1A1A1A]/10">
              <div className="min-h-[auto] md:min-h-[70vh]">
                {panel.kind === 'desktop' ? (
                  <DesktopSplitPanel step={panel.step} variant="stack" />
                ) : panel.kind === 'text' ? (
                  <TextPanel step={panel.step} variant="stack" />
                ) : (
                  <ImagePanel step={panel.step} variant="stack" />
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-beige-light"
      style={{ height: `${n * 100}vh` }}
      aria-label="שלבי שירות — גלילה אופקית"
    >
      <div className="sticky top-20 z-0 flex h-[75vh] flex-col overflow-hidden bg-beige-light md:top-16">
        <SectionHeader />
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <div
            className="flex h-full"
            style={{
              width: `${n * 100}vw`,
              transform: `translate3d(${tx}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {panels.map((panel, idx) => {
              const key = `${panel.kind}-${panel.step.id}-${idx}`;
              if (panel.kind === 'desktop') return <DesktopSplitPanel key={key} step={panel.step} />;
              if (panel.kind === 'text') return <TextPanel key={key} step={panel.step} />;
              return <ImagePanel key={key} step={panel.step} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceStepsScroll;
