import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';

export function Section({ number, title, children }) {
  return (
    <section className="mt-10 md:mt-12">
      <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight text-dark md:text-2xl">
        <span className="text-[#2D4733]">{number}.</span>
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-dark/75 md:text-[1.0625rem]">
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }) {
  return (
    <ul className="flex flex-col gap-3 pr-5">
      {items.map((item, i) => (
        <li key={i} className="list-disc marker:text-[#2D4733]">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalLayout({ docTitle, title, updatedDate, children }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = docTitle;
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
    };
  }, [docTitle]);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-beige-light text-dark">
      <header className="border-b border-dark/[0.06] bg-beige-light">
        <div className="mx-auto flex h-20 w-full max-w-[1600px] flex-row-reverse items-center justify-between px-6 md:h-24 md:px-12 lg:px-20">
          <a href="/" aria-label="חזרה לדף הבית">
            <img src="/logo.svg" alt="אלכסנדרה פאצינה" className="h-12 w-auto object-contain md:h-16" />
          </a>
          <a
            href="/"
            className="text-[14px] font-semibold uppercase tracking-[0.1em] text-dark/60 transition-colors duration-300 hover:text-dark"
          >
            חזרה לדף הבית
          </a>
        </div>
      </header>

      <main className="container py-14 md:py-20">
        <article className="mx-auto max-w-3xl">
          <header>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 shrink-0 bg-dark/25" aria-hidden />
              <span className="text-base font-medium uppercase tracking-[0.2em] text-dark/55">
                מסמך משפטי
              </span>
            </div>
            <h1 className="section-title-gap text-3xl font-semibold leading-[1.12] tracking-tight text-dark md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-dark/50 md:text-base">עודכן לאחרונה: {updatedDate}</p>
          </header>

          {children}
        </article>
      </main>

      <Footer />
    </div>
  );
}
