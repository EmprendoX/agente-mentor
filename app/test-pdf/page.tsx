"use client";

export default function TestPDFPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Test PDF</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-blue-50 border-b">
            <h2 className="text-lg font-semibold">PDF Test - Educación con Sentido</h2>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Puedes probar estos enlaces:
          </p>
          <div className="mt-4 space-x-4">
            <a 
              href="/ebooks/educacion-con-sentido/educacion-con-sentido.pdf" 
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Abrir PDF en nueva pestaña
            </a>
            <a 
              href="/ebooks/educacion-con-sentido/educacion-con-sentido.pdf" 
              download
              className="text-green-600 hover:underline"
            >
              Descargar PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 