import React from 'react';

const services = [
  {
    title: 'תכנון ועיצוב פנים',
    description: 'מעטפת עיצוב מלאה — מהרעיון הראשוני ועד לביצוע הסופי',
  },
  {
    title: 'עיצוב למגורים',
    description: 'פתרונות מותאמים אישית לדירות ובתים פרטיים',
  },
  {
    title: 'עיצוב לעסקים',
    description: 'תכנון חללי משרד, מסחר ואירוח שמשקף את זהות המותג',
  },
  {
    title: 'שרטוט',
    description: 'תוכניות עבודה מפורטות לביצוע — חשמל, אינסטלציה, נגרות ועוד',
  },
  {
    title: 'תכנון',
    description: 'תכנון מערך חללים, חלוקת שטחים ופרוגרמה מותאמת לצרכי הלקוח',
  },
  {
    title: 'מידול',
    description: 'הדמיות תלת־ממד ריאליסטיות לצפייה בחלל לפני תחילת הביצוע',
  },
];

const Services = () => {
  return (
    <section id="services" className="section bg-beige-light" dir="rtl" lang="he">
      <div className="container">
        <div className="mb-12 text-center md:mb-16 lg:mb-20">
          <div className="flex items-center justify-start gap-3">
            <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
              שירותים
            </span>
            <span className="h-px w-12 shrink-0 bg-dark/25 md:w-14" aria-hidden />
          </div>
          <h2 className="section-title-gap text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]">
            מעטפת מלאה לתכנון ועיצוב פנים
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:grid-cols-3 lg:gap-x-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-b border-dark/[0.08] py-8 text-center md:border-0 md:py-0"
            >
              <h3 className="mb-2 text-lg font-semibold text-dark md:text-base">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-dark/55 md:text-sm md:leading-loose">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
