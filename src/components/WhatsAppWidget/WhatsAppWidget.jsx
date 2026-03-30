import React from 'react';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const DEFAULT_MESSAGE =
  'היי אבי , הגעתי מהאתר , אשמח לדעת מתי נוכל לקבוע פגישה ?';

const waHref = `https://wa.me/972544729513?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

export default function WhatsAppWidget() {
  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[9999] w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-[#25d366] flex items-center justify-center shadow-lg shadow-[#25d366]/30 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95"
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        right: 'max(1.5rem, env(safe-area-inset-right))',
      }}
      aria-label="פתח WhatsApp לשליחת הודעה"
    >
      <WhatsAppIcon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
    </a>
  );
}
