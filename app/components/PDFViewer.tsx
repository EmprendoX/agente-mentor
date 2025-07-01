"use client";

import { useState, useEffect } from 'react';
import { Download, ExternalLink, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface PDFViewerProps {
  pdfPath: string;
  title: string;
  isMobile?: boolean;
}

export default function PDFViewer({ pdfPath, title, isMobile = false }: PDFViewerProps) {
  const [viewMode, setViewMode] = useState<'iframe' | 'google' | 'direct'>('iframe');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
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

  const tryGoogleViewer = () => {
    setViewMode('google');
    setHasError(false);
  };

  const tryDirectView = () => {
    setViewMode('direct');
    setHasError(false);
  };

  const resetViewer = () => {
    setViewMode('iframe');
    setHasError(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando PDF...</p>
        </div>
      </div>
    );
  }

  // Construir URL para Google Docs Viewer
  const fullPdfUrl = typeof window !== 'undefined' ? `${window.location.origin}${pdfPath}` : pdfPath;
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullPdfUrl)}&embedded=true`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header del visor */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800">PDF Disponible</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {viewMode.toUpperCase()}
            </span>
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
            <button
              onClick={resetViewer}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Reiniciar
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

        {/* Diferentes métodos de visualización */}
        <div className="relative">
          {viewMode === 'iframe' && (
            <iframe
              src={pdfPath}
              title={`${title} - PDF Viewer`}
              className="w-full"
              style={{
                height: isMobile ? '600px' : '800px',
                minHeight: '400px',
                border: 'none'
              }}
              onError={() => {
                setHasError(true);
                setTimeout(tryGoogleViewer, 2000);
              }}
            />
          )}

          {viewMode === 'google' && (
            <iframe
              src={googleViewerUrl}
              title={`${title} - Google Docs Viewer`}
              className="w-full"
              style={{
                height: isMobile ? '600px' : '800px',
                minHeight: '400px',
                border: 'none'
              }}
              onError={() => {
                setHasError(true);
                setTimeout(tryDirectView, 2000);
              }}
            />
          )}

          {viewMode === 'direct' && (
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
          
          {/* Overlay de información */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {viewMode.toUpperCase()} VIEWER
          </div>
        </div>

        {/* Fallback si hay error */}
        {hasError && viewMode !== 'direct' && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Cambiando método de visualización...
              </h3>
              <p className="text-gray-600 mb-4">
                Intentando cargar el PDF con un método alternativo.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={tryGoogleViewer}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Usar Google Viewer
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Descargar PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 