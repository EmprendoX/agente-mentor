"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import NotesSystem from '../../components/NotesSystem';
import PDFViewer from '../../components/PDFViewer';

// Declaración de tipos para el elemento personalizado
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}

// Datos de los eBooks
const EBOOKS = {
  'educacion-con-sentido': {
    id: 'educacion-con-sentido',
    title: 'Educación con Sentido',
    description: 'Transforma tu práctica educativa con estrategias innovadoras y significativas',
    pdf_path: '/ebooks/educacion-con-sentido/educacion-con-sentido.pdf',
    cover_path: '/ebooks/educacion-con-sentido/portada.png',
    report_fields: ['industry', 'location', 'specialty', 'product_type']
  },
  'como-hacer-que-extranos-compren-tu-propiedad': {
    id: 'como-hacer-que-extranos-compren-tu-propiedad',
    title: 'Cómo Hacer que Extraños Compren tu Propiedad',
    description: 'Estrategias probadas para vender propiedades rápidamente',
    pdf_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.pdf',
    cover_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.png',
    report_fields: ['property_type', 'location', 'market_conditions', 'target_buyer']
  },
  'the-product-lab': {
    id: 'the-product-lab',
    title: 'The Product Lab',
    description: 'Guía completa para crear productos digitales exitosos',
    pdf_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.pdf',
    cover_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.png',
    report_fields: ['industry', 'location', 'specialty', 'product_type']
  },
  'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo': {
    id: 'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo',
    title: 'Accede al Mercado de Bienes Raíces Más Rentable del Mundo',
    description: 'Descubre las mejores oportunidades inmobiliarias',
    pdf_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.pdf',
    cover_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.png',
    report_fields: ['property_type', 'location', 'market_conditions', 'target_buyer']
  },
  'guia-preventas-inmobiliarias': {
    id: 'guia-preventas-inmobiliarias',
    title: 'Guía de Preventas Inmobiliarias',
    description: 'Todo lo que necesitas saber sobre preventas exitosas',
    pdf_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.pdf',
    cover_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.png',
    report_fields: ['property_type', 'location', 'market_conditions', 'target_buyer']
  },
  'mas-leads-mas-ventas': {
    id: 'mas-leads-mas-ventas',
    title: 'Más Leads, Más Ventas',
    description: 'Estrategias para generar leads de calidad y aumentar ventas',
    pdf_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.pdf',
    cover_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.png',
    report_fields: ['industry', 'location', 'specialty', 'product_type']
  },
  'More-Leads-eBook': {
    id: 'More-Leads-eBook',
    title: 'More Leads eBook',
    description: 'Advanced lead generation strategies for modern businesses',
    pdf_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.pdf',
    cover_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.png',
    report_fields: ['industry', 'location', 'specialty', 'product_type']
  },
  'how-to-turn-strangers-into-buyers-real-estate': {
    id: 'how-to-turn-strangers-into-buyers-real-estate',
    title: 'How to Turn Strangers into Buyers - Real Estate',
    description: 'Proven strategies to convert prospects into buyers',
    pdf_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.pdf',
    cover_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.png',
    report_fields: ['property_type', 'location', 'market_conditions', 'target_buyer']
  }
};

export default function EbookPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [chatMessages, setChatMessages] = useState<Array<{type: string, text: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [ebookNotFound, setEbookNotFound] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Obtener datos del eBook
  const currentEbook = EBOOKS[slug as keyof typeof EBOOKS];

  useEffect(() => {
    if (!currentEbook) {
      setEbookNotFound(true);
      return;
    }

    // Scroll al chat cuando hay nuevos mensajes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, currentEbook]);

  function sendMessage() {
    if (!inputValue.trim() || isChatLoading) return;

    const userMessage = inputValue.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setIsChatLoading(true);

    // Simular respuesta del agente
    setTimeout(() => {
      let response = '';
      
      if (currentEbook.id === 'educacion-con-sentido') {
        response = generateEducacionResponse(userMessage);
      } else {
        response = `Gracias por tu mensaje sobre "${currentEbook.title}". Soy tu agente IA especializado y estoy aquí para ayudarte con cualquier duda sobre este eBook. ¿En qué puedo asistirte específicamente?`;
      }

      setChatMessages(prev => [...prev, { type: 'assistant', text: response }]);
      setIsChatLoading(false);
    }, 1500);
  }

  function generateEducacionResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas')) {
      return '¡Hola! Soy tu mentor especializado en Educación con Sentido. Estoy aquí para ayudarte a transformar tu práctica educativa. ¿En qué puedo asistirte hoy?';
    }
    
    if (lowerMessage.includes('estrategia') || lowerMessage.includes('método') || lowerMessage.includes('técnica')) {
      return 'En Educación con Sentido encontrarás estrategias innovadoras como el aprendizaje basado en proyectos, la gamificación educativa, y el uso de tecnología para crear experiencias significativas. ¿Te gustaría que profundicemos en alguna estrategia específica?';
    }
    
    if (lowerMessage.includes('tecnología') || lowerMessage.includes('digital') || lowerMessage.includes('online')) {
      return 'La tecnología es una herramienta poderosa para la educación. En el eBook aprenderás a integrar herramientas digitales de manera efectiva, crear contenido interactivo, y usar plataformas educativas para enriquecer el aprendizaje.';
    }
    
    if (lowerMessage.includes('motivación') || lowerMessage.includes('interés') || lowerMessage.includes('participación')) {
      return 'La motivación es clave en la educación. Las estrategias del eBook te enseñarán a crear un ambiente de aprendizaje atractivo, usar técnicas de gamificación, y conectar el contenido con los intereses reales de tus estudiantes.';
    }
    
    if (lowerMessage.includes('evaluación') || lowerMessage.includes('medir') || lowerMessage.includes('progreso')) {
      return 'La evaluación en Educación con Sentido va más allá de las calificaciones tradicionales. Aprenderás a usar evaluaciones formativas, portafolios digitales, y herramientas de seguimiento del progreso que realmente reflejen el aprendizaje significativo.';
    }
    
    return 'Excelente pregunta sobre Educación con Sentido. Este eBook te proporcionará herramientas prácticas para crear experiencias educativas más significativas y efectivas. ¿Hay algún aspecto específico de la educación que te gustaría explorar más a fondo?';
  }

  if (ebookNotFound) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-4">eBook no encontrado</h1>
          <p className="text-gray-600 mb-6">El eBook que buscas no está disponible.</p>
          <a 
            href="/ebooks" 
            className="bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-[#1E40AF] transition-colors"
          >
            Ver todos los eBooks
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-4 sm:px-6 py-6 sm:py-10 max-w-7xl mx-auto space-y-6 sm:space-y-10">
      {/* Header del eBook */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-24 h-36 sm:w-32 sm:h-48 overflow-hidden rounded-md shadow bg-white flex-shrink-0">
            <img 
              src={currentEbook.cover_path} 
              alt={`Portada: ${currentEbook.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">{currentEbook.title}</h1>
            <p className="text-xs sm:text-sm mt-2 text-white/80 leading-relaxed">
              {currentEbook.description}
            </p>
            <div className="mt-3 sm:mt-4">
              <span className="text-xs text-white/70">
                PDF disponible • Cargado automáticamente
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visor de PDF */}
      <PDFViewer 
        pdfPath={currentEbook.pdf_path} 
        title={currentEbook.title}
        isMobile={false}
      />

      {/* Sistema de Notas y Chat */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <NotesSystem />
        
        {/* Chat Mentor */}
        <div className="bg-white border border-gray-100 rounded-xl shadow p-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1F2937]">Tu Mentor del eBook</h2>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              🤖 Agente IA Conectado
            </span>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 border rounded bg-white p-3 overflow-y-auto max-h-80 space-y-2"
          >
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                  msg.type === 'user'
                    ? 'ml-auto bg-blue-600 text-white'
                    : 'mr-auto bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isChatLoading && (
              <div className="mr-auto bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm animate-pulse">
                🤔 Procesando tu mensaje...
              </div>
            )}
          </div>
          
          <div className="flex gap-2 text-sm">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isChatLoading && sendMessage()}
              placeholder={isChatLoading ? "Esperando respuesta..." : "Escribe tu mensaje..."}
              disabled={isChatLoading}
              className={`flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isChatLoading ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <button
              onClick={sendMessage}
              disabled={isChatLoading || !inputValue.trim()}
              className={`px-4 py-2 rounded font-medium ${
                isChatLoading || !inputValue.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
              }`}
            >
              {isChatLoading ? '⏳' : 'Enviar'}
            </button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Conectado al agente IA especializado en {currentEbook.title}
          </div>
        </div>
      </div>

      {/* Generador de Reportes Personalizados */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Generar Reporte Personalizado</h2>
          <p className="text-sm text-gray-600 mb-6">Completa los datos para obtener un análisis adaptado a tu situación específica</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industria o área
              </label>
              <input
                type="text"
                placeholder="Ej: Bienes raíces, Educación, Ecommerce, Salud"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                placeholder="Ej: Ciudad, barrio, zona específica"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zona o ubicación <span className="text-gray-500">(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Bosques de las Lomas, Monterrey, Cancún"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de producto o servicio
              </label>
              <input
                type="text"
                placeholder="Ej: Departamentos en preventa, asesorías legales, cursos en línea"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Generar Reporte Personalizado
            </button>
          </form>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Tu Reporte Personalizado</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-64">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm">Completa el formulario para generar tu reporte personalizado</p>
              <p className="text-xs mt-2">El reporte incluirá análisis de mercado, tendencias y recomendaciones específicas para tu situación</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 