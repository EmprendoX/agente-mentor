"use client";

import { useState } from 'react';
import { 
  Mail, Users, Calendar, BarChart3, MessageSquare, 
  Share2, Clock, BookOpen, DollarSign, FileText,
  Zap, Settings, Play, ArrowRight, Building2, User,
  Bot, Sparkles, Activity, Shield, Cpu, Database,
  CheckCircle, XCircle, AlertCircle, Crown, Star,
  Filter, Search, TrendingUp, Workflow, Lightbulb
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
  aiPowered: boolean;
  complexity: 'simple' | 'medium' | 'advanced';
  popularity: number;
  tags: string[];
}

export default function AutomatizacionesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business' | 'personal'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'coming-soon' | 'premium'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const automations: Automation[] = [
    // Automatizaciones Empresariales
    {
      id: '1',
      name: 'Envío automático de correos a nuevos leads',
      description: 'Sistema inteligente que envía emails personalizados con IA automáticamente cuando alguien se registra en tu sitio web o descarga contenido.',
      icon: <Mail className="w-8 h-8" />,
      category: 'business',
      status: 'available',
      estimatedTime: '5 min',
      frequency: 'Automático',
      aiPowered: true,
      complexity: 'simple',
      popularity: 95,
      tags: ['email', 'leads', 'ventas', 'marketing']
    },
    {
      id: '2',
      name: 'Recordatorio inteligente a clientes inactivos',
      description: 'IA que identifica patrones de comportamiento y envía recordatorios personalizados a clientes que no han interactuado recientemente.',
      icon: <Users className="w-8 h-8" />,
      category: 'business',
      status: 'available',
      estimatedTime: '3 min',
      frequency: 'Semanal',
      aiPowered: true,
      complexity: 'medium',
      popularity: 88,
      tags: ['clientes', 'retención', 'crm']
    },
    {
      id: '3',
      name: 'Seguimiento post-reunión con IA',
      description: 'IA que procesa automáticamente grabaciones de reuniones, genera resúmenes y crea listas de tareas pendientes para todos los participantes.',
      icon: <Calendar className="w-8 h-8" />,
      category: 'business',
      status: 'coming-soon',
      estimatedTime: '2 min',
      frequency: 'Por reunión',
      aiPowered: true,
      complexity: 'advanced',
      popularity: 92,
      tags: ['reuniones', 'productividad', 'transcripción']
    },
    {
      id: '4',
      name: 'Generación automática de reportes con insights IA',
      description: 'Sistema que crea y envía reportes de rendimiento semanales con métricas clave, análisis de tendencias y recomendaciones inteligentes.',
      icon: <BarChart3 className="w-8 h-8" />,
      category: 'business',
      status: 'available',
      estimatedTime: '10 min',
      frequency: 'Semanal',
      aiPowered: true,
      complexity: 'medium',
      popularity: 85,
      tags: ['reportes', 'analytics', 'kpis']
    },
    {
      id: '5',
      name: 'Chatbot inteligente para formularios web',
      description: 'IA conversacional que responde inmediatamente a consultas recibidas por formularios web con información contextual relevante.',
      icon: <MessageSquare className="w-8 h-8" />,
      category: 'business',
      status: 'coming-soon',
      estimatedTime: '5 min',
      frequency: 'Automático',
      aiPowered: true,
      complexity: 'advanced',
      popularity: 90,
      tags: ['chatbot', 'atención', 'web']
    },
    {
      id: '6',
      name: 'Generación y programación de contenido IA',
      description: 'IA que crea, optimiza y programa automáticamente contenido en múltiples redes sociales con horarios y audiencias optimizados.',
      icon: <Share2 className="w-8 h-8" />,
      category: 'business',
      status: 'premium',
      estimatedTime: '15 min',
      frequency: 'Diario',
      aiPowered: true,
      complexity: 'advanced',
      popularity: 78,
      tags: ['social media', 'contenido', 'marketing']
    },
    // Automatizaciones Personales
    {
      id: '7',
      name: 'Asistente personal de agenda inteligente',
      description: 'IA que analiza tu agenda, prioriza tareas y envía recordatorios contextuales por WhatsApp o email con recomendaciones personalizadas.',
      icon: <Clock className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '2 min',
      frequency: 'Diario',
      aiPowered: true,
      complexity: 'simple',
      popularity: 94,
      tags: ['agenda', 'productividad', 'whatsapp']
    },
    {
      id: '8',
      name: 'Coach de hábitos con IA adaptativa',
      description: 'Sistema inteligente que aprende de tus patrones y ajusta recordatorios para mantener hábitos como leer, meditar y escribir.',
      icon: <BookOpen className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '3 min',
      frequency: 'Diario',
      aiPowered: true,
      complexity: 'medium',
      popularity: 89,
      tags: ['hábitos', 'bienestar', 'coaching']
    },
    {
      id: '9',
      name: 'Curador inteligente de aprendizaje',
      description: 'IA que genera resúmenes personalizados y crea planes de estudio basados en los libros y cursos que estás consumiendo.',
      icon: <FileText className="w-8 h-8" />,
      category: 'personal',
      status: 'coming-soon',
      estimatedTime: '8 min',
      frequency: 'Semanal',
      aiPowered: true,
      complexity: 'advanced',
      popularity: 86,
      tags: ['aprendizaje', 'resúmenes', 'educación']
    },
    {
      id: '10',
      name: 'Gestor financiero automático con IA',
      description: 'Sistema que categoriza inteligentemente transacciones, detecta patrones de gasto y proporciona insights financieros personalizados.',
      icon: <DollarSign className="w-8 h-8" />,
      category: 'personal',
      status: 'premium',
      estimatedTime: '5 min',
      frequency: 'Automático',
      aiPowered: true,
      complexity: 'advanced',
      popularity: 91,
      tags: ['finanzas', 'gastos', 'análisis']
    },
    {
      id: '11',
      name: 'Autopublicador inteligente de contenido',
      description: 'IA que optimiza el momento, formato y audiencia para publicar automáticamente en blog, redes sociales y newsletter.',
      icon: <Share2 className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '10 min',
      frequency: 'Según programación',
      aiPowered: true,
      complexity: 'medium',
      popularity: 82,
      tags: ['contenido', 'blog', 'automatización']
    },
    {
      id: '12',
      name: 'Backup inteligente con priorización IA',
      description: 'Sistema que identifica automáticamente archivos importantes y realiza copias de seguridad priorizadas en la nube.',
      icon: <Database className="w-8 h-8" />,
      category: 'personal',
      status: 'available',
      estimatedTime: '5 min',
      frequency: 'Semanal',
      aiPowered: true,
      complexity: 'simple',
      popularity: 76,
      tags: ['backup', 'seguridad', 'archivos']
    }
  ];

  const filteredAutomations = automations.filter(automation => {
    const matchesCategory = selectedCategory === 'all' || automation.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || automation.status === selectedStatus;
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Automation['status']) => {
    switch (status) {
      case 'available': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300';
      case 'coming-soon': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300';
      case 'premium': return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: Automation['status']) => {
    switch (status) {
      case 'available': return <CheckCircle size={14} />;
      case 'coming-soon': return <AlertCircle size={14} />;
      case 'premium': return <Crown size={14} />;
      default: return <XCircle size={14} />;
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
      case 'available': return 'Activar Ahora';
      case 'coming-soon': return 'Notificarme';
      case 'premium': return 'Actualizar Plan';
      default: return 'Ver Detalles';
    }
  };

  const getButtonStyle = (status: Automation['status']) => {
    switch (status) {
      case 'available': return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg';
      case 'coming-soon': return 'bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-800 border border-blue-300';
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: Automation['complexity']) => {
    switch (complexity) {
      case 'simple': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getComplexityText = (complexity: Automation['complexity']) => {
    switch (complexity) {
      case 'simple': return 'Básico';
      case 'medium': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return 'N/A';
    }
  };

  const businessAutomations = filteredAutomations.filter(a => a.category === 'business');
  const personalAutomations = filteredAutomations.filter(a => a.category === 'personal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="px-6 py-8 md:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header mejorado */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white rounded-2xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-32 translate-y-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                <Zap size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                  Automatizaciones IA
                  <div className="flex items-center gap-2 text-lg bg-white/20 px-3 py-1 rounded-full">
                    <Bot size={20} />
                    <span className="text-sm">Powered</span>
                  </div>
                </h1>
                <p className="text-xl text-white/90 mt-2 max-w-2xl">
                  Delega tareas repetitivas a la IA y enfócate en lo que realmente importa para tu crecimiento
                </p>
                <div className="flex items-center gap-6 mt-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <Cpu size={20} />
                    <span>IA Avanzada integrada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={20} />
                    <span>Automatización 24/7</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-300" />
                  <div>
                    <div className="text-2xl font-bold">{automations.filter(a => a.status === 'available').length}</div>
                    <div className="text-sm text-white/80">Disponibles</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-blue-300" />
                  <div>
                    <div className="text-2xl font-bold">{automations.filter(a => a.status === 'coming-soon').length}</div>
                    <div className="text-sm text-white/80">Próximamente</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Crown size={20} className="text-purple-300" />
                  <div>
                    <div className="text-2xl font-bold">{automations.filter(a => a.status === 'premium').length}</div>
                    <div className="text-sm text-white/80">Premium</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-yellow-300" />
                  <div>
                    <div className="text-2xl font-bold">{automations.filter(a => a.aiPowered).length}</div>
                    <div className="text-sm text-white/80">Con IA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda mejorados */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar automatizaciones por nombre, descripción o tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              >
                <option value="all">Todas las categorías</option>
                <option value="business">🏢 Empresariales</option>
                <option value="personal">👤 Personales</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              >
                <option value="all">Todos los estados</option>
                <option value="available">✅ Disponibles</option>
                <option value="coming-soon">🔔 Próximamente</option>
                <option value="premium">👑 Premium</option>
              </select>
            </div>
          </div>
          
          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg w-fit">
            Mostrando <span className="font-semibold">{filteredAutomations.length}</span> de <span className="font-semibold">{automations.length}</span> automatizaciones
          </div>
        </div>

        {/* Sección Empresarial mejorada */}
        {(selectedCategory === 'all' || selectedCategory === 'business') && businessAutomations.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-200">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Automatizaciones Empresariales</h2>
                <p className="text-gray-600">Optimiza procesos de negocio con IA avanzada</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessAutomations.map((automation) => (
                <div key={automation.id} className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02]">
                  {/* Header de la tarjeta mejorado */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-200 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-blue-600">
                          {automation.icon}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(automation.status)}`}>
                          {getStatusIcon(automation.status)}
                          {getStatusText(automation.status)}
                        </span>
                        {automation.aiPowered && (
                          <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <Bot size={12} />
                            IA
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {automation.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {automation.description}
                    </p>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Clock size={12} />
                          {automation.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Activity size={12} />
                          {automation.frequency}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getComplexityColor(automation.complexity)}`}>
                        {getComplexityText(automation.complexity)}
                      </span>
                    </div>

                    {/* Popularidad */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{automation.popularity}%</span>
                      </div>
                      <span className="text-xs text-gray-500">popularidad</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {automation.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer de la tarjeta mejorado */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50/30">
                    <button 
                      className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 ${getButtonStyle(automation.status)}`}
                    >
                      {getButtonText(automation.status)}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {filteredAutomations.length === 0 && (
          <div className="text-center py-16 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No se encontraron automatizaciones
              </h3>
              <p className="text-gray-500 mb-6">
                Intenta ajustar tus filtros de búsqueda o explora otras categorías
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver todas las automatizaciones
              </button>
            </div>
          </div>
        )}

        {/* Sección de información mejorada */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Workflow size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    ¿Cómo funcionan las automatizaciones IA?
                  </h3>
                  <p className="text-blue-600 font-medium">Tecnología de vanguardia a tu servicio</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nuestras automatizaciones utilizan inteligencia artificial avanzada para ejecutar tareas complejas sin intervención manual. 
                Cada flujo de trabajo aprende de tus patrones y se optimiza automáticamente para ofrecerte los mejores resultados.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Configuración en minutos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bot className="text-blue-500" size={20} />
                  <span className="text-gray-700">IA que aprende y se adapta</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-purple-500" size={20} />
                  <span className="text-gray-700">Seguridad y privacidad garantizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-orange-500" size={20} />
                  <span className="text-gray-700">Monitoreo en tiempo real</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="text-blue-600" size={24} />
                  <h4 className="font-bold text-gray-800">Sugerencia IA</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Comienza con automatizaciones simples como la agenda diaria y el envío de emails, 
                  luego avanza hacia flujos más complejos.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="text-green-600" size={24} />
                  <h4 className="font-bold text-gray-800">Beneficios Comprobados</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Los usuarios ahorran en promedio 15 horas semanales y aumentan su productividad en un 40% 
                  con nuestras automatizaciones IA.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="text-purple-600" size={24} />
                  <h4 className="font-bold text-gray-800">Premium</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Accede a automatizaciones avanzadas con IA generativa, análisis predictivo 
                  y integraciones personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA mejorado */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para automatizar tu éxito?
            </h3>
            <p className="text-xl text-white/90 mb-6">
              Únete a miles de emprendedores que ya están usando IA para optimizar sus procesos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Comenzar Gratis
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}