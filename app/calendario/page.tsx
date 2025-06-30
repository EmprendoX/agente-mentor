"use client";

import { useState } from 'react';
import { 
  Calendar, Plus, CheckCircle, Clock, 
  Star, FileText, ChevronLeft, ChevronRight,
  MoreVertical, Edit, Trash2, Bell
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'task' | 'reminder' | 'personal';
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  category: string;
}

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Datos simulados
  const events: Event[] = [
    {
      id: '1',
      title: 'Reunión con MentorX',
      date: new Date(2024, 0, 15),
      time: '10:00',
      type: 'meeting',
      priority: 'high',
      description: 'Sesión de planificación estratégica'
    },
    {
      id: '2',
      title: 'Revisar hábitos matutinos',
      date: new Date(2024, 0, 16),
      time: '08:00',
      type: 'task',
      priority: 'medium',
      description: 'Evaluar rutina con Mentor de Hábitos'
    },
    {
      id: '3',
      title: 'Análisis financiero',
      date: new Date(2024, 0, 18),
      time: '14:00',
      type: 'meeting',
      priority: 'low',
      description: 'Revisión semanal con Mentor Financiero'
    },
    {
      id: '4',
      title: 'Meditación diaria',
      date: new Date(2024, 0, 20),
      time: '07:00',
      type: 'personal',
      priority: 'medium'
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Definir objetivos mensuales',
      completed: false,
      priority: 'high',
      dueDate: new Date(2024, 0, 15),
      category: 'Planificación'
    },
    {
      id: '2',
      title: 'Revisar hábitos matutinos',
      completed: true,
      priority: 'medium',
      dueDate: new Date(2024, 0, 16),
      category: 'Hábitos'
    },
    {
      id: '3',
      title: 'Análisis financiero semanal',
      completed: false,
      priority: 'low',
      dueDate: new Date(2024, 0, 18),
      category: 'Finanzas'
    },
    {
      id: '4',
      title: 'Leer 30 minutos',
      completed: false,
      priority: 'medium',
      category: 'Desarrollo Personal'
    },
    {
      id: '5',
      title: 'Ejercicio matutino',
      completed: true,
      priority: 'high',
      category: 'Salud'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return <Calendar size={12} />;
      case 'task': return <CheckCircle size={12} />;
      case 'reminder': return <Bell size={12} />;
      case 'personal': return <Star size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Calendar size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Calendario</h1>
              <p className="text-white/80 mt-2">Organiza tu tiempo y mantén el control de tus actividades</p>
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2">
            <Plus size={20} />
            Nuevo Evento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendario Principal */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow">
          {/* Controles del calendario */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-[#1F2937]">
                  {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setView('month')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    view === 'month' ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mes
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    view === 'week' ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    view === 'day' ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Día
                </button>
              </div>
            </div>
          </div>

          {/* Calendario */}
          <div className="p-6">
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                const isSelected = selectedDate.toDateString() === day.date.toDateString();
                const isToday = new Date().toDateString() === day.date.toDateString();
                
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={`min-h-[80px] p-2 border border-gray-100 cursor-pointer transition ${
                      isSelected ? 'bg-[#2563EB] text-white' : 
                      isToday ? 'bg-blue-50 border-blue-200' : 
                      day.isCurrentMonth ? 'hover:bg-gray-50' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {day.date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${
                            isSelected ? 'bg-white/20' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className={`text-xs ${
                          isSelected ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          +{dayEvents.length - 2} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Fecha seleccionada */}
          <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4">
              {formatDate(selectedDate)}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getEventTypeIcon(event.type)}
                          <h4 className="font-medium text-[#1F2937] text-sm">{event.title}</h4>
                        </div>
                        <p className="text-gray-500 text-xs">{event.time}</p>
                        {event.description && (
                          <p className="text-gray-600 text-xs mt-1">{event.description}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay eventos programados para este día</p>
            )}
            
            <button className="w-full mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2">
              <Plus size={16} />
              Agregar Evento
            </button>
          </div>

          {/* Lista de tareas */}
          <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1F2937]">Tareas Pendientes</h3>
              <button className="text-[#2563EB] hover:text-[#1D4ED8] transition">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {tasks.filter(task => !task.completed).map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <button className={`w-5 h-5 rounded border-2 transition ${
                    task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'
                  }`}>
                    {task.completed && <CheckCircle size={16} className="text-white" />}
                  </button>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-[#1F2937]'
                    }`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{task.category}</span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-500">
                          • {task.dueDate.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notas rápidas */}
          <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1F2937]">Notas Rápidas</h3>
              <button className="text-[#2563EB] hover:text-[#1D4ED8] transition">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">Recordar programar reunión con MentorX para revisar objetivos</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">Preparar presentación para el proyecto de automatización</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">Comprar libros recomendados por el Mentor de Aprendizaje</p>
              </div>
            </div>
            
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Agregar Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 