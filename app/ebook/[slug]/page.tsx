"use client";

import { useParams } from 'next/navigation';
import PDFViewer from '../../components/PDFViewer';

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

  return (
    <div className="min-h-screen bg-[#FAF3E0] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-[#1F2937] mb-1">{ebook.title}</h1>
          <p className="text-sm text-gray-600">{ebook.description}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <PDFViewer 
            pdfPath={ebook.pdf_path} 
            title={ebook.title}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
} 