"use client";

import { useState } from 'react';
import { 
  Search, Send, FileText, TrendingUp, Target,
  BarChart3, Users, Globe, Lightbulb, Zap,
  ArrowRight, Clock, CheckCircle, AlertCircle,
  Download, Share2, Copy, MoreVertical,
  Search as SearchIcon, Briefcase, ChartBar,
  BookOpen, Eye, Brain, Filter
} from 'lucide-react';

interface SearchBlock {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isGenerating?: boolean;
}

export default function WebSearchGPTPage() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '¡Hola! Soy Web Search GPT, tu agente especializado en búsquedas estratégicas e investigaciones automatizadas. Puedo ayudarte a generar reportes, análisis de competencia, investigaciones de mercado y mucho más. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const searchBlocks: SearchBlock[] = [
    {
      id: '1',
      title: 'Generar Reporte Estratégico',
      description: 'Análisis completo de mercado y oportunidades',
      icon: <FileText size={24} />,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Búsqueda de Productos',
      description: 'Encuentra productos y servicios específicos',
      icon: <Search size={24} />,
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Análisis de Competencia',
      description: 'Estudia competidores y sus estrategias',
      icon: <Target size={24} />,
      color: 'bg-red-500'
    },
    {
      id: '4',
      title: 'Investigación de Mercado',
      description: 'Datos y tendencias del mercado objetivo',
      icon: <BarChart3 size={24} />,
      color: 'bg-purple-500'
    },
    {
      id: '5',
      title: 'Comparativa de Servicios',
      description: 'Compara plataformas y herramientas',
      icon: <Users size={24} />,
      color: 'bg-orange-500'
    },
    {
      id: '6',
      title: 'Búsqueda de Contenido',
      description: 'Encuentra contenido relevante y actualizado',
      icon: <BookOpen size={24} />,
      color: 'bg-indigo-500'
    },
    {
      id: '7',
      title: 'Síntesis de Artículos',
      description: 'Resúmenes de tendencias y noticias',
      icon: <TrendingUp size={24} />,
      color: 'bg-pink-500'
    },
    {
      id: '8',
      title: 'Análisis de Oportunidades',
      description: 'Identifica oportunidades de negocio',
      icon: <Lightbulb size={24} />,
      color: 'bg-yellow-500'
    },
    {
      id: '9',
      title: 'Detección de Patrones',
      description: 'Encuentra insights y patrones clave',
      icon: <Brain size={24} />,
      color: 'bg-teal-500'
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateSimulatedResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleQuickSearch = (block: SearchBlock) => {
    const quickMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `Quiero ${block.title.toLowerCase()}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, quickMessage]);
    setIsGenerating(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateQuickResponse(block.title),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateSimulatedResponse = (input: string): string => {
    const responses = [
      "He analizado tu consulta y he encontrado información relevante. Basándome en las últimas tendencias del mercado, puedo ofrecerte un análisis detallado con datos actualizados y recomendaciones estratégicas.",
      "Perfecto, he realizado una búsqueda exhaustiva sobre tu tema. Los resultados muestran patrones interesantes que podrían ser valiosos para tu estrategia. ¿Te gustaría que profundice en algún aspecto específico?",
      "Excelente pregunta. He recopilado información de múltiples fuentes confiables y he generado un reporte estructurado con insights clave, análisis comparativo y recomendaciones accionables.",
      "He completado la investigación solicitada. Los hallazgos incluyen datos de mercado, análisis de competencia y oportunidades identificadas. ¿Quieres que genere un reporte ejecutivo con estos resultados?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateQuickResponse = (title: string): string => {
    const responses: { [key: string]: string } = {
      'Generar Reporte Estratégico': 'Perfecto, voy a generar un reporte estratégico completo. He recopilado datos de mercado, análisis de tendencias y recomendaciones específicas. El reporte incluirá: análisis de mercado, oportunidades identificadas, riesgos potenciales y plan de acción recomendado.',
      'Búsqueda de Productos': 'He realizado una búsqueda exhaustiva de productos relacionados. Encontré las mejores opciones disponibles con análisis de precios, características y valoraciones de usuarios. ¿Te gustaría que compare alguna opción específica?',
      'Análisis de Competencia': 'Excelente, he analizado a los principales competidores del mercado. El análisis incluye: posicionamiento, fortalezas y debilidades, estrategias de marketing y oportunidades de diferenciación.',
      'Investigación de Mercado': 'He completado la investigación de mercado. Los datos muestran tendencias actuales, tamaño del mercado, segmentación de clientes y proyecciones de crecimiento. ¿Quieres que profundice en algún segmento específico?'
    };
    return responses[title] || 'He procesado tu solicitud y generado un análisis detallado con información relevante y recomendaciones estratégicas.';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] flex flex-col">
      {/* Header */}
      <div className="bg-[#2563EB] text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Search size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Web Search GPT</h1>
                <p className="text-sm text-white/80">Agente de IA especializado en búsquedas estratégicas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <CheckCircle size={16} />
                <span>Conectado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Quick Access Blocks */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#1F2937] mb-2">Accesos Rápidos</h2>
            <p className="text-sm text-gray-600 mb-4">
              Este es un agente de inteligencia artificial especializado en búsquedas estratégicas, no solo un chat. 
              Está diseñado para ayudarte a generar entregables útiles con información externa e inteligencia contextual.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {searchBlocks.map((block) => (
              <button
                key={block.id}
                onClick={() => handleQuickSearch(block)}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className={`${block.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    {block.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1F2937] mb-1">{block.title}</h3>
                    <p className="text-sm text-gray-600">{block.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white border-t border-gray-200">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="bg-blue-500 p-2 rounded-lg text-white">
                    <Search size={20} />
                  </div>
                )}
                
                <div className={`max-w-3xl ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-[#1F2937]'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <Clock size={12} />
                    <span>{formatTime(message.timestamp)}</span>
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-1">
                        <button className="hover:text-blue-500 transition-colors" title="Copiar">
                          <Copy size={12} />
                        </button>
                        <button className="hover:text-blue-500 transition-colors" title="Descargar">
                          <Download size={12} />
                        </button>
                        <button className="hover:text-blue-500 transition-colors" title="Compartir">
                          <Share2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="bg-gray-500 p-2 rounded-lg text-white">
                    <Users size={20} />
                  </div>
                )}
              </div>
            ))}

            {/* Generating indicator */}
            {isGenerating && (
              <div className="flex gap-4 justify-start">
                <div className="bg-blue-500 p-2 rounded-lg text-white">
                  <Search size={20} />
                </div>
                <div className="max-w-3xl">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span className="text-sm text-gray-600">Generando respuesta...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu búsqueda o instrucción..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                    disabled={isGenerating}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isGenerating}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Web Search GPT puede generar reportes, análisis y entregables útiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Presiona Enter para enviar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 