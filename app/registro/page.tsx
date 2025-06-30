"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  UserPlus, 
  Mail, 
  User, 
  CheckCircle, 
  ArrowLeft,
  BookOpen,
  Brain,
  Users
} from 'lucide-react';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const [ebook, setEbook] = useState('');
  const [funnel, setFunnel] = useState('');

  // Detectar parámetros de la URL al cargar la página
  useEffect(() => {
    const ebookParam = searchParams.get('ebook');
    const funnelParam = searchParams.get('funnel');
    
    if (ebookParam) setEbook(ebookParam);
    if (funnelParam) setFunnel(funnelParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simular envío exitoso
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mostrar mensaje de éxito
      setIsSuccess(true);
    } catch (err) {
      setError('Hubo un error al procesar tu registro. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F2937] mb-4">
              ¡Registro Exitoso!
            </h1>
            <p className="text-gray-600 mb-6">
              Gracias por registrarte. Ahora tienes acceso completo a nuestra plataforma de eBooks con mentoría integrada.
            </p>
            <div className="space-y-3">
              <Link 
                href="/"
                className="w-full bg-[#2563EB] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1E40AF] transition-colors inline-block"
              >
                Ir a la Plataforma
              </Link>
              <Link 
                href="/registro"
                onClick={() => setIsSuccess(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block"
              >
                Registrar Otro Usuario
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-[#2563EB] hover:text-[#1E40AF] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la Plataforma
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Únete a Nuestra Comunidad
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Regístrate para acceder a todos nuestros eBooks especializados con mentoría integrada y herramientas avanzadas de aprendizaje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Formulario de Registro */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center mr-4">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">Registro de Usuario</h2>
                <p className="text-sm text-gray-500">Acceso completo a la plataforma</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              {(ebook || funnel) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Información de Origen:</h3>
                  {ebook && (
                    <p className="text-sm text-blue-700 mb-1">
                      <span className="font-medium">eBook:</span> {ebook}
                    </p>
                  )}
                  {funnel && (
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Funnel:</span> {funnel}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2563EB] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1E40AF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Registrarme
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Al registrarte, aceptas nuestros{' '}
                <Link href="#" className="text-[#2563EB] hover:underline">
                  términos y condiciones
                </Link>
              </p>
            </div>
          </div>

          {/* Beneficios */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-[#1F2937] mb-6">¿Qué obtienes al registrarte?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Acceso Completo</h4>
                    <p className="text-sm text-gray-600">A todos nuestros eBooks especializados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Mentoría IA</h4>
                    <p className="text-sm text-gray-600">Agentes inteligentes para responder tus dudas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Sistema de Notas</h4>
                    <p className="text-sm text-gray-600">Organiza y guarda tus aprendizajes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Comunidad</h4>
                    <p className="text-sm text-gray-600">Conecta con otros profesionales</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">¿Ya tienes una cuenta?</h3>
              <p className="text-white/80 mb-6">
                Si ya te has registrado anteriormente, puedes acceder directamente a la plataforma.
              </p>
              <Link 
                href="/"
                className="bg-white text-[#2563EB] py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Ir a la Plataforma
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 