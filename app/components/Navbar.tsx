"use client";

import type { ComponentProps } from 'react';

import { useI18n } from '../context/I18nProvider';
import type { Locale } from '../lib/i18n-config';

const languageOptions: { locale: Locale; labelKey: string }[] = [
  { locale: 'es', labelKey: 'navbar.spanish' },
  { locale: 'en', labelKey: 'navbar.english' },
];

export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={className}>
      <span className="mr-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        {t('navbar.language')}
      </span>
      <div className="inline-flex items-center gap-1 rounded-full bg-white/5 p-1">
        {languageOptions.map((option) => {
          const isActive = option.locale === locale;
          return (
            <button
              key={option.locale}
              type="button"
              onClick={() => setLocale(option.locale)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.45)]'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
              aria-pressed={isActive}
              disabled={isActive}
            >
              {t(option.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Navbar(props: ComponentProps<'header'>) {
  const { className, ...rest } = props;

  return (
    <header
      className={`mb-6 flex items-center justify-end ${className ?? ''}`.trim()}
      {...rest}
    >
      <LanguageSelector />
    </header>
  );
}
