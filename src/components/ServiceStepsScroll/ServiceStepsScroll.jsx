import img2 from '../../assets/images/second-step.jpeg';
import img3 from '../../assets/images/third-step.jpeg';

const steps = [
  {
    title: 'היכרות והפרוגרמה',
    body: 'הכל מתחיל בהקשבה. בפגישת ההיכרות נצלול אל תוך הצרכים, החלומות ואורח החיים הייחודי שלכם. יחד ניצור את ה"פרוגרמה" – מסמך דרישות מקיף המהווה את המצפן לפרויקט כולו. נגדיר את התקציב, לוחות הזמנים, והחזון העיצובי שיהפוך את החלל שלכם לבית שמותאם לכם כמו כפפה ליד.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop&q=80',
  },
  {
    title: 'תכנון רעיוני',
    body: 'כאן החזון מתחיל לקרום עור וגידים. נבחן חלופות תכנון שונות לחלוקת החלל ולזרימה נכונה. זהו השלב שבו הקסם קורה: תקבלו הדמיות תלת-ממד (3D) פוטוריאליסטיות ברמה הגבוהה ביותר, שיאפשרו לכם להרגיש ולראות במדויק איך ייראה הבית שלכם, עד לרמת התאורה והטקסטורות, עוד לפני שנשברה לבנה אחת.',
    image: img2,
  },
  {
    title: 'תוכניות עבודה לביצוע',
    body: 'מתרגמים את העיצוב לשפת השטח ברמת דיוק של מילימטרים. נפיק סט תוכניות עבודה מקיף, קפדני וברור (הריסה, בנייה, חשמל, אינסטלציה, ריצוף ונגרות מותאמת אישית). השרטוטים האלו מהווים תוכנית פעולה חד-משמעית עבור הקבלן וכלל אנשי המקצוע, ולא משאירים שום מקום לטעויות בביצוע.',
    image: img3,
  },
  {
    title: 'רכישות',
    body: 'יוצאים יחד לימי קניות ממוקדים ויעילים באולמות התצוגה המובילים. בעזרת הליווי הצמוד שלי, נבחר את חומרי הגמר, הכלים הסניטריים, הריצוף והתאורה המדויקים ביותר. המטרה היא לקבל החלטות נכונות שמשמרות את השפה העיצובית המקורית, תוך ניהול חכם ועמידה בתקציב שהגדרנו.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=800&fit=crop&q=80',
  },
  {
    title: 'פיקוח עליון',
    body: 'השקט הנפשי שלכם לאורך כל תהליך השיפוץ או הבנייה. אגיע לשטח בנקודות זמן קריטיות כדי לוודא שהביצוע תואם במדויק לתוכניות העבודה, שהאיכות עומדת בסטנדרטים המחמירים שלנו, ולספק פתרונות מקצועיים בזמן אמת לכל אתגר טכני שעולה בשטח.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=800&fit=crop&q=80',
  },
  {
    title: 'גמר והלבשה',
    body: 'הטאצ׳ הסופי שהופך חלל מעוצב לבית עם נשמה. נכניס ונמקם את הריהוט, הטקסטיל, האמנות והאקססוריז שבחרנו בקפידה, ונדייק כל פינה. בסיומו של השלב הזה, הבית יעמוד מוכן לחלוטין – בדיוק כפי שחלמתם עליו בהדמיות, וכל מה שיישאר לכם הוא פשוט להיכנס וליהנות.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=800&fit=crop&q=80',
  },
];

function StepRow({ step, index }) {
  const isEven = index % 2 === 0;
  const stepNum = String(index + 1).padStart(2, '0');

  const image = step.image && (
    <div className="order-1 md:order-0 w-full md:w-[42%] shrink-0">
      <img
        src={step.image}
        alt={step.title}
        className="w-full h-64 md:h-80 lg:h-105 object-cover"
        loading="lazy"
      />
    </div>
  );

  const number = (
    <div className="order-2 md:order-0 shrink-0 self-center">
      <span
        className="block text-[7rem] leading-none md:text-[10rem] lg:text-[12rem] select-none"
        style={{ color: '#C8B89A', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
      >
        {stepNum}
      </span>
    </div>
  );

  const text = (
    <div className="order-3 md:order-0 flex-1">
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

const ServiceStepsScroll = () => (
  <section className="bg-beige-light" aria-label="שלבי שירות">
    <div dir="rtl" lang="he" className="px-8 pb-0 pt-14 md:px-16 md:pt-16 lg:px-24">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
        <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
          שלבי העבודה
        </span>
        <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
      </div>
    </div>

    <div>
      {steps.map((step, i) => (
        <StepRow key={step.title} step={step} index={i} />
      ))}
    </div>
  </section>
);

export default ServiceStepsScroll;
