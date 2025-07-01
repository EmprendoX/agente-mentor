"use client";

import { useParams } from 'next/navigation';
import { Download, ExternalLink, BookOpen } from 'lucide-react';

const EBOOKS = {
  'educacion-con-sentido': {
    title: 'Educación con Sentido',
    description: 'Transforma tu práctica educativa con estrategias innovadoras',
    pdf_path: '/ebooks/educacion-con-sentido/educacion-con-sentido.pdf',
    cover_path: '/ebooks/educacion-con-sentido/portada.png'
  },
  'como-hacer-que-extranos-compren-tu-propiedad': {
    title: 'Cómo Hacer que Extraños Compren tu Propiedad',
    description: 'Técnicas probadas para vender propiedades rápidamente a compradores que no conoces.',
    pdf_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.pdf',
    cover_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.png'
  },
  'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo': {
    title: 'Accede al Mercado de Bienes Raíces Más Rentable del Mundo',
    description: 'Descubre las estrategias más efectivas para invertir en el mercado inmobiliario más rentable del mundo.',
    pdf_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.pdf',
    cover_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.png'
  },
  'guia-preventas-inmobiliarias': {
    title: 'Guía de Preventas Inmobiliarias',
    description: 'Todo lo que necesitas saber sobre preventas inmobiliarias exitosas.',
    pdf_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.pdf',
    cover_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.png'
  },
  'how-to-turn-strangers-into-buyers-real-estate': {
    title: 'How to Turn Strangers into Buyers - Real Estate',
    description: 'English version: Proven techniques to sell properties quickly to unknown buyers.',
    pdf_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.pdf',
    cover_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.png'
  },
  'mas-leads-mas-ventas': {
    title: 'Más Leads, Más Ventas',
    description: 'Estrategias efectivas para generar más leads y aumentar tus ventas.',
    pdf_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.pdf',
    cover_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.png'
  },
  'more-leads-ebook': {
    title: 'More Leads eBook',
    description: 'English version: Effective strategies to generate more leads and increase your sales.',
    pdf_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.pdf',
    cover_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.png'
  },
  'the-product-lab': {
    title: 'The Product Lab',
    description: 'English version: Master the art of product development and market validation.',
    pdf_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.pdf',
    cover_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.png'
  }
};

export default function EbookPage() {
  const params = useParams();
  const slug = params.slug as string;
  const ebook = EBOOKS[slug as keyof typeof EBOOKS];

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E0]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#1F2937]">eBook no encontrado</h1>
          <a href="/ebooks" className="bg-[#2563EB] text-white px-6 py-3 rounded-lg">
            Volver a eBooks
          </a>
        </div>
      </div>
    );
  }

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = ebook.pdf_path;
    link.download = `${ebook.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(ebook.pdf_path, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-[#1F2937] mb-1">{ebook.title}</h1>
          <p className="text-sm text-gray-600">{ebook.description}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="mb-6">
              <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{ebook.title}</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Descargar PDF
              </button>
              <button
                onClick={openInNewTab}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Abrir en Nueva Pestaña
              </button>
            </div>
            <div className="w-full max-w-3xl mx-auto">
              <iframe
                src={ebook.pdf_path}
                title={ebook.title}
                className="w-full border rounded-lg"
                style={{ minHeight: '70vh' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 