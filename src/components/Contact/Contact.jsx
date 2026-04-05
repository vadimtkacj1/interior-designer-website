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
      className="bg-beige-light py-14 md:py-20 lg:py-24"
    >
      <div className="container">
        {/* Header — shown above both columns */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
            <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55 md:text-lg">
              יצירת קשר
            </span>
            <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
          </div>
          <h2
            id="contact-heading"
            className="section-title-gap text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl lg:text-[2.35rem]"
          >
            נשמח לשמוע על הפרויקט
          </h2>
          <p className="mt-5 text-base leading-relaxed text-dark/60 md:mt-6 md:text-lg md:leading-relaxed">
            השאירו פרטים ונחזור אליכם בהקדם האפשרי
          </p>
        </header>

        {/* Two-column layout on desktop */}
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Left column — contact info */}
          <div className="hidden lg:flex flex-col justify-center gap-8 border border-dark/10 bg-white px-10 py-10 h-full">
            <p className="text-lg font-semibold text-dark">פרטי התקשרות</p>

            <div className="flex flex-col gap-6 text-right">
              <a
                href="tel:0525270051"
                className="flex items-center gap-4 group"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-dark/12 bg-beige-light text-dark/50 transition-colors group-hover:border-dark/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.53 6.53l.96-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-dark/45 mb-0.5">טלפון</p>
                  <p className="text-base font-medium text-dark group-hover:text-[#2D4733] transition-colors">052-527-0051</p>
                </div>
              </a>

              <a
                href="https://wa.me/972525270051"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-dark/12 bg-beige-light text-dark/50 transition-colors group-hover:border-dark/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.557 4.118 1.528 5.845L0 24l6.335-1.508A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 0 1-5.001-1.368l-.36-.213-3.727.977.994-3.634-.234-.373A9.787 9.787 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-dark/45 mb-0.5">WhatsApp</p>
                  <p className="text-base font-medium text-dark group-hover:text-[#2D4733] transition-colors">שלחו הודעה</p>
                </div>
              </a>

            </div>

            <div className="border-t border-dark/10 pt-6">
              <p className="text-sm leading-relaxed text-dark/50">
                נחזור אליכם תוך יום עסקים אחד
              </p>
            </div>
          </div>

          {/* Right column — form */}
          <div className="mx-auto w-full max-w-xl lg:max-w-none lg:mx-0">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
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
      </div>
    </section>
  );
};

export default Contact;
