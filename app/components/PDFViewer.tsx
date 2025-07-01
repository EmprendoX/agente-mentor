"use client";

import { useState, useEffect } from 'react';
import { Download, ExternalLink, AlertCircle, CheckCircle, Eye } from 'lucide-react';

interface PDFViewerProps {
  pdfPath: string;
  title: string;
  isMobile?: boolean;
}

export default function PDFViewer({ pdfPath, title, isMobile = false }: PDFViewerProps) {
  const [viewMode, setViewMode] = useState<'iframe' | 'object' | 'embed'>('iframe');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiPdfPath, setApiPdfPath] = useState('');

  useEffect(() => {
    // Extraer el slug del pdfPath
    const pathParts = pdfPath.split('/');
    const slug = pathParts[pathParts.length - 2]; // Obtener el slug del path
    setApiPdfPath(`/api/pdf/${slug}`);
    
    // Simular carga
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pdfPath]);

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = apiPdfPath || pdfPath;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(apiPdfPath || pdfPath, '_blank');
  };

  const tryNextViewMode = () => {
    if (viewMode === 'iframe') {
      setViewMode('object');
    } else if (viewMode === 'object') {
      setViewMode('embed');
    } else {
      setHasError(true);
    }
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

  const currentPdfPath = apiPdfPath || pdfPath;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header del visor */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800">PDF Disponible</span>
            {apiPdfPath && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                API Route
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
            <button
              onClick={tryNextViewMode}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Cambiar Vista
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
              src={currentPdfPath}
              title={`${title} - PDF Viewer`}
              className="w-full"
              style={{
                height: isMobile ? '600px' : '800px',
                minHeight: '400px',
                border: 'none'
              }}
              onError={tryNextViewMode}
            />
          )}

          {viewMode === 'object' && (
            <object
              data={currentPdfPath}
              type="application/pdf"
              className="w-full"
              style={{
                height: isMobile ? '600px' : '800px',
                minHeight: '400px',
                border: 'none'
              }}
              onError={tryNextViewMode}
            >
              <p>Tu navegador no puede mostrar PDFs. <a href={currentPdfPath} target="_blank">Haz clic aquí para descargar</a></p>
            </object>
          )}

          {viewMode === 'embed' && (
            <embed
              src={currentPdfPath}
              type="application/pdf"
              className="w-full"
              style={{
                height: isMobile ? '600px' : '800px',
                minHeight: '400px',
                border: 'none'
              }}
            />
          )}
          
          {/* Overlay de información */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {viewMode.toUpperCase()} Viewer
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