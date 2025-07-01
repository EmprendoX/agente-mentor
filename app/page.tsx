"use client";

import { useState } from 'react';
import Link from 'next/link';
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
  Settings
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
  type: 'meeting' | 'deadline' | 'reminder';
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

  // Datos simulados para el dashboard educativo
  const tasks: Task[] = [
    { id: '1', title: 'Completar lección de matemáticas', priority: 'high', dueDate: '2024-01-30', completed: false },
    { id: '2', title: 'Leer capítulo de ciencias', priority: 'medium', dueDate: '2024-02-02', completed: false },
    { id: '3', title: 'Practicar ejercicios de inglés', priority: 'low', dueDate: '2024-02-05', completed: true }
  ];

  const events: Event[] = [
    { id: '1', title: 'Clase de matemáticas', date: '2024-01-29', time: '10:00 AM', type: 'meeting' },
    { id: '2', title: 'Entrega de proyecto de ciencias', date: '2024-01-31', time: '5:00 PM', type: 'deadline' },
    { id: '3', title: 'Recordatorio: Estudiar para examen', date: '2024-02-01', time: '9:00 AM', type: 'reminder' }
  ];

  const reports: Report[] = [
    { id: '1', title: 'Progreso en Matemáticas', type: 'Académico', lastOpened: '2024-01-28', status: 'completed' },
    { id: '2', title: 'Reporte de Lectura', type: 'Literatura', lastOpened: '2024-01-27', status: 'draft' },
    { id: '3', title: 'Evaluación de Ciencias', type: 'Ciencias', lastOpened: '2024-01-26', status: 'pending' }
  ];

  const messages: Message[] = [
    { id: '1', sender: 'Prof. María González', subject: 'Feedback sobre tu tarea', unread: true, timestamp: '2h' },
    { id: '2', sender: 'Prof. Carlos Rodríguez', subject: 'Recordatorio de clase', unread: false, timestamp: '1d' },
    { id: '3', sender: 'Prof. Ana Martínez', subject: 'Felicitaciones por tu progreso', unread: true, timestamp: '3h' }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Guía de Estudio 2024', type: 'PDF', lastModified: '2024-01-28', isFavorite: true },
    { id: '2', name: 'Ejercicios de Matemáticas', type: 'DOCX', lastModified: '2024-01-27', isFavorite: false },
    { id: '3', name: 'Notas de Ciencias', type: 'XLSX', lastModified: '2024-01-26', isFavorite: true }
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
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'deadline': return <Clock className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
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
              <h1 className="text-2xl font-bold">SchoolX Dashboard</h1>
              <p className="text-white/80 mt-1">Tu centro de aprendizaje personalizado</p>
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
                <p className="text-sm text-gray-600">Clases Hoy</p>
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
                <p className="text-sm text-gray-600">Mensajes de Profesores</p>
                <p className="text-2xl font-bold text-[#1F2937]">{messages.filter(m => m.unread).length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lecciones Completadas</p>
                <p className="text-2xl font-bold text-[#1F2937]">12</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600" />
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
                <CheckSquare className="w-5 h-5 text-blue-600" />
                Tareas
              </h2>
              <Link href="/tareas" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas
              </Link>
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
              Nueva Tarea
            </button>
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Calendario
              </h2>
              <Link href="/calendario" className="text-green-600 hover:text-green-800 text-sm font-medium">
                Ver calendario
              </Link>
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
              <Link href="/mentor" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Ir al mentor
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">Última consulta</p>
                <p className="text-xs text-purple-700 mt-1">"¿Cómo optimizar mi estrategia de ventas inmobiliarias?"</p>
                <p className="text-xs text-purple-500 mt-2">Hace 2 horas</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Mentor activo</p>
                <p className="text-xs text-gray-600 mt-1">Especialista en Bienes Raíces</p>
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
              <Link href="/automatizaciones" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
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
                  <p className="text-sm font-medium text-orange-900">Reportes Semanales</p>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-xs text-orange-700 mt-1">Activa • Próximo: mañana 9:00 AM</p>
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
                Reportes
              </h2>
              <Link href="/reportes" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Ver todos
              </Link>
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

          {/* Comunicación */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pink-600" />
                Comunicación
              </h2>
              <Link href="/mensajes" className="text-pink-600 hover:text-pink-800 text-sm font-medium">
                Ver todos
              </Link>
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
              Nuevo Mensaje
            </button>
          </div>

          {/* Documentos */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Documentos
              </h2>
              <Link href="/documentos" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                Ver todos
              </Link>
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
              <Link href="/automatizador" className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
                Ir al automatizador
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm font-medium text-cyan-900">Flujo ejecutado</p>
                <p className="text-xs text-cyan-700 mt-1">"Captura de Leads" • 23 leads procesados</p>
                <p className="text-xs text-cyan-500 mt-2">Hace 1 hora</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm font-medium text-cyan-900">Flujo activo</p>
                <p className="text-xs text-cyan-700 mt-1">"Notificaciones de Seguimiento"</p>
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
                WebSearch GPT
              </h2>
              <Link href="/websearch" className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
                Ir a búsquedas
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm font-medium text-emerald-900">Última búsqueda</p>
                <p className="text-xs text-emerald-700 mt-1">"Tendencias del mercado inmobiliario 2024"</p>
                <p className="text-xs text-emerald-500 mt-2">Hace 3 horas</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm font-medium text-emerald-900">Búsquedas guardadas</p>
                <p className="text-xs text-emerald-700 mt-1">5 búsquedas favoritas</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Nueva Búsqueda
            </button>
          </div>

          {/* Panel de Administración */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Administración
              </h2>
              <Link href="/admin" className="text-red-600 hover:text-red-800 text-sm font-medium">
                Ir al panel
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium text-red-900">Nuevo usuario registrado</p>
                </div>
                <p className="text-xs text-red-700 mt-1">María González se unió hace 2 horas</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium text-red-900">Métricas actualizadas</p>
                </div>
                <p className="text-xs text-red-700 mt-1">Reporte de actividad disponible</p>
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
            <Link href="/ebook/educacion-con-sentido" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Educación con Sentido</span>
            </Link>
            <Link href="/registro" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Registro</span>
            </Link>
            <Link href="/mentor" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Brain className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Mentor</span>
            </Link>
            <Link href="/automatizaciones" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Zap className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Automatizar</span>
            </Link>
            <Link href="/reportes" className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <BarChart3 className="w-6 h-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-indigo-900">Reportes</span>
            </Link>
            <Link href="/admin" className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Shield className="w-6 h-6 text-red-600 mb-2" />
              <span className="text-sm font-medium text-red-900">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
