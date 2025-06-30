"use client";

import { 
  Users, Target, Zap, FileText, BarChart3, 
  Headphones, User, Apple, Calendar, Globe,
  DollarSign, Heart, Star, ArrowRight
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon' | 'premium';
  category: string;
}

export default function AgentesPage() {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Agente de Marketing',
      description: 'Optimiza campañas publicitarias, analiza métricas de rendimiento y sugiere estrategias para maximizar el ROI de tus inversiones en marketing digital.',
      icon: <Target className="w-8 h-8" />,
      status: 'available',
      category: 'Negocios'
    },
    {
      id: '2',
      name: 'Agente de Seguimiento de Leads',
      description: 'Automatiza el seguimiento de prospectos, envía recordatorios personalizados y optimiza la conversión de leads a clientes.',
      icon: <Users className="w-8 h-8" />,
      status: 'available',
      category: 'Ventas'
    },
    {
      id: '3',
      name: 'Agente de Automatizaciones',
      description: 'Crea flujos de trabajo automatizados, conecta diferentes herramientas y optimiza procesos empresariales repetitivos.',
      icon: <Zap className="w-8 h-8" />,
      status: 'available',
      category: 'Productividad'
    },
    {
      id: '4',
      name: 'Agente de Contenido',
      description: 'Genera ideas de contenido, escribe artículos optimizados para SEO y mantiene un calendario editorial coherente.',
      icon: <FileText className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Marketing'
    },
    {
      id: '5',
      name: 'Agente de Reportes',
      description: 'Analiza datos empresariales, genera reportes automáticos y proporciona insights accionables para la toma de decisiones.',
      icon: <BarChart3 className="w-8 h-8" />,
      status: 'available',
      category: 'Análisis'
    },
    {
      id: '6',
      name: 'Agente de Soporte',
      description: 'Responde consultas de clientes 24/7, resuelve problemas comunes y escala casos complejos al equipo humano.',
      icon: <Headphones className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Servicio al Cliente'
    },
    {
      id: '7',
      name: 'Coach Personal',
      description: 'Te ayuda a establecer y alcanzar metas personales, proporciona motivación diaria y seguimiento de progreso.',
      icon: <User className="w-8 h-8" />,
      status: 'premium',
      category: 'Desarrollo Personal'
    },
    {
      id: '8',
      name: 'Nutricionista AI',
      description: 'Crea planes de alimentación personalizados, sugiere recetas saludables y hace seguimiento de tus objetivos nutricionales.',
      icon: <Apple className="w-8 h-8" />,
      status: 'coming-soon',
      category: 'Salud'
    },
    {
      id: '9',
      name: 'Asistente de Agenda',
      description: 'Gestiona tu calendario, programa reuniones automáticamente y optimiza tu tiempo para máxima productividad.',
      icon: <Calendar className="w-8 h-8" />,
      status: 'available',
      category: 'Productividad'
    },
    {
      id: '10',
      name: 'Mentor de Idiomas',
      description: 'Te ayuda a aprender idiomas con ejercicios personalizados, conversaciones simuladas y seguimiento de progreso.',
      icon: <Globe className="w-8 h-8" />,
      status: 'premium',
      category: 'Educación'
    },
    {
      id: '11',
      name: 'Agente de Finanzas',
      description: 'Analiza gastos, sugiere inversiones, crea presupuestos y te ayuda a alcanzar tus objetivos financieros.',
      icon: <DollarSign className="w-8 h-8" />,
      status: 'available',
      category: 'Finanzas'
    },
    {
      id: '12',
      name: 'Terapeuta Conversacional',
      description: 'Proporciona apoyo emocional, técnicas de mindfulness y herramientas para manejar el estrés y la ansiedad.',
      icon: <Heart className="w-8 h-8" />,
      status: 'premium',
      category: 'Bienestar'
    }
  ];

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'coming-soon': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'coming-soon': return 'Próximamente';
      case 'premium': return 'Premium';
      default: return 'Indefinido';
    }
  };

  const getButtonText = (status: Agent['status']) => {
    switch (status) {
      case 'available': return 'Activar';
      case 'coming-soon': return 'Notificar';
      case 'premium': return 'Actualizar';
      default: return 'Ver más';
    }
  };

  const getButtonStyle = (status: Agent['status']) => {
    switch (status) {
      case 'available': return 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white';
      case 'coming-soon': return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'premium': return 'bg-purple-100 hover:bg-purple-200 text-purple-800';
      default: return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Mi Panel de Agentes</h1>
            <p className="text-white/80 mt-2">Descubre y activa agentes de IA que transformarán tu productividad</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Disponibles: {agents.filter(a => a.status === 'available').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">Próximamente: {agents.filter(a => a.status === 'coming-soon').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-sm font-medium">Premium: {agents.filter(a => a.status === 'premium').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium">
            Todos
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            Negocios
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            Productividad
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            Desarrollo Personal
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            Salud & Bienestar
          </button>
        </div>
      </div>

      {/* Grid de Agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            {/* Header de la tarjeta */}
            <div className="p-6 border-b border-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-[#2563EB]/10 p-3 rounded-lg">
                  {agent.icon}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
                {agent.name}
              </h3>
              
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md mb-3">
                {agent.category}
              </span>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {agent.description}
              </p>
            </div>

            {/* Footer de la tarjeta */}
            <div className="p-6 bg-gray-50">
              <button 
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${getButtonStyle(agent.status)}`}
              >
                {getButtonText(agent.status)}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de información adicional */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-8">
        <div className="text-center">
          <div className="bg-[#2563EB]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-[#2563EB]" />
          </div>
          <h3 className="text-xl font-semibold text-[#1F2937] mb-2">
            ¿Cómo funcionan los agentes?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada agente es una IA especializada que aprende de tus necesidades específicas. 
            Una vez activado, trabajará en segundo plano para optimizar tus procesos y mejorar tu productividad. 
            Los agentes premium ofrecen funcionalidades avanzadas y personalización profunda.
          </p>
        </div>
      </div>
    </div>
  );
} 