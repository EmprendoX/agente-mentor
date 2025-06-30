"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import NotesSystem from '../../components/NotesSystem';

// Declarar el elemento personalizado para TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}

// Configuración de eBooks disponibles
const EBOOKS = {
  'educacion-con-sentido': {
    id: 'educacion-con-sentido',
    title: 'Educación con Sentido',
    subtitle: 'Transforma tu práctica educativa con estrategias innovadoras y significativas',
    pdf_path: '/ebooks/educacion-con-sentido/educacion-con-sentido.pdf',
    cover_path: '/ebooks/educacion-con-sentido/portada.png',
    category: 'Educación',
    mentor_specialization: 'Educación con Sentido',
    report_fields: ['industry', 'niche', 'location', 'product_type']
  },
  'como-hacer-que-extranos-compren-tu-propiedad': {
    id: 'como-hacer-que-extranos-compren-tu-propiedad',
    title: 'Como hacer que extraños compren tu propiedad',
    subtitle: 'Estrategias efectivas para vender tu propiedad a compradores que no conoces',
    pdf_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.pdf',
    cover_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.png',
    category: 'Bienes Raíces',
    mentor_specialization: 'Venta de Propiedades',
    report_fields: ['property_type', 'location', 'target_market', 'selling_strategy']
  },
  'the-product-lab': {
    id: 'the-product-lab',
    title: 'The Product Lab',
    subtitle: 'Laboratorio de productos digitales y estrategias de desarrollo',
    pdf_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.pdf',
    cover_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.png',
    category: 'Producto Digital',
    mentor_specialization: 'Desarrollo de Productos Digitales',
    report_fields: ['product_type', 'target_audience', 'market_analysis', 'development_phase']
  },
  'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo': {
    id: 'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo',
    title: 'Accede al Mercado de Bienes Raíces Más Rentable del Mundo',
    subtitle: 'Descubre las estrategias para entrar al mercado inmobiliario más lucrativo',
    pdf_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.pdf',
    cover_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.png',
    category: 'Bienes Raíces',
    mentor_specialization: 'Mercados Inmobiliarios Rentables',
    report_fields: ['market_type', 'investment_strategy', 'location_analysis', 'risk_assessment']
  },
  'guia-preventas-inmobiliarias': {
    id: 'guia-preventas-inmobiliarias',
    title: 'Guía de Preventas Inmobiliarias',
    subtitle: 'Estrategias completas para el éxito en preventas de propiedades',
    pdf_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.pdf',
    cover_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.png',
    category: 'Bienes Raíces',
    mentor_specialization: 'Preventas Inmobiliarias',
    report_fields: ['project_type', 'target_market', 'sales_strategy', 'timeline']
  },
  'more-leads-ebook': {
    id: 'more-leads-ebook',
    title: 'More Leads eBook',
    subtitle: 'Genera más leads y aumenta tus ventas con estrategias probadas',
    pdf_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.pdf',
    cover_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.png',
    category: 'Marketing',
    mentor_specialization: 'Generación de Leads',
    report_fields: ['lead_source', 'target_audience', 'conversion_strategy', 'follow_up_process']
  },
  'mas-leads-mas-ventas': {
    id: 'mas-leads-mas-ventas',
    title: 'Más Leads, Más Ventas',
    subtitle: 'Estrategias efectivas para multiplicar tus leads y cerrar más ventas',
    pdf_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.pdf',
    cover_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.png',
    category: 'Marketing',
    mentor_specialization: 'Optimización de Ventas',
    report_fields: ['sales_funnel', 'lead_quality', 'conversion_rate', 'sales_process']
  },
  'how-to-turn-strangers-into-buyers-real-estate': {
    id: 'how-to-turn-strangers-into-buyers-real-estate',
    title: 'How to Turn Strangers into Buyers - Real Estate',
    subtitle: 'Convierte desconocidos en compradores en el mercado inmobiliario',
    pdf_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.pdf',
    cover_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.png',
    category: 'Bienes Raíces',
    mentor_specialization: 'Conversión de Prospectos Inmobiliarios',
    report_fields: ['prospect_type', 'trust_building', 'sales_technique', 'closing_strategy']
  }
};

export default function EbookPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Verificar si el eBook existe
  const currentEbook = EBOOKS[slug as keyof typeof EBOOKS];
  
  const pdfViewerRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const [pdfUrl, setPdfUrl] = useState(currentEbook?.pdf_path || '');
  const [pdfHeight, setPdfHeight] = useState(600);
  const [chatMessages, setChatMessages] = useState<Array<{type: string, text: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [pdfLoaded, setPdfLoaded] = useState(!!currentEbook?.pdf_path);
  const [ebookNotFound, setEbookNotFound] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);

  // Detectar si es dispositivo móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    console.log('🔍 Debug: useEffect ejecutándose, slug:', slug);
    console.log('🔍 Debug: currentEbook:', currentEbook);
    
    if (!currentEbook) {
      console.log('❌ Debug: eBook no encontrado');
      setEbookNotFound(true);
      return;
    }

    console.log('✅ Debug: eBook encontrado:', currentEbook.title);
    console.log('🔍 Debug: PDF path:', currentEbook.pdf_path);

    // Inicializar mensajes del chat
    setChatMessages([
      { type: 'mentor', text: `¡Hola! Soy tu mentor para "${currentEbook.title}". ¿En qué puedo ayudarte a aplicar los conceptos de este eBook?` }
    ]);

    // Cargar PDF automáticamente sin verificación
    const loadPdf = () => {
      console.log('🚀 Debug: Iniciando carga de PDF');
      console.log('🔍 Debug: PDF path:', currentEbook.pdf_path);
      
      // Cargar directamente sin verificación
      setPdfLoaded(true);
      setPdfUrl(currentEbook.pdf_path);
      console.log(`✅ PDF "${currentEbook.title}" cargado automáticamente`);
      setUploadStatus('✅ PDF cargado automáticamente desde el servidor');
      setTimeout(() => setUploadStatus(''), 3000);
    };
    
    // Ejecutar inmediatamente
    loadPdf();
  }, [slug, currentEbook]);

  // Segundo useEffect para asegurar que el PDF se cargue después de la hidratación
  useEffect(() => {
    if (currentEbook && !pdfLoaded) {
      console.log('🔄 Debug: Segundo useEffect - cargando PDF después de hidratación');
      setPdfLoaded(true);
      setPdfUrl(currentEbook.pdf_path);
    }
  }, [currentEbook, pdfLoaded]);

  // Cargar el script de ElevenLabs Convai solo para Educación con Sentido
  useEffect(() => {
    // Limpiar widget y script existentes al cambiar de página
    const existingWidget = document.getElementById('elevenlabs-convai-widget');
    const existingScript = document.getElementById('elevenlabs-convai-script');
    
    if (existingWidget) {
      existingWidget.remove();
    }
    if (existingScript) {
      existingScript.remove();
    }

    // Solo cargar para Educación con Sentido
    if (slug === 'educacion-con-sentido') {
      // Cargar el script
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      script.id = 'elevenlabs-convai-script';
      document.body.appendChild(script);
      
      // Insertar el widget después de un pequeño delay para asegurar que el script se cargue
      setTimeout(() => {
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'agent_01jxbqa6ktejktj9ygn3ma1v35');
        widget.id = 'elevenlabs-convai-widget';
        document.body.appendChild(widget);
      }, 1000);
    }

    // Función de limpieza
    return () => {
      const widget = document.getElementById('elevenlabs-convai-widget');
      const script = document.getElementById('elevenlabs-convai-script');
      
      if (widget) {
        widget.remove();
      }
      if (script) {
        script.remove();
      }
    };
  }, [slug]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (isResizingRef.current && pdfViewerRef.current) {
        const top = (pdfViewerRef.current as any).getBoundingClientRect().top;
        const newHeight = Math.max(200, Math.min(1000, e.clientY - top));
        setPdfHeight(newHeight);
      }
    }
    function stopResizing() {
      isResizingRef.current = false;
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  function handleFileChange(e: any) {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name, file.size, file.type);
      setIsPdfLoading(true);
      setUploadStatus('Verificando archivo...');
      
      // Verificar que sea un PDF
      if (file.type !== 'application/pdf') {
        alert('Por favor selecciona un archivo PDF válido.');
        setIsPdfLoading(false);
        setUploadStatus('');
        return;
      }
      
      // Verificar tamaño (máximo 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 50MB.');
        setIsPdfLoading(false);
        setUploadStatus('');
        return;
      }
      
      setUploadStatus('Cargando PDF...');
      
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
        setIsPdfLoading(false);
        setUploadStatus('¡PDF cargado exitosamente!');
        console.log('PDF cargado correctamente:', url);
        
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => setUploadStatus(''), 3000);
      }, 1000);
    }
  }

  function startResizing() {
    isResizingRef.current = true;
  }

  function downloadPdf() {
    if (!pdfUrl) {
      alert('El PDF aún no está disponible. Por favor, sube el archivo manualmente.');
      return;
    }
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${currentEbook.title.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function sendMessage() {
    const message = inputValue.trim();
    if (!message) return;
    
    // Solo conectar al webhook de n8n para "Educación con Sentido"
    const isEducacionConSentido = currentEbook.id === 'educacion-con-sentido';
    
    // Agregar mensaje del usuario
    setChatMessages(prev => [...prev, { type: 'user', text: message }]);
    setInputValue('');
    
    if (isEducacionConSentido) {
      // Mostrar indicador de carga
      setIsChatLoading(true);
      setChatMessages(prev => [...prev, { type: 'mentor', text: '🤔 Pensando...' }]);
      
      // Webhook de n8n para Educación con Sentido
      const webhookUrl = 'https://emprendox.app.n8n.cloud/webhook/2c0e057e-7e80-4b35-a309-803a014c33e6';
      
      // Datos a enviar al webhook
      const webhookData = {
        mensaje: message,
        origen: 'usuario',
        ebook: currentEbook.title,
        especializacion: currentEbook.mentor_specialization,
        timestamp: new Date().toISOString()
      };
      
      console.log('🌐 Enviando datos al webhook:', webhookData);
      console.log('🔗 URL del webhook:', webhookUrl);
      
      // Enviar mensaje al webhook de n8n con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout
      
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Agente-Mentor-App/1.0'
        },
        body: JSON.stringify(webhookData),
        signal: controller.signal
      })
      .then(response => {
        clearTimeout(timeoutId);
        console.log('📡 Respuesta del webhook:', response.status, response.statusText);
        console.log('📋 Headers de respuesta:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.text();
      })
      .then(data => {
        console.log('📥 Datos recibidos del webhook (raw):', data);
        console.log('📏 Longitud de datos:', data.length);
        
        // Remover mensaje de carga
        setChatMessages(prev => prev.filter(msg => msg.text !== '🤔 Pensando...'));
        
        let responseText = '';
        
        if (data && data.trim()) {
          try {
            // Intentar parsear como JSON
            const jsonData = JSON.parse(data);
            console.log('✅ Datos JSON parseados:', jsonData);
            responseText = jsonData.respuesta || jsonData.message || jsonData.text || jsonData.response || 'Gracias por tu mensaje. Te ayudo con eso.';
          } catch (e) {
            console.log('⚠️ No es JSON, usando texto directo');
            // Si no es JSON, usar el texto directamente
            responseText = data.trim() || 'Gracias por tu mensaje. Te ayudo con eso.';
          }
        } else {
          console.log('⚠️ Respuesta vacía del webhook - usando sistema de respaldo');
          // Si el webhook responde vacío, usar el sistema de respuestas inteligentes
          responseText = generateEducacionResponse(message);
        }
        
        console.log('💬 Respuesta final:', responseText);
        
        // Agregar respuesta del agente
        setChatMessages(prev => [...prev, { type: 'mentor', text: responseText }]);
        setIsChatLoading(false);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        console.error('❌ Error al conectar con el webhook:', error);
        console.error('🔍 Tipo de error:', error.name);
        console.error('📝 Mensaje de error:', error.message);
        
        // Remover mensaje de carga
        setChatMessages(prev => prev.filter(msg => msg.text !== '🤔 Pensando...'));
        
        // Si hay error, usar el sistema de respuestas inteligentes como respaldo
        const fallbackResponse = generateEducacionResponse(message);
        setChatMessages(prev => [...prev, { type: 'mentor', text: fallbackResponse }]);
        setIsChatLoading(false);
      });
    } else {
      // Para otros eBooks, mostrar respuesta simulada
      setTimeout(() => {
        setChatMessages(prev => [...prev, { type: 'mentor', text: 'Gracias por tu mensaje. Te ayudaré con eso.' }]);
      }, 1000);
    }
  }

  // Función para generar respuestas inteligentes sobre educación
  function generateEducacionResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Respuestas específicas basadas en palabras clave
    if (lowerMessage.includes('estudiante') || lowerMessage.includes('alumno')) {
      return "Los estudiantes son el centro del proceso educativo. En 'Educación con Sentido', enfatizamos la importancia de conocer sus intereses, necesidades y contexto para crear experiencias de aprendizaje significativas. ¿Qué nivel educativo trabajas?";
    }
    
    if (lowerMessage.includes('aprendizaje') || lowerMessage.includes('enseñar')) {
      return "El aprendizaje significativo ocurre cuando conectamos el contenido con la vida real de los estudiantes. Te recomiendo empezar identificando qué les interesa y cómo puedes relacionar tu materia con sus experiencias cotidianas.";
    }
    
    if (lowerMessage.includes('metodología') || lowerMessage.includes('estrategia')) {
      return "Las metodologías activas son fundamentales en la educación con sentido. Considera usar proyectos, aprendizaje basado en problemas, o aprendizaje cooperativo. ¿Qué materia enseñas? Puedo darte estrategias específicas.";
    }
    
    if (lowerMessage.includes('evaluación') || lowerMessage.includes('calificar')) {
      return "La evaluación debe ser formativa y orientada al crecimiento. En lugar de solo calificar, busca retroalimentar constructivamente y ayudar a los estudiantes a identificar sus fortalezas y áreas de mejora.";
    }
    
    if (lowerMessage.includes('motivación') || lowerMessage.includes('interés')) {
      return "La motivación intrínseca surge cuando los estudiantes ven el sentido y la relevancia de lo que aprenden. Intenta conectar tu contenido con sus aspiraciones, problemas reales o curiosidades naturales.";
    }
    
    if (lowerMessage.includes('tecnología') || lowerMessage.includes('digital')) {
      return "La tecnología puede ser una herramienta poderosa para la educación significativa, pero debe usarse con propósito. No uses tecnología por usarla; asegúrate de que realmente mejore el aprendizaje.";
    }
    
    if (lowerMessage.includes('familia') || lowerMessage.includes('padres')) {
      return "La colaboración con las familias es esencial. Mantén comunicación abierta, comparte el propósito de las actividades y busca formas de involucrar a los padres en el proceso educativo de manera significativa.";
    }
    
    if (lowerMessage.includes('dificultad') || lowerMessage.includes('problema')) {
      return "Los desafíos son oportunidades de crecimiento. Cuando encuentres dificultades, recuerda que cada estudiante aprende de manera diferente. Adapta tus estrategias y busca apoyo en la comunidad educativa.";
    }
    
    if (lowerMessage.includes('planificación') || lowerMessage.includes('planificar')) {
      return "La planificación es clave para la educación con sentido. Comienza identificando los objetivos de aprendizaje, luego diseña actividades que conecten con los intereses de tus estudiantes y evalúa continuamente el proceso.";
    }
    
    if (lowerMessage.includes('creatividad') || lowerMessage.includes('innovación')) {
      return "La creatividad en la educación no significa solo hacer actividades divertidas, sino encontrar formas únicas de conectar el contenido con la realidad de tus estudiantes. ¿Qué te gustaría innovar en tu práctica?";
    }
    
    if (lowerMessage.includes('clase') || lowerMessage.includes('aula')) {
      return "El aula debe ser un espacio donde los estudiantes se sientan seguros para explorar, preguntar y cometer errores. Crea un ambiente de confianza donde el aprendizaje sea una aventura compartida.";
    }
    
    if (lowerMessage.includes('contenido') || lowerMessage.includes('materia')) {
      return "El contenido es importante, pero más importante es cómo lo presentas. Busca formas de hacer que tu materia sea relevante para la vida de tus estudiantes. ¿Cómo puedes conectar tu contenido con sus experiencias?";
    }
    
    if (lowerMessage.includes('tiempo') || lowerMessage.includes('horario')) {
      return "El tiempo en educación es valioso. Asegúrate de que cada minuto en el aula tenga un propósito claro y contribuya al aprendizaje significativo. La calidad del tiempo es más importante que la cantidad.";
    }
    
    if (lowerMessage.includes('comunidad') || lowerMessage.includes('escuela')) {
      return "La educación con sentido se extiende más allá del aula. Involucra a la comunidad escolar, otros docentes y recursos locales para enriquecer las experiencias de aprendizaje de tus estudiantes.";
    }
    
    // Respuestas generales para otros temas
    const generalResponses = [
      "Excelente pregunta sobre educación. El eBook 'Educación con Sentido' aborda precisamente cómo hacer que el aprendizaje sea relevante y significativo para cada estudiante.",
      "En educación con sentido, es fundamental entender que cada estudiante es único. ¿Podrías contarme más sobre tu contexto educativo específico?",
      "La educación significativa requiere un enfoque personalizado. Te recomiendo empezar con pequeños cambios y observar cómo responden tus estudiantes.",
      "Según los principios de este eBook, la clave está en conectar el aprendizaje con la vida real. ¿Cómo podrías aplicar esto en tu situación?",
      "La educación con sentido se trata de crear experiencias que tengan significado para los estudiantes. ¿Qué te gustaría mejorar en tu práctica docente?",
      "Excelente reflexión. El eBook enfatiza la importancia de conocer a tus estudiantes y adaptar tu enseñanza a sus necesidades e intereses.",
      "En educación significativa, el objetivo no es solo transmitir información, sino facilitar experiencias de aprendizaje transformadoras.",
      "Recuerda que la educación con sentido es un proceso continuo de mejora. Cada día es una oportunidad para hacer el aprendizaje más relevante.",
      "La educación con sentido se basa en la empatía y el entendimiento. ¿Qué te gustaría saber específicamente sobre cómo aplicar estos principios?",
      "El eBook 'Educación con Sentido' te guiará paso a paso para transformar tu práctica educativa. ¿Hay algún aspecto particular que te interese explorar?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  // Auto-scroll al final del chat cuando se agreguen nuevos mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [chatMessages]);

  // Manejar scroll del body cuando PDF está expandido
  useEffect(() => {
    if (isPdfExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPdfExpanded]);

  // Si el eBook no existe, mostrar página de error
  if (ebookNotFound) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">eBook no encontrado</h1>
          <p className="text-gray-600 mb-8">El eBook que buscas no está disponible o no existe.</p>
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-10">
      {/* Header del eBook */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-48 overflow-hidden rounded-md shadow bg-white">
          <img 
            src={`${currentEbook.cover_path}?v=${Date.now()}`}
            alt={`Portada: ${currentEbook.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Error cargando imagen:', e);
              (e.target as HTMLImageElement).src = `${currentEbook.cover_path}?v=${Date.now() + 1}`;
            }}
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{currentEbook.title}</h1>
          <p className="text-sm mt-2 text-white/80">{currentEbook.subtitle}</p>
          <div className="mt-4">
            <span className="text-xs text-white/70">
              {pdfLoaded ? 'PDF disponible • Cargado automáticamente' : 'PDF disponible para descarga'}
            </span>
          </div>
        </div>
      </div>

      {/* Visor de PDF del eBook */}
      <div className="relative w-full bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#1F2937]">📖 {currentEbook.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadPdf}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              📥 Descargar
            </button>
            <span className="text-gray-500 text-sm">|</span>
            <span className="text-gray-500 text-sm">
              {pdfLoaded ? 'PDF cargado automáticamente' : 'Redimensionar ↓'}
            </span>
          </div>
        </div>
        
        {pdfUrl && pdfLoaded ? (
          <div>
            <div className="p-4 bg-green-50 border-b border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-700">
                  <span className="text-lg">✅</span>
                  <span className="text-sm font-medium">PDF cargado correctamente</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPdfExpanded(!isPdfExpanded)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    {isPdfExpanded ? '📱 Compactar' : '📱 Expandir'}
                  </button>
                  <button
                    onClick={() => window.open(pdfUrl, '_blank')}
                    className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                  >
                    🔗 Abrir en Nueva Pestaña
                  </button>
                </div>
              </div>
              {isMobile && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Consejo para móvil:</strong> Si el PDF no se muestra correctamente, usa "Abrir en Nueva Pestaña" para una mejor experiencia de lectura.
                  </p>
                </div>
              )}
            </div>
            <div className={`relative ${isPdfExpanded ? 'fixed inset-0 z-50 bg-white' : ''}`}>
              {isPdfExpanded && (
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setIsPdfExpanded(false)}
                    className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
              <iframe 
                ref={pdfViewerRef} 
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                title={`${currentEbook.title} - PDF Viewer`}
                className={`w-full ${isPdfExpanded ? 'h-screen' : ''}`}
                style={{ 
                  height: isPdfExpanded ? '100vh' : pdfHeight + 'px',
                  border: 'none'
                }}
                allowFullScreen
                onLoad={() => console.log('✅ iframe PDF cargado:', pdfUrl)}
                onError={(e) => console.log('❌ Error cargando iframe PDF:', e, 'URL:', pdfUrl)}
              />
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargar el eBook</h3>
            <p className="text-gray-600 mb-6">
              Para comenzar a leer "{currentEbook.title}", sube el archivo PDF correspondiente
            </p>
            <p className="text-xs text-gray-500 mb-4">Debug: pdfUrl = {pdfUrl || 'vacío'}</p>
            
            {isPdfLoading && (
              <div className="mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-blue-600">{uploadStatus}</p>
              </div>
            )}
            
            {uploadStatus && !isPdfLoading && (
              <div className="mb-4">
                <p className="text-sm text-green-600">{uploadStatus}</p>
              </div>
            )}
            
            <label className={`inline-block font-medium px-6 py-3 rounded-lg shadow cursor-pointer transition-colors duration-200 ${
              isPdfLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
              {isPdfLoading ? '⏳ Cargando...' : '📁 Seleccionar archivo PDF'}
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={handleFileChange} 
                className="hidden" 
                disabled={isPdfLoading}
              />
            </label>
            <p className="text-xs text-gray-500 mt-3">
              Asegúrate de subir el PDF correcto para "{currentEbook.title}"
            </p>
          </div>
        )}
        
        {pdfUrl && !isPdfExpanded && (
          <div onMouseDown={startResizing} className="absolute bottom-0 left-0 w-full h-3 cursor-row-resize bg-gray-200 hover:bg-gray-300 transition-colors" />
        )}
      </div>

      {/* Sistema de Notas + Chat Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sistema de Notas tipo OneNote */}
        <div className="bg-white border border-gray-100 rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-[#1F2937]">Sistema de Notas</h2>
            <p className="text-sm text-gray-600 mt-1">Organiza tus ideas con notebooks, secciones y páginas</p>
          </div>
          <div className="min-h-96">
            <NotesSystem />
          </div>
        </div>

        {/* Chat Mentor */}
        <div className="bg-white border border-gray-100 rounded-xl shadow p-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1F2937]">Tu Mentor del eBook</h2>
            {currentEbook.id === 'educacion-con-sentido' && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                🤖 Agente IA Conectado
              </span>
            )}
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
                    : msg.text === '🤔 Pensando...'
                    ? 'mr-auto bg-yellow-100 text-yellow-800 animate-pulse'
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
              className={`px-3 py-2 rounded ${
                isChatLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              disabled={isChatLoading}
            >
              😊
            </button>
            <button 
              className={`px-3 py-2 rounded ${
                isChatLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              disabled={isChatLoading}
            >
              📎
            </button>
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
          {currentEbook.id === 'educacion-con-sentido' && (
            <div className="text-xs text-gray-500 text-center">
              Conectado al agente IA especializado en Educación con Sentido
            </div>
          )}
          
          {/* Botón de Voice Chat solo para Educación con Sentido */}
          {true && (
            <div className="mt-4">
              <button 
                onClick={() => setShowVoiceChat(!showVoiceChat)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded px-4 py-3 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                MIC {showVoiceChat ? 'Cerrar Voice Chat' : 'Abrir Voice Chat'}
              </button>
              
              {showVoiceChat && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div 
                    dangerouslySetInnerHTML={{
                      __html: '<elevenlabs-convai agent-id="agent_01jxbqa6ktejktj9ygn3ma1v35"></elevenlabs-convai>'
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generador de Reportes Personalizados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de Datos */}
        <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Generar Reporte Personalizado</h2>
          <p className="text-sm text-gray-600 mb-6">Completa los datos para obtener un análisis adaptado a tu situación específica</p>
          
          <form className="space-y-4">
            {currentEbook.report_fields.includes('property_type') ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de propiedad
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
                  <option value="">Selecciona el tipo</option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="comercial">Propiedad comercial</option>
                </select>
              </div>
            ) : (
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
            )}
            
            {currentEbook.report_fields.includes('location') ? (
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
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nicho o especialidad
                </label>
                <input
                  type="text"
                  placeholder="Ej: Propiedades residenciales, Maestros de primaria, Suplementos naturales"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
            )}
            
            {currentEbook.report_fields.includes('market_conditions') ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condiciones del mercado
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
                  <option value="">Selecciona la condición</option>
                  <option value="vendedor">Mercado vendedor</option>
                  <option value="comprador">Mercado comprador</option>
                  <option value="estable">Mercado estable</option>
                </select>
              </div>
            ) : (
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
            )}
            
            {currentEbook.report_fields.includes('target_buyer') ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comprador objetivo
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
                  <option value="">Selecciona el tipo</option>
                  <option value="inversor">Inversor</option>
                  <option value="familiar">Comprador familiar</option>
                  <option value="profesional">Profesional</option>
                </select>
              </div>
            ) : (
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
            )}
            
            <button
              type="submit"
              className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Generar Reporte Personalizado
            </button>
          </form>
        </div>

        {/* Área de Resultados del Reporte */}
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