"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode, startTransition } from 'react';
import { useRouter } from 'next/navigation';

import {
  LEGACY_LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_NAME,
  locales,
  type Locale,
  type Messages,
} from '../lib/i18n-config';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  t: (key: string) => string;
  get: <T>(key: string) => T;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function resolveKey<T>(messages: Messages, key: string): T {
  const segments = key.split('.');
  let value: any = messages;

  for (const segment of segments) {
    if (value == null || typeof value !== 'object') {
      return undefined as T;
    }
    value = (value as Record<string, unknown>)[segment];
  }

  return value as T;
}

type ProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
  dictionaries: Record<Locale, Messages>;
};

export function I18nProvider({ children, initialLocale, dictionaries }: ProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.cookie = `${LEGACY_LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
    document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(initialLocale)}; path=/; max-age=31536000`;
  }, [initialLocale]);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (!locales.includes(nextLocale)) {
        return;
      }
      setLocaleState(nextLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(nextLocale)}; path=/; max-age=31536000`;
      document.cookie = `${LEGACY_LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
      startTransition(() => {
        router.refresh();
      });
    },
    [router],
  );

  const value = useMemo<I18nContextValue>(() => {
    const currentMessages = dictionaries[locale];

    const getValue = <T,>(key: string): T => resolveKey<T>(currentMessages, key);

    const translate = (key: string) => {
      const result = getValue<unknown>(key);
      if (result == null) {
        return key;
      }
      if (typeof result === 'string') {
        return result;
      }
      return String(result);
    };

    return {
      locale,
      setLocale,
      messages: currentMessages,
      get: getValue,
      t: translate,
    };
  }, [dictionaries, locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
