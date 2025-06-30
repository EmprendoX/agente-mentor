"use client";

import { useState } from 'react';
import { 
  Zap, Play, Pause, Clock, TrendingUp, Lightbulb,
  Settings, BarChart3, Target, Calendar, Mail,
  MessageSquare, FileText, Users, AlertCircle,
  CheckCircle, XCircle, Plus, Search, Filter,
  ArrowRight, Eye, Edit, Trash2, Download,
  Share2, MoreVertical, Brain, Cpu, Workflow,
  Sparkles, Rocket, Shield, Globe
} from 'lucide-react';

interface ActiveAutomation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'scheduled' | 'error';
  category: string;
  lastRun: Date;
  nextRun?: Date;
  efficiency: number;
  executions: number;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeSaved: string;
  category: string;
  reason: string;
}

interface AvailableAutomation {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeToSetup: string;
  popularity: number;
  icon: React.ReactNode;
  color: string;
}

interface SystemAnalysis {
  totalAutomations: number;
  activeAutomations: number;
  unusedAutomations: number;
  timeSaved: string;
  efficiency: number;
  recommendations: string[];
  alerts: string[];
}

export default function AutomatizadorXPage() {
  const [inputValue, setInputValue] = useState('');

  const activeAutomations: ActiveAutomation[] = [
    {
      id: '1',
      name: 'Respuesta Automática de Leads',
      description: 'Envía emails personalizados a nuevos leads en 5 minutos',
      status: 'active',
      category: 'Marketing',
      lastRun: new Date(Date.now() - 1000 * 60 * 30),
      nextRun: new Date(Date.now() + 1000 * 60 * 15),
      efficiency: 95,
      executions: 127
    },
    {
      id: '2',
      name: 'Reporte Semanal de Ventas',
      description: 'Genera y envía reportes automáticos cada lunes',
      status: 'scheduled',
      category: 'Reportes',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      efficiency: 88,
      executions: 52
    },
    {
      id: '3',
      name: 'Recordatorios de Tareas',
      description: 'Envía notificaciones para tareas próximas a vencer',
      status: 'active',
      category: 'Productividad',
      lastRun: new Date(Date.now() - 1000 * 60 * 15),
      efficiency: 92,
      executions: 89
    },
    {
      id: '4',
      name: 'Backup de Documentos',
      description: 'Respalda archivos importantes automáticamente',
      status: 'paused',
      category: 'Seguridad',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      efficiency: 100,
      executions: 156
    }
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Automatiza Seguimientos Post-Reunión',
      description: 'Envía emails de seguimiento automáticamente después de cada reunión',
      impact: 'high',
      timeSaved: '2 horas/semana',
      category: 'Comunicación',
      reason: 'Basado en tu actividad de reuniones frecuentes'
    },
    {
      id: '2',
      title: 'Sincronización de Calendarios',
      description: 'Sincroniza automáticamente eventos entre diferentes calendarios',
      impact: 'medium',
      timeSaved: '1 hora/semana',
      category: 'Productividad',
      reason: 'Detecté múltiples calendarios sin sincronizar'
    },
    {
      id: '3',
      title: 'Análisis de Competencia Automático',
      description: 'Monitorea cambios en sitios web de competidores',
      impact: 'high',
      timeSaved: '3 horas/semana',
      category: 'Inteligencia',
      reason: 'Basado en tu interés en análisis de mercado'
    }
  ];

  const availableAutomations: AvailableAutomation[] = [
    {
      id: '1',
      name: 'Integración CRM',
      description: 'Sincroniza contactos y oportunidades automáticamente',
      category: 'CRM',
      difficulty: 'medium',
      timeToSetup: '30 min',
      popularity: 95,
      icon: <Users size={24} />,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Análisis de Redes Sociales',
      description: 'Monitorea menciones y engagement automáticamente',
      category: 'Social Media',
      difficulty: 'easy',
      timeToSetup: '15 min',
      popularity: 87,
      icon: <Globe size={24} />,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Facturación Automática',
      description: 'Genera y envía facturas automáticamente',
      category: 'Finanzas',
      difficulty: 'hard',
      timeToSetup: '45 min',
      popularity: 92,
      icon: <FileText size={24} />,
      color: 'bg-green-500'
    },
    {
      id: '4',
      name: 'Chatbot de Atención',
      description: 'Responde preguntas frecuentes automáticamente',
      category: 'Atención al Cliente',
      difficulty: 'medium',
      timeToSetup: '25 min',
      popularity: 78,
      icon: <MessageSquare size={24} />,
      color: 'bg-orange-500'
    },
    {
      id: '5',
      name: 'Análisis de Rendimiento',
      description: 'Genera reportes de rendimiento automáticamente',
      category: 'Analytics',
      difficulty: 'easy',
      timeToSetup: '20 min',
      popularity: 89,
      icon: <BarChart3 size={24} />,
      color: 'bg-indigo-500'
    },
    {
      id: '6',
      name: 'Gestión de Inventario',
      description: 'Actualiza niveles de stock automáticamente',
      category: 'Operaciones',
      difficulty: 'medium',
      timeToSetup: '35 min',
      popularity: 83,
      icon: <Target size={24} />,
      color: 'bg-red-500'
    }
  ];

  const systemAnalysis: SystemAnalysis = {
    totalAutomations: 12,
    activeAutomations: 4,
    unusedAutomations: 3,
    timeSaved: '15.5 horas/semana',
    efficiency: 87,
    recommendations: [
      'Tienes 3 automatizaciones sin uso desde hace 15 días',
      'Podrías automatizar tus seguimientos post-reunión',
      'Considera activar la sincronización de calendarios'
    ],
    alerts: [
      'Backup de Documentos está pausado - revisar configuración',
      'Eficiencia general aumentó 12% esta semana'
    ]
  };

  const getStatusColor = (status: ActiveAutomation['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: ActiveAutomation['status']) => {
    switch (status) {
      case 'active': return <Play size={16} />;
      case 'paused': return <Pause size={16} />;
      case 'scheduled': return <Clock size={16} />;
      case 'error': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getImpactColor = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: AvailableAutomation['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Zap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AutomatizadorX</h1>
              <p className="text-sm mt-1 text-white/80">Centro de mando inteligente de automatizaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Cpu size={20} />
              <span>{systemAnalysis.activeAutomations} activas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Clock size={20} />
              <span>{systemAnalysis.timeSaved} ahorradas</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              <Plus size={16} className="inline mr-2" />
              Nueva Automatización
            </button>
          </div>
        </div>
      </div>

      {/* System Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg text-white">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937]">Análisis del Sistema</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{systemAnalysis.totalAutomations}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{systemAnalysis.efficiency}%</div>
                <div className="text-xs text-gray-600">Eficiencia</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-[#1F2937] text-sm">Alertas:</h4>
              {systemAnalysis.alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <AlertCircle size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{alert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 p-2 rounded-lg text-white">
              <Lightbulb size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937]">Recomendaciones Inteligentes</h3>
          </div>
          
          <div className="space-y-3">
            {recommendations.slice(0, 2).map((rec) => (
              <div key={rec.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-[#1F2937] text-sm">{rec.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                    {rec.impact}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600 font-medium">{rec.timeSaved}</span>
                  <button className="text-blue-600 hover:text-blue-800">Activar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 p-2 rounded-lg text-white">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937]">Acciones Rápidas</h3>
          </div>
          
          <div className="space-y-3">
            <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-lg text-white">
                  <Eye size={16} />
                </div>
                <div>
                  <div className="font-medium text-[#1F2937] text-sm">Ver Todas las Recomendaciones</div>
                  <div className="text-xs text-gray-600">Explora más opciones</div>
                </div>
              </div>
            </button>
            
            <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-2 rounded-lg text-white">
                  <Settings size={16} />
                </div>
                <div>
                  <div className="font-medium text-[#1F2937] text-sm">Configurar Automatizaciones</div>
                  <div className="text-xs text-gray-600">Personaliza flujos</div>
                </div>
              </div>
            </button>
            
            <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg text-white">
                  <Download size={16} />
                </div>
                <div>
                  <div className="font-medium text-[#1F2937] text-sm">Exportar Reporte</div>
                  <div className="text-xs text-gray-600">Análisis completo</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Active Automations Panel */}
      <div className="bg-white border border-gray-100 rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg text-white">
                <Play size={20} />
              </div>
              <h2 className="text-xl font-semibold text-[#1F2937]">Automatizaciones Activas</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{activeAutomations.length} automatizaciones</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeAutomations.map((automation) => (
              <div key={automation.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#1F2937] mb-1">{automation.name}</h3>
                    <p className="text-sm text-gray-600">{automation.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(automation.status)}`}>
                    {getStatusIcon(automation.status)}
                    <span className="ml-1 capitalize">{automation.status}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{automation.efficiency}%</div>
                    <div className="text-xs text-gray-600">Eficiencia</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{automation.executions}</div>
                    <div className="text-xs text-gray-600">Ejecuciones</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Última ejecución: {formatTime(automation.lastRun)}</span>
                  {automation.nextRun && (
                    <span>Próxima: {formatTime(automation.nextRun)}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Ver detalles</button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm">Configurar</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Pausar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Automations Explorer */}
      <div className="bg-white border border-gray-100 rounded-xl shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-2 rounded-lg text-white">
                <Rocket size={20} />
              </div>
              <h2 className="text-xl font-semibold text-[#1F2937]">Explorador de Automatizaciones</h2>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar automatizaciones..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableAutomations.map((automation) => (
              <div key={automation.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition group">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${automation.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    {automation.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1F2937] mb-1">{automation.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{automation.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(automation.difficulty)}`}>
                        {automation.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{automation.timeToSetup}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp size={12} />
                    <span>{automation.popularity}% popular</span>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition">
                    Activar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">¿Qué quieres automatizar?</h3>
            <p className="text-sm text-gray-600">Describe tu proceso y AutomatizadorX te ayudará a crear la automatización perfecta</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ej: Quiero automatizar el envío de emails de seguimiento después de cada reunión..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Zap size={16} />
              </button>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-gray-500">
            <span>💡 Sugerencias: "automatizar reportes", "recordatorios automáticos", "sincronización de datos"</span>
          </div>
        </div>
      </div>
    </div>
  );
} 