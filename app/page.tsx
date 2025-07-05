"use client";

import { useState } from 'react';

import { 
  CheckSquare, 
  Calendar, 
  Brain, 
  Zap, 
  BarChart3, 
  MessageCircle, 
  FileText, 
  Bot, 
  Search, 
  Shield,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  BookOpen,
  Plus,
  ArrowRight,
  Star,
  Bell,
  Settings,
  DollarSign,
  Target,
  Briefcase,
  LineChart,
  UserCheck,
  Globe,
  Lightbulb,
  HandCoins
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'networking';
}

interface Report {
  id: string;
  title: string;
  type: string;
  lastOpened: string;
  status: 'draft' | 'completed' | 'pending';
}

interface Message {
  id: string;
  sender: string;
  subject: string;
  unread: boolean;
  timestamp: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  lastModified: string;
  isFavorite: boolean;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Datos simulados para el dashboard de emprendimiento
  const tasks: Task[] = [
    { id: '1', title: 'Finalizar business plan Q1', priority: 'high', dueDate: '2024-01-30', completed: false },
    { id: '2', title: 'Reunión con inversores', priority: 'high', dueDate: '2024-02-02', completed: false },
    { id: '3', title: 'Análisis de competencia', priority: 'medium', dueDate: '2024-02-05', completed: false },
    { id: '4', title: 'Optimizar landing page', priority: 'low', dueDate: '2024-02-08', completed: true }
  ];

  const events: Event[] = [
    { id: '1', title: 'Pitch con venture capital', date: '2024-01-29', time: '2:00 PM', type: 'meeting' },
    { id: '2', title: 'Entrega propuesta cliente', date: '2024-01-31', time: '5:00 PM', type: 'deadline' },
    { id: '3', title: 'Evento de networking', date: '2024-02-01', time: '7:00 PM', type: 'networking' }
  ];

  const reports: Report[] = [
    { id: '1', title: 'Métricas de Ventas Q4', type: 'Financiero', lastOpened: '2024-01-28', status: 'completed' },
    { id: '2', title: 'Análisis de Mercado', type: 'Estratégico', lastOpened: '2024-01-27', status: 'draft' },
    { id: '3', title: 'ROI Campañas Marketing', type: 'Marketing', lastOpened: '2024-01-26', status: 'pending' }
  ];

  const messages: Message[] = [
    { id: '1', sender: 'Carlos Investor', subject: 'Interés en tu startup', unread: true, timestamp: '2h' },
    { id: '2', sender: 'María Cliente', subject: 'Propuesta de colaboración', unread: false, timestamp: '1d' },
    { id: '3', sender: 'Ana Mentor', subject: 'Feedback sobre tu estrategia', unread: true, timestamp: '3h' }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Business Plan 2024', type: 'PDF', lastModified: '2024-01-28', isFavorite: true },
    { id: '2', name: 'Análisis Financiero', type: 'XLSX', lastModified: '2024-01-27', isFavorite: false },
    { id: '3', name: 'Estrategia Marketing', type: 'DOCX', lastModified: '2024-01-26', isFavorite: true }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Briefcase className="w-4 h-4" />;
      case 'deadline': return <Clock className="w-4 h-4" />;
      case 'networking': return <Users className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'draft': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      {/* Header */}
      <div className="bg-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Agente Mentor Dashboard</h1>
              <p className="text-white/80 mt-1">Tu centro de emprendimiento y mentoría con IA</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tareas Pendientes</p>
                <p className="text-2xl font-bold text-[#1F2937]">{tasks.filter(t => !t.completed).length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reuniones Hoy</p>
                <p className="text-2xl font-bold text-[#1F2937]">{events.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leads Nuevos</p>
                <p className="text-2xl font-bold text-[#1F2937]">{messages.filter(m => m.unread).length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos Este Mes</p>
                <p className="text-2xl font-bold text-[#1F2937]">$24,500</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Tareas */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Objetivos & Tareas
              </h2>
              <a href="/objetivos" className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
                Ver todos
              </a>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500">Vence: {task.dueDate}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Objetivo
            </button>
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Agenda de Negocios
              </h2>
              <a href="/calendario" className="text-green-600 hover:text-green-800 text-sm font-medium cursor-pointer">
                Ver agenda
              </a>
            </div>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Evento
            </button>
          </div>

          {/* MentorX */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                MentorX
              </h2>
              <a href="/mentor" className="text-purple-600 hover:text-purple-800 text-sm font-medium cursor-pointer">
                Ir al mentor
              </a>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">Última consulta</p>
                <p className="text-xs text-purple-700 mt-1">"¿Cómo optimizar mi embudo de ventas?"</p>
                <p className="text-xs text-purple-500 mt-2">Hace 2 horas</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Mentor activo</p>
                <p className="text-xs text-gray-600 mt-1">Especialista en Startups Tech</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-purple-50 text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Consultar Mentor
            </button>
          </div>

          {/* Automatizaciones */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Automatizaciones
              </h2>
              <Link href="/automatizaciones" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Zap className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Automatizar</span>
            </Link>
            <Link href="/reportes" className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <BarChart3 className="w-6 h-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-indigo-900">Analytics</span>
            </Link>
            <Link href="/admin" className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Shield className="w-6 h-6 text-red-600 mb-2" />
              <span className="text-sm font-medium text-red-900">Control</span>
            </Link>
          </div>
        </div>

        {/* Business Insights */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-600" />
              Métricas Clave
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Conversión de Leads</p>
                  <p className="text-xs text-blue-700">Este mes vs anterior</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-900">24.5%</p>
                  <p className="text-xs text-green-600">+3.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Revenue Growth</p>
                  <p className="text-xs text-green-700">Crecimiento mensual</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-900">18.7%</p>
                  <p className="text-xs text-green-600">+5.1%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">Customer Acquisition</p>
                  <p className="text-xs text-purple-700">Nuevos clientes</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-900">47</p>
                  <p className="text-xs text-green-600">+12</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Insights & Oportunidades
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm font-medium text-yellow-900">Oportunidad de Mercado</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Tu nicho tiene 34% menos competencia este trimestre. Considera aumentar inversión en marketing.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm font-medium text-blue-900">Optimización de Procesos</p>
                <p className="text-xs text-blue-700 mt-1">
                  Automatizar el seguimiento de leads podría aumentar tu conversión en 15%.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-900">Expansión Recomendada</p>
                <p className="text-xs text-green-700 mt-1">
                  Considera lanzar un programa de referidos. Tus clientes tienen alta satisfacción.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}aciones" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                Ver todas
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-orange-900">Follow-up Leads</p>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-xs text-orange-700 mt-1">Activa • 45 leads procesados hoy</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-orange-900">Email Marketing</p>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-xs text-orange-700 mt-1">Activa • Próxima campaña: mañana</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-orange-50 text-orange-600 py-2 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nueva Automatización
            </button>
          </div>

          {/* Reportes */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Analytics & Reportes
              </h2>
              <a href="/reportes" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer">
                Ver todos
              </a>
            </div>
            <div className="space-y-3">
              {reports.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.title}</p>
                    <p className="text-xs text-gray-500">{report.type} • {report.lastOpened}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Reporte
            </button>
          </div>

          {/* CRM & Leads */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-pink-600" />
                CRM & Leads
              </h2>
              <a href="/crm" className="text-pink-600 hover:text-pink-800 text-sm font-medium cursor-pointer">
                Ver CRM
              </a>
            </div>
            <div className="space-y-3">
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className={`flex items-center gap-3 p-3 rounded-lg ${message.unread ? 'bg-pink-50' : 'bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.unread ? 'bg-pink-100' : 'bg-gray-100'}`}>
                    <span className="text-xs font-medium text-gray-600">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${message.unread ? 'text-pink-900' : 'text-gray-900'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500">{message.sender} • {message.timestamp}</p>
                  </div>
                  {message.unread && (
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-pink-50 text-pink-600 py-2 rounded-lg hover:bg-pink-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Lead
            </button>
          </div>

          {/* Documentos */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Documentos
              </h2>
              <a href="/documentos" className="text-teal-600 hover:text-teal-800 text-sm font-medium cursor-pointer">
                Ver todos
              </a>
            </div>
            <div className="space-y-3">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {doc.name}
                        {doc.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                      </p>
                      <p className="text-xs text-gray-500">{doc.type} • {doc.lastModified}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-teal-50 text-teal-600 py-2 rounded-lg hover:bg-teal-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Subir Documento
            </button>
          </div>

          {/* AutomatizadorX */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-600" />
                AutomatizadorX
              </h2>
              <a href="/automatizador" className="text-cyan-600 hover:text-cyan-800 text-sm font-medium cursor-pointer">
                Ir al automatizador
              </a>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm font-medium text-cyan-900">Flujo ejecutado</p>
                <p className="text-xs text-cyan-700 mt-1">"Captura de Leads" • 23 leads procesados</p>
                <p className="text-xs text-cyan-500 mt-2">Hace 1 hora</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm font-medium text-cyan-900">Flujo activo</p>
                <p className="text-xs text-cyan-700 mt-1">"Nurturing de Prospectos"</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-cyan-50 text-cyan-600 py-2 rounded-lg hover:bg-cyan-100 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Flujo
            </button>
          </div>

          {/* WebSearch GPT */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600" />
                Market Research
              </h2>
              <a href="/websearch" className="text-emerald-600 hover:text-emerald-800 text-sm font-medium cursor-pointer">
                Investigar mercado
              </a>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm font-medium text-emerald-900">Última investigación</p>
                <p className="text-xs text-emerald-700 mt-1">"Tendencias e-commerce 2024"</p>
                <p className="text-xs text-emerald-500 mt-2">Hace 3 horas</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm font-medium text-emerald-900">Investigaciones guardadas</p>
                <p className="text-xs text-emerald-700 mt-1">8 análisis de competencia</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Nueva Investigación
            </button>
          </div>

          {/* Panel de Administración */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Business Control
              </h2>
              <a href="/admin" className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">
                Ir al panel
              </a>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <HandCoins className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium text-red-900">Nuevo pago recibido</p>
                </div>
                <p className="text-xs text-red-700 mt-1">$2,500 de cliente Premium</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium text-red-900">KPIs actualizados</p>
                </div>
                <p className="text-xs text-red-700 mt-1">Dashboard financiero disponible</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" />
              Configuración
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link href="/ebook/emprendimiento-digital" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Emprendimiento Digital</span>
            </Link>
            <Link href="/networking" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Networking</span>
            </Link>
            <Link href="/mentor" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Brain className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Mentor IA</span>
            </Link>
            <Link href="/automatiz