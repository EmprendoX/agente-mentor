"use client";

import { useState, useEffect } from 'react';
import { Download, ExternalLink, AlertCircle } from 'lucide-react';

interface PDFViewerProps {
  pdfPath: string;
  title: string;
  isMobile?: boolean;
}

export default function PDFViewer({ pdfPath, title, isMobile = false }: PDFViewerProps) {
  const [hasError, setHasError] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detectar Safari
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

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
            <span className="font-medium text-gray-800">PDF Viewer</span>
            {isSafari && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Safari
              </span>
            )}
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
        {isSafari ? (
          <div className="flex items-center justify-center h-96 bg-gray-50">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Safari - PDF Viewer
              </h3>
              <p className="text-gray-600 mb-4">
                Safari tiene limitaciones para mostrar PDFs en el navegador. Usa las opciones de descarga.
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
        ) : !hasError ? (
          <object
            data={pdfPath}
            type="application/pdf"
            className="w-full"
            style={{
              height: isMobile ? '600px' : '90vh',
              minHeight: '600px',
              border: 'none'
            }}
            onError={() => setHasError(true)}
          >
            <p>Tu navegador no puede mostrar PDFs. 
              <a href={pdfPath} target="_blank" className="text-blue-600 hover:underline">
                Haz clic aquí para descargar el PDF
              </a>
            </p>
          </object>
        ) : (
          <div className="flex items-center justify-center h-96 bg-gray-50">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                PDF no disponible en el visor
              </h3>
              <p className="text-gray-600 mb-4">
                Usa las opciones de descarga o nueva pestaña.
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