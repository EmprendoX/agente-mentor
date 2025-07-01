import './globals.css';
import Sidebar from './sidebar';

export const metadata = {
  title: 'SchoolX - Plataforma Educativa para Niños y Jóvenes',
  description: 'Plataforma educativa especializada para niños y jóvenes de 8-17 años. eBooks educativos, mentoría personalizada y herramientas de aprendizaje interactivas.',
  keywords: 'educación, niños, jóvenes, ebooks educativos, mentoría, aprendizaje, schoolx, plataforma educativa',
  authors: [{ name: 'SchoolX' }],
  creator: 'SchoolX',
  publisher: 'SchoolX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://app.schoolx.mx'),
  openGraph: {
    title: 'SchoolX - Plataforma Educativa para Niños y Jóvenes',
    description: 'Plataforma educativa especializada para niños y jóvenes de 8-17 años con eBooks y mentoría personalizada',
    url: 'https://app.schoolx.mx',
    siteName: 'SchoolX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SchoolX - Plataforma Educativa',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SchoolX - Plataforma Educativa para Niños y Jóvenes',
    description: 'Plataforma educativa especializada para niños y jóvenes de 8-17 años',
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
