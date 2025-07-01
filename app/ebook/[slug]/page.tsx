"use client";

import { useParams } from 'next/navigation';
import { Download, ExternalLink, BookOpen } from 'lucide-react';

const EBOOKS = {
  'educacion-con-sentido': {
    title: 'Educación con Sentido',
    description: 'Transforma tu práctica educativa con estrategias innovadoras',
    pdf_path: '/ebooks/educacion-con-sentido/educacion-con-sentido.pdf',
    cover_path: '/ebooks/educacion-con-sentido/portada.png'
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
              <p className="text-gray-600 mb-6">Tu eBook está listo para descargar - Vercel Fixed</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Si tienes problemas para descargar, intenta abrir en nueva pestaña</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 