import type { ReactNode } from 'react';

import './globals.css';
import Sidebar from './sidebar';
import Navbar from './components/Navbar';
import { I18nProvider } from './context/I18nProvider';
import { buildMetadata, getAllDictionaries, getDictionary, getLocaleFromCookies } from './lib/i18n';

export async function generateMetadata() {
  const locale = await getLocaleFromCookies();
  const messages = await getDictionary(locale);
  return buildMetadata(locale, messages);
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocaleFromCookies();
  const dictionaries = await getAllDictionaries();

  return (
    <html lang={locale}>
      <head>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async></script>
      </head>
      <body className="bg-background text-slate-100">
        <I18nProvider initialLocale={locale} dictionaries={dictionaries}>
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 p-3 md:p-10 w-full bg-surface/80 backdrop-blur-xl">
              <Navbar />
              {children}
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
