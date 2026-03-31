import React from 'react';
import Parallax from '../Parallax/Parallax';

function IconInstagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2.25"
        y="2.25"
        width="19.5"
        height="19.5"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function IconFacebook({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2.25"
        y="2.25"
        width="19.5"
        height="19.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        fill="currentColor"
        d="M13.5 9.75h2.25V7.5h-2.1c-2.06 0-3.4 1.35-3.4 3.82V12H8v2.25h2.25v6.75H13V14.25h2.06l.44-2.25H13v-1.2c0-.6.12-1.12 1.12-1.12z"
      />
    </svg>
  );
}

const social = [
  { name: 'Instagram', href: 'https://www.instagram.com/alexandra_patsin_designer?utm_source=qr&igsh=MTZ6cjJyeXIxMXU0aA==', Icon: IconInstagram },
  { name: 'Facebook', href: 'https://www.facebook.com/share/1B8TMjxV1K/', Icon: IconFacebook },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      lang="he"
      className="relative overflow-hidden bg-[#2e4d33] py-12 text-white md:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90" aria-hidden>
        <Parallax
          speed={0.14}
          speedX={0.1}
          className="absolute -right-[8%] -top-[20%] h-[min(50vw,420px)] w-[min(50vw,420px)] rounded-full bg-white/[0.06] blur-[64px] md:blur-[80px]"
        />
        <Parallax
          speed={-0.12}
          speedX={-0.08}
          className="absolute -left-[12%] bottom-0 h-[min(45vw,380px)] w-[min(45vw,380px)] rounded-full bg-black/20 blur-[56px] md:blur-[72px]"
        />
      </div>
      <div className="container relative z-10 flex flex-col items-center px-6">
        <nav
          className="flex items-center justify-center gap-8 text-white md:gap-10"
          aria-label="רשתות חברתיות"
        >
          {social.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2e4d33]"
              aria-label={name}
            >
              {React.createElement(Icon, { className: 'h-6 w-6 md:h-7 md:w-7', 'aria-hidden': true })}
            </a>
          ))}
        </nav>

        <div className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-white md:mt-12 md:text-base">
          <p className="leading-relaxed">
            © {year} אלכסנדרה פאצינה. כל הזכויות שמורות.
          </p>
          <a
            href="https://aiterra.agency/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 transition-opacity hover:opacity-70"
          >
            Built by Aiterra
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
