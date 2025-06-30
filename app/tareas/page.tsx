"use client";

import { useState } from 'react';
import { 
  CheckCircle, Clock, AlertCircle, Plus, 
  Calendar, Tag, MoreVertical, Edit, Trash2,
  ArrowRight, Filter, Search, Star, Zap,
  FileText, Users, Target, Lightbulb
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date;
  category: string;
  tags: string[];
  assignee?: string;
  estimatedTime?: string;
  createdAt: Date;
  completedAt?: Date;
}

export default function TareasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'personal' | 'work' | 'urgent'>('all');

  // Datos simulados de tareas
  const tasks: Task[] = [
    // Tareas Pendientes
    {
      id: '1',
      title: 'Revisar propuesta de cliente',
      description: 'Analizar y preparar respuesta a la propuesta del cliente ABC Corp',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(2024, 0, 20),
      category: 'Trabajo',
      tags: ['cliente', 'propuesta'],
      assignee: 'María González',
      estimatedTime: '2 horas',
      createdAt: new Date(2024, 0, 15)
    },
    {
      id: '2',
      title: 'Actualizar sitio web',
      description: 'Implementar nuevas funcionalidades en la página principal',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(2024, 0, 25),
      category: 'Desarrollo',
      tags: ['web', 'frontend'],
      estimatedTime: '4 horas',
      createdAt: new Date(2024, 0, 16)
    },
    {
      id: '3',
      title: 'Preparar presentación mensual',
      description: 'Crear slides para la reunión de resultados del mes',
      status: 'pending',
      priority: 'urgent',
      dueDate: new Date(2024, 0, 18),
      category: 'Presentaciones',
      tags: ['reunión', 'resultados'],
      assignee: 'Carlos Rodríguez',
      estimatedTime: '3 horas',
      createdAt: new Date(2024, 0, 14)
    },
    {
      id: '4',
      title: 'Ejercicio matutino',
      description: 'Rutina de 30 minutos de cardio y fuerza',
      status: 'pending',
      priority: 'low',
      dueDate: new Date(2024, 0, 19),
      category: 'Personal',
      tags: ['salud', 'rutina'],
      estimatedTime: '30 min',
      createdAt: new Date(2024, 0, 17)
    },

    // Tareas en Progreso
    {
      id: '5',
      title: 'Desarrollar API de usuarios',
      description: 'Crear endpoints para gestión de usuarios y autenticación',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date(2024, 0, 22),
      category: 'Desarrollo',
      tags: ['backend', 'api'],
      assignee: 'Ana Martínez',
      estimatedTime: '6 horas',
      createdAt: new Date(2024, 0, 12)
    },
    {
      id: '6',
      title: 'Revisar presupuesto Q1',
      description: 'Analizar gastos y proyecciones para el primer trimestre',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date(2024, 0, 24),
      category: 'Finanzas',
      tags: ['presupuesto', 'análisis'],
      estimatedTime: '4 horas',
      createdAt: new Date(2024, 0, 13)
    },
    {
      id: '7',
      title: 'Entrenamiento de equipo',
      description: 'Preparar material para capacitación sobre nuevas herramientas',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date(2024, 0, 26),
      category: 'Recursos Humanos',
      tags: ['capacitación', 'equipo'],
      assignee: 'Laura Fernández',
      estimatedTime: '5 horas',
      createdAt: new Date(2024, 0, 11)
    },

    // Tareas Completadas
    {
      id: '8',
      title: 'Configurar base de datos',
      description: 'Instalar y configurar PostgreSQL para el nuevo proyecto',
      status: 'completed',
      priority: 'high',
      dueDate: new Date(2024, 0, 15),
      category: 'Infraestructura',
      tags: ['base de datos', 'configuración'],
      assignee: 'Diego López',
      estimatedTime: '3 horas',
      createdAt: new Date(2024, 0, 10),
      completedAt: new Date(2024, 0, 15)
    },
    {
      id: '9',
      title: 'Reunión con proveedores',
      description: 'Discutir términos de contrato y servicios futuros',
      status: 'completed',
      priority: 'medium',
      dueDate: new Date(2024, 0, 14),
      category: 'Compras',
      tags: ['proveedores', 'contrato'],
      estimatedTime: '2 horas',
      createdAt: new Date(2024, 0, 9),
      completedAt: new Date(2024, 0, 14)
    },
    {
      id: '10',
      title: 'Actualizar documentación',
      description: 'Revisar y actualizar manuales de usuario y procedimientos',
      status: 'completed',
      priority: 'low',
      dueDate: new Date(2024, 0, 13),
      category: 'Documentación',
      tags: ['manuales', 'procedimientos'],
      estimatedTime: '4 horas',
      createdAt: new Date(2024, 0, 8),
      completedAt: new Date(2024, 0, 13)
    },
    {
      id: '11',
      title: 'Backup semanal',
      description: 'Realizar copia de seguridad de todos los sistemas',
      status: 'completed',
      priority: 'medium',
      dueDate: new Date(2024, 0, 12),
      category: 'Mantenimiento',
      tags: ['backup', 'seguridad'],
      estimatedTime: '1 hora',
      createdAt: new Date(2024, 0, 7),
      completedAt: new Date(2024, 0, 12)
    }
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return <AlertCircle size={12} />;
      case 'high': return <Star size={12} />;
      case 'medium': return <Clock size={12} />;
      case 'low': return <CheckCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in-progress': return 'En Progreso';
      case 'completed': return 'Completada';
      default: return 'Desconocido';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'urgent' && task.priority === 'urgent') ||
                         (selectedFilter === 'personal' && task.category === 'Personal') ||
                         (selectedFilter === 'work' && task.category !== 'Personal');
    return matchesSearch && matchesFilter;
  });

  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Target size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Tareas</h1>
              <p className="text-white/80 mt-2">Organiza y gestiona todas tus actividades pendientes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
              <Filter size={16} />
              Filtrar
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2">
              <Plus size={20} />
              Nueva Tarea
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="all">Todas las tareas</option>
              <option value="urgent">Urgentes</option>
              <option value="personal">Personales</option>
              <option value="work">Trabajo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vista Kanban */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tareas Pendientes */}
        <div className="bg-white border border-gray-100 rounded-xl shadow">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-[#1F2937]">Pendientes</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {pendingTasks.length}
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 transition">
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {pendingTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1F2937] mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {/* Prioridad */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      {task.priority === 'urgent' ? 'Urgente' : 
                       task.priority === 'high' ? 'Alta' : 
                       task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>

                  {/* Fecha de vencimiento */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-gray-400" />
                    <span className={`${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {isOverdue(task.dueDate) ? 'Vencida' : 'Vence'} {formatDate(task.dueDate)}
                    </span>
                  </div>

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Asignado y tiempo estimado */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {task.assignee && (
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {task.assignee}
                      </span>
                    )}
                    {task.estimatedTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <ArrowRight size={14} />
                    Iniciar
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tareas en Progreso */}
        <div className="bg-white border border-gray-100 rounded-xl shadow">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-[#1F2937]">En Progreso</h2>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  {inProgressTasks.length}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {inProgressTasks.map((task) => (
              <div key={task.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1F2937] mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {/* Prioridad */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      {task.priority === 'urgent' ? 'Urgente' : 
                       task.priority === 'high' ? 'Alta' : 
                       task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>

                  {/* Fecha de vencimiento */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-gray-400" />
                    <span className={`${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {isOverdue(task.dueDate) ? 'Vencida' : 'Vence'} {formatDate(task.dueDate)}
                    </span>
                  </div>

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Asignado y tiempo estimado */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {task.assignee && (
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {task.assignee}
                      </span>
                    )}
                    {task.estimatedTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-yellow-200">
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <CheckCircle size={14} />
                    Completar
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tareas Completadas */}
        <div className="bg-white border border-gray-100 rounded-xl shadow">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-[#1F2937]">Completadas</h2>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {completedTasks.length}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {completedTasks.map((task) => (
              <div key={task.id} className="bg-green-50 border border-green-200 rounded-lg p-4 opacity-75 hover:opacity-100 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1F2937] mb-1 line-through">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  </div>
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                
                <div className="space-y-2">
                  {/* Prioridad */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      {task.priority === 'urgent' ? 'Urgente' : 
                       task.priority === 'high' ? 'Alta' : 
                       task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>

                  {/* Fecha de completado */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-green-600" />
                    <span className="text-green-600 font-medium">
                      Completada {task.completedAt && formatDate(task.completedAt)}
                    </span>
                  </div>

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Asignado y tiempo estimado */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {task.assignee && (
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {task.assignee}
                      </span>
                    )}
                    {task.estimatedTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-green-200">
                  <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
                    Reabrir
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 