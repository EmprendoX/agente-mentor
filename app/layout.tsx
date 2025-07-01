import './globals.css';
import Sidebar from './sidebar';

export const metadata = {
  title: 'Agente Mentor - Plataforma de eBooks con IA',
  description: 'Plataforma moderna de eBooks especializados con mentoría integrada por inteligencia artificial, diseñada para profesionales y emprendedores.',
  keywords: 'ebooks, mentoría, IA, inteligencia artificial, profesionales, emprendedores, agente mentor, plataforma educativa',
  authors: [{ name: 'Agente Mentor' }],
  creator: 'Agente Mentor',
  publisher: 'Agente Mentor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mentorx.mx'),
  openGraph: {
    title: 'Agente Mentor - Plataforma de eBooks con IA',
    description: 'Plataforma moderna de eBooks especializados con mentoría integrada por inteligencia artificial, diseñada para profesionales y emprendedores',
    url: 'https://mentorx.mx',
    siteName: 'Agente Mentor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agente Mentor - Plataforma de eBooks con IA',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agente Mentor - Plataforma de eBooks con IA',
    description: 'Plataforma moderna de eBooks especializados con mentoría integrada por inteligencia artificial',
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
    google: 'tu-codigo-de-verificacion',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-3 md:p-6 bg-[#FAF3E0] min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
