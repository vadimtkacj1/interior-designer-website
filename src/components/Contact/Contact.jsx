import React, { useState } from 'react';

const fieldClass =
  'w-full min-h-[3rem] rounded-none border border-dark/15 bg-white px-4 py-3 text-right text-base text-dark placeholder:text-dark/30 outline-none transition-[border-color,background-color,box-shadow] focus:border-dark/35 focus:ring-1 focus:ring-dark/10 md:min-h-[3.25rem] md:text-[1.0625rem]';

const textareaClass = `${fieldClass} min-h-[7rem] resize-y py-3`;

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL?.trim() || '';

function validatePhone(phone) {
  const clean = phone?.replace(/[\s\-()]/g, '') || '';
  if (clean.length < 9) return 'מספר טלפון לא תקין - יש להזין לפחות 9 ספרות';
  const phoneRegex = /^(\+?972|0)?([2-9]\d{7,8})$/;
  if (!phoneRegex.test(clean)) {
    return 'מספר טלפון לא תקין - פורמט: 05XXXXXXXX או +97205XXXXXXXX';
  }
  return null;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');

    if (!contactApiUrl) {
      setStatus('error');
      setFeedback('שירות השליחה לא הוגדר. צור קשר עם מנהל האתר.');
      return;
    }

    const name = formData.name.trim();
    if (name.length < 2) {
      setStatus('error');
      setFeedback('שם חייב להכיל לפחות 2 תווים');
      return;
    }

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      setStatus('error');
      setFeedback(phoneErr);
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: formData.phone.trim(),
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setFeedback(data.error || 'אירעה שגיאה. נסו שוב מאוחר יותר.');
        return;
      }

      setStatus('success');
      setFeedback('הפרטים נשלחו בהצלחה. נחזור אליכם בקרוב.');
      setFormData({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
      setFeedback('לא ניתן להתחבר לשרת. בדקו את החיבור או נסו מאוחר יותר.');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      dir="rtl"
      lang="he"
      className="border-t border-dark/[0.06] bg-beige-light py-14 md:py-20 lg:py-24"
    >
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
          <header className="text-right lg:col-span-5">
            <div className="flex items-center justify-start gap-3">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-dark/55 md:text-[0.9375rem]">
                יצירת קשר
              </span>
              <span className="h-px w-12 shrink-0 bg-dark/25 md:w-14" aria-hidden />
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
            {feedback ? (
              <p
                role="status"
                className={
                  status === 'success'
                    ? 'border border-[#2D4733]/25 bg-[#2D4733]/08 px-4 py-3 text-right text-base text-dark'
                    : 'border border-red-200 bg-red-50 px-4 py-3 text-right text-base text-red-900'
                }
              >
                {feedback}
              </p>
            ) : null}

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
              disabled={status === 'submitting'}
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
              disabled={status === 'submitting'}
              className={fieldClass}
            />

            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="הודעה (אופציונלי)"
              rows={4}
              aria-label="הודעה"
              disabled={status === 'submitting'}
              className={textareaClass}
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-1 min-h-[3.25rem] w-full rounded-none border border-[#2D4733] bg-[#2D4733] px-4 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#243829] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-[3.5rem] md:text-lg"
            >
              {status === 'submitting' ? 'שולח…' : 'שליחה'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
