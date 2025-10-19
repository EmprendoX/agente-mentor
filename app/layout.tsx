import './globals.css';
import Sidebar from './sidebar';

export const metadata = {
  title: 'Agente Mentor OS - Ecosistema de agentes IA para crecer tu proyecto',
  description:
    'Agente Mentor OS orquesta agentes de inteligencia artificial especializados en estrategia, ventas, operaciones y aprendizaje continuo para potenciar emprendedores y equipos en crecimiento.',
  keywords:
    'agentes de inteligencia artificial, mentoría, emprendimiento, automatización, agentes colaborativos, plataforma IA, Agente Mentor OS',
  authors: [{ name: 'Agente Mentor OS' }],
  creator: 'Agente Mentor OS',
  publisher: 'Agente Mentor OS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mentorx.mx'),
  openGraph: {
    title: 'Agente Mentor OS - Ecosistema de agentes IA',
    description:
      'Una plataforma de agentes IA que conecta estrategia, automatización y aprendizaje para emprendedores latinoamericanos.',
    url: 'https://mentorx.mx',
    siteName: 'Agente Mentor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agente Mentor OS - Ecosistema de agentes IA',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agente Mentor OS - Ecosistema de agentes IA',
    description: 'Agentes colaborativos diseñados para acompañar a emprendedores y equipos en cada etapa de crecimiento.',
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
      <head>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async></script>
      </head>
      <body className="flex flex-col md:flex-row bg-background text-slate-100">
        <Sidebar />
        <main className="flex-1 p-3 md:p-10 min-h-screen w-full bg-surface/80 backdrop-blur-xl">
          {children}
        </main>
      </body>
    </html>
  );
}
