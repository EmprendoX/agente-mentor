"use client";

import { 
  Mail, Users, Calendar, BarChart3, MessageSquare, 
  Share2, Clock, BookOpen, DollarSign, FileText,
  Zap, Settings, Play, ArrowRight, Building2, User
} from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'business' | 'personal';
  status: 'available' | 'coming-soon' | 'premium';
  estimatedTime: string;
  frequency: string;
}

export default function AutomatizacionesPage() {
  const automations: Automation[] = [
    // Automatizaciones Empresariales
    {
      id: '1',
      name: 'Envío automático de correos a nuevos leads',
      description: 'Envía emails personalizados automáticamente cuando alguien se registra en tu sitio web o descarga contenido.',
      icon: <Mail className="w-8 h-8" />,
      category: 'business',
      status: 'available',
      estimatedTime: '5 min',
      frequency: 'Automático'
    },
    {
      id: '2',
      name: 'Recordatorio a clientes inactivos',
      description: 'Identifica clientes que no han interactuado recientemente y envía recordatorios personalizados.',
      icon: <Users className="w-8 h-8" />,
      category: 'business',
      status: 'available',
      estimatedTime: '3 min',
      frequency: 'Semanal'
    },
    {
      id: '3',
      name: 'Seguimiento post-reunión con resumen y tareas',
      description: 'Genera automáticamente resúmenes de reuniones y lista de tareas pendientes para todos los participantes.',
      icon: <Calendar className="w-8 h-8" />,
      category: 'business',
      status: 'coming-soon',
      estimatedTime: '2 min',
      frequency: 'Por reunión'
    },
    {
      id: '4',
      name: 'Generación automática de reportes semanales',
      description: 'Crea y envía reportes de rendimiento semanales con métricas clave y análisis de tendencias.',
      icon: <BarChart3 className="w-8 h-8" />,
      category: 'business',
      status: 'available',
      estimatedTime: '10 min',
      frequency: 'Semanal'
    },
    {
      id: '5',
      name: 'Respuesta automática a formularios web',
      description: 'Responde inmediatamente a consultas recibidas por formularios web con información relevante.',
      icon: <MessageSquare className="w-8 h-8" />,
      category: 'business',
      status: 'coming-soon',
      estimatedTime: '5 min',
      frequency: 'Automático'
    },
    {
      id: '6',
      name: 'Carga de contenido nuevo en redes sociales',
      description: 'Programa y publica automáticamente contenido en múltiples redes sociales con horarios optimizados.',
      icon: <Share2 className="w-8 h-8" />,
      category: 'business',
      status: 'premium',
      estimatedTime: '15 min',
      frequency: 'Diario'
    },
    // Automatizaciones Personales
    {
      id: '7',
      name: 'Agenda diaria por WhatsApp o correo',
      description: 'Recibe tu agenda del día con tareas prioritarias y recordatorios importantes por WhatsApp o email.',
      icon: <Clock className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '2 min',
      frequency: 'Diario'
    },
    {
      id: '8',
      name: 'Automatización de hábitos (leer, meditar, escribir)',
      description: 'Recibe recordatorios personalizados para mantener tus hábitos diarios y hacer seguimiento de tu progreso.',
      icon: <BookOpen className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '3 min',
      frequency: 'Diario'
    },
    {
      id: '9',
      name: 'Envío de resumen de libro o curso semanal',
      description: 'Recibe resúmenes semanales de los libros que estás leyendo o cursos que estás tomando.',
      icon: <FileText className="w-8 h-8" />,
      category: 'personal',
      status: 'coming-soon',
      estimatedTime: '8 min',
      frequency: 'Semanal'
    },
    {
      id: '10',
      name: 'Registro automático de ingresos/gastos',
      description: 'Categoriza y registra automáticamente tus transacciones financieras desde tus cuentas bancarias.',
      icon: <DollarSign className="w-8 h-8" />,
      category: 'personal',
      status: 'premium',
      estimatedTime: '5 min',
      frequency: 'Automático'
    },
    {
      id: '11',
      name: 'Publicación automática de contenido programado',
      description: 'Programa y publica automáticamente contenido en tu blog, redes sociales y newsletter.',
      icon: <Share2 className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '10 min',
      frequency: 'Según programación'
    },
    {
      id: '12',
      name: 'Backups semanales de archivos importantes',
      description: 'Realiza copias de seguridad automáticas de tus documentos y archivos importantes en la nube.',
      icon: <FileText className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '5 min',
      frequency: 'Semanal'
    }
  ];

  const getStatusColor = (status: Automation['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'coming-soon': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Automation['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'coming-soon': return 'Próximamente';
      case 'premium': return 'Premium';
      default: return 'Indefinido';
    }
  };

  const getButtonText = (status: Automation['status']) => {
    switch (status) {
      case 'available': return 'Activar';
      case 'coming-soon': return 'Notificar';
      case 'premium': return 'Actualizar';
      default: return 'Ver más';
    }
  };

  const getButtonStyle = (status: Automation['status']) => {
    switch (status) {
      case 'available': return 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white';
      case 'coming-soon': return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'premium': return 'bg-purple-100 hover:bg-purple-200 text-purple-800';
      default: return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  const businessAutomations = automations.filter(a => a.category === 'business');
  const personalAutomations = automations.filter(a => a.category === 'personal');

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Zap size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Automatizaciones</h1>
            <p className="text-white/80 mt-2">Delega tareas repetitivas y enfócate en lo que realmente importa</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Disponibles: {automations.filter(a => a.status === 'available').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">Próximamente: {automations.filter(a => a.status === 'coming-soon').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-sm font-medium">Premium: {automations.filter(a => a.status === 'premium').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span className="text-sm font-medium">Total: {automations.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium">
            Todas
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
            <Building2 size={16} />
            Empresariales
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
            <User size={16} />
            Personales
          </button>
        </div>
      </div>

      {/* Sección Empresarial */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#2563EB]/10 p-2 rounded-lg">
            <Building2 className="w-6 h-6 text-[#2563EB]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1F2937]">Automatizaciones Empresariales</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessAutomations.map((automation) => (
            <div key={automation.id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {/* Header de la tarjeta */}
              <div className="p-6 border-b border-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-[#2563EB]/10 p-3 rounded-lg">
                    {automation.icon}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(automation.status)}`}>
                    {getStatusText(automation.status)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-[#1F2937] mb-3">
                  {automation.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {automation.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {automation.estimatedTime}</span>
                  <span>🔄 {automation.frequency}</span>
                </div>
              </div>

              {/* Footer de la tarjeta */}
              <div className="p-6 bg-gray-50">
                <button 
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${getButtonStyle(automation.status)}`}
                >
                  {getButtonText(automation.status)}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Personal */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/10 p-2 rounded-lg">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1F2937]">Automatizaciones Personales</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalAutomations.map((automation) => (
            <div key={automation.id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {/* Header de la tarjeta */}
              <div className="p-6 border-b border-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    {automation.icon}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(automation.status)}`}>
                    {getStatusText(automation.status)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-[#1F2937] mb-3">
                  {automation.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {automation.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {automation.estimatedTime}</span>
                  <span>🔄 {automation.frequency}</span>
                </div>
              </div>

              {/* Footer de la tarjeta */}
              <div className="p-6 bg-gray-50">
                <button 
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${getButtonStyle(automation.status)}`}
                >
                  {getButtonText(automation.status)}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de información adicional */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-8">
        <div className="text-center">
          <div className="bg-[#2563EB]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-[#2563EB]" />
          </div>
          <h3 className="text-xl font-semibold text-[#1F2937] mb-2">
            ¿Cómo funcionan las automatizaciones?
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Las automatizaciones son flujos de trabajo inteligentes que ejecutan tareas repetitivas sin intervención manual. 
            Una vez configuradas, funcionan en segundo plano para ahorrarte tiempo y reducir errores. 
            Puedes personalizar cada automatización según tus necesidades específicas y monitorear su rendimiento en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
} 