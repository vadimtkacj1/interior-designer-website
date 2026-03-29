import React, { useState } from 'react';

const fieldClass =
  'w-full min-h-[3rem] rounded-none border border-dark/15 bg-white px-4 py-3 text-right text-base text-dark placeholder:text-dark/30 outline-none transition-[border-color,background-color,box-shadow] focus:border-dark/35 focus:ring-1 focus:ring-dark/10 md:min-h-[3.25rem] md:text-[1.0625rem]';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      dir="rtl"
      lang="he"
      className="border-t border-dark/[0.06] bg-beige-light py-20 md:py-28 lg:py-32"
    >
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
          <header className="text-right lg:col-span-5">
            <div className="flex items-center justify-start gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-dark/50">
                יצירת קשר
              </span>
              <span className="h-px w-10 shrink-0 bg-dark/25" aria-hidden />
            </div>
            <h2
              id="contact-heading"
              className="section-title-gap text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]"
            >
              נשמח לשמוע על הפרויקט
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-dark/60 md:mt-6 md:text-lg md:leading-relaxed">
              השאירו פרטים וההודעה שלכם — ואחזור אליכם תוך ימים ספורים לשיחת היכרות קצרה.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7"
            aria-labelledby="contact-heading"
          >
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="לדוגמה: יעל כהן"
              autoComplete="name"
              aria-label="שם מלא"
              required
              className={fieldClass}
            />

            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="050-1234567"
              autoComplete="tel"
              inputMode="tel"
              aria-label="טלפון"
              required
              className={fieldClass}
            />

            <button
              type="submit"
              className="mt-1 min-h-[3.25rem] w-full rounded-none border border-[#2D4733] bg-[#2D4733] px-4 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#243829] md:min-h-[3.5rem] md:text-lg"
            >
              שליחה
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
