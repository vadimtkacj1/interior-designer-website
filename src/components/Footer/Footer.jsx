import React from 'react';
import Parallax from '../Parallax/Parallax';

function IconX({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

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

function IconLinkedIn({ className }) {
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
        d="M8 9.75v7.5H5.5v-7.5H8zm-1.25-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12.75 13.5v3.75h-2.5V9.75h2.4v1.05h.03a2.65 2.65 0 012.52-1.35c2.7 0 3.2 1.78 3.2 4.08v3.82h-2.5v-3.39c0-.85-.02-1.95-1.18-1.95-1.19 0-1.37.93-1.37 1.89v3.45h-2.5z"
      />
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
  { name: 'X', href: '#', Icon: IconX },
  { name: 'Instagram', href: '#', Icon: IconInstagram },
  { name: 'LinkedIn', href: '#', Icon: IconLinkedIn },
  { name: 'Facebook', href: '#', Icon: IconFacebook },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      lang="he"
      className="relative overflow-hidden bg-[#2e4d33] py-14 text-white md:py-16 lg:py-20"
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
              className="text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2e4d33]"
              aria-label={name}
            >
              {React.createElement(Icon, { className: 'h-6 w-6 md:h-7 md:w-7', 'aria-hidden': true })}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col items-center gap-3 text-center text-sm text-white md:mt-14 md:text-base">
          <p className="leading-relaxed">
            © {year} אלכסנדרה פאצינה. כל הזכויות שמורות.
          </p>
          <p className="text-white/90">נוצר על ידי אייטור</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
