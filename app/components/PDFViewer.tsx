"use client";

import { useState } from 'react';
import { Download, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface PDFViewerProps {
  pdfPath: string;
  title: string;
  isMobile?: boolean;
}

export default function PDFViewer({ pdfPath, title, isMobile = false }: PDFViewerProps) {
  const [hasError, setHasError] = useState(false);

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header del visor */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800">PDF Disponible</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={downloadPDF}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>
            <button
              onClick={openInNewTab}
              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              Nueva Pestaña
            </button>
          </div>
        </div>
      </div>

      {/* Contenido del PDF */}
      <div className="relative">
        {isMobile && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <p className="text-sm text-blue-700">
              💡 <strong>Consejo para móvil:</strong> Si el PDF no se muestra correctamente, usa "Nueva Pestaña" para una mejor experiencia.
            </p>
          </div>
        )}

        {/* Iframe directo */}
        <div className="relative">
          <iframe
            src={pdfPath}
            title={`${title} - PDF Viewer`}
            className="w-full"
            style={{
              height: isMobile ? '600px' : '800px',
              minHeight: '400px',
              border: 'none'
            }}
            onError={() => setHasError(true)}
          />
          
          {/* Overlay de información */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            IFRAME VIEWER
          </div>
        </div>

        {/* Fallback si hay error */}
        {hasError && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                PDF no disponible en el visor
              </h3>
              <p className="text-gray-600 mb-4">
                El PDF no se puede mostrar en el visor integrado.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={downloadPDF}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </button>
                <button
                  onClick={openInNewTab}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir en Nueva Pestaña
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 