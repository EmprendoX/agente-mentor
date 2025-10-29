import 'server-only';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { LOCALE_COOKIE_NAME, defaultLocale, locales, type Locale } from './i18n-config';

type Dictionaries = typeof import('../../locales/es.json');

export type Messages = Dictionaries;

const dictionaryLoaders: Record<Locale, () => Promise<Messages>> = {
  es: () => import('../../locales/es.json').then((mod) => mod.default),
  en: () => import('../../locales/en.json').then((mod) => mod.default),
};

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaryLoaders[locale]();
}

export async function getAllDictionaries(): Promise<Record<Locale, Messages>> {
  const entries = await Promise.all(locales.map(async (locale) => [locale, await getDictionary(locale)] as const));
  return Object.fromEntries(entries) as Record<Locale, Messages>;
}

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value as Locale | undefined;
  if (cookieValue && locales.includes(cookieValue)) {
    return cookieValue;
  }
  return defaultLocale;
}

export function buildMetadata(locale: Locale, messages: Messages): Metadata {
  const meta = messages.metadata;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.creator }],
    creator: meta.creator,
    publisher: meta.creator,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://mentorx.mx'),
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: 'https://mentorx.mx',
      siteName: meta.openGraph.siteName,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta.openGraph.imageAlt,
        },
      ],
      locale: meta.openGraph.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.twitter.title,
      description: meta.twitter.description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: meta.verification.google,
    },
  } satisfies Metadata;
}

export function getLocaleCookieName() {
  return LOCALE_COOKIE_NAME;
}
