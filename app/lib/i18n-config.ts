import type esMessages from '../../locales/es.json';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof esMessages;
export const defaultLocale: Locale = 'es';
export const LOCALE_COOKIE_NAME = 'mentorx_locale';
export const LEGACY_LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
