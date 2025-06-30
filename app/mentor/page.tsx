"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Phone, Video, Mic, Send, 
  FileText, Calendar, CheckCircle, Clock, 
  Star, Paperclip, MoreVertical, User,
  Target, TrendingUp, BookOpen, DollarSign,
  ArrowRight, Plus, Search, Filter
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
  type: 'text' | 'voice' | 'file';
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  assignedBy: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
}

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: string;
  type: 'video' | 'voice' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function MentorXPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu MentorX principal. Estoy aquí para guiarte y coordinar con los otros mentores especializados según tus necesidades. ¿En qué puedo ayudarte hoy?',
      sender: 'mentor',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text'
    },
    {
      id: '2',
      text: 'Hola MentorX, necesito ayuda para organizar mis objetivos de este mes',
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    },
    {
      id: '3',
      text: 'Perfecto. Veo que tienes varios objetivos importantes. Te sugiero que empecemos con una sesión de planificación estratégica. ¿Te parece bien que programemos una videollamada para mañana?',
      sender: 'mentor',
      timestamp: new Date(Date.now() - 900000),
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'tasks' | 'notes' | 'files' | 'agenda'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Definir objetivos mensuales',
      description: 'Crear lista detallada de objetivos para el mes de enero',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000),
      assignedBy: 'MentorX'
    },
    {
      id: '2',
      title: 'Revisar hábitos matutinos',
      description: 'Evaluar y ajustar rutina de mañana con Mentor de Hábitos',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date(Date.now() + 172800000),
      assignedBy: 'MentorX'
    },
    {
      id: '3',
      title: 'Análisis financiero semanal',
      description: 'Revisar gastos e ingresos con Mentor Financiero',
      status: 'completed',
      priority: 'low',
      dueDate: new Date(Date.now() - 86400000),
      assignedBy: 'MentorX'
    }
  ];

  const notes: Note[] = [
    {
      id: '1',
      title: 'Reflexiones sobre productividad',
      content: 'He notado que soy más productivo en las mañanas. Debería programar las tareas más importantes antes del mediodía.',
      date: new Date(Date.now() - 86400000),
      tags: ['productividad', 'hábitos']
    },
    {
      id: '2',
      title: 'Objetivos Q1 2024',
      content: '1. Lanzar nuevo producto\n2. Aumentar ingresos 30%\n3. Mejorar hábitos de salud',
      date: new Date(Date.now() - 172800000),
      tags: ['objetivos', 'planificación']
    }
  ];

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Sesión de planificación estratégica',
      date: new Date(Date.now() + 86400000),
      duration: '45 min',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Revisión de hábitos con Mentor de Hábitos',
      date: new Date(Date.now() + 259200000),
      duration: '30 min',
      type: 'voice',
      status: 'scheduled'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simular respuesta del mentor
      setTimeout(() => {
        const mentorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Entiendo perfectamente. Te ayudo a organizar eso. ¿Quieres que coordine con algún mentor especializado o prefieres que trabajemos juntos en esto?',
          sender: 'mentor',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, mentorResponse]);
      }, 1000);
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">MentorX</h1>
            <p className="text-white/80 mt-2">Tu mentor principal y coordinador de todos los agentes especializados</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm font-medium">Tareas pendientes: {tasks.filter(t => t.status === 'pending').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm font-medium">Próximas reuniones: {meetings.filter(m => m.status === 'scheduled').length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span className="text-sm font-medium">Notas guardadas: {notes.length}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} />
              <span className="text-sm font-medium">Mensajes: {messages.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-[#2563EB]/10 rounded-lg hover:bg-[#2563EB]/20 transition">
            <Video className="w-6 h-6 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#1F2937]">Videollamada</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition">
            <Phone className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-[#1F2937]">Llamada</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition">
            <Mic className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-[#1F2937]">Nota de voz</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-orange-500/10 rounded-lg hover:bg-orange-500/20 transition">
            <Plus className="w-6 h-6 text-orange-600" />
            <span className="text-sm font-medium text-[#1F2937]">Nueva tarea</span>
          </button>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white border border-gray-100 rounded-xl shadow">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'chat', label: 'Chat', icon: MessageCircle },
              { id: 'tasks', label: 'Tareas', icon: CheckCircle },
              { id: 'notes', label: 'Notas', icon: FileText },
              { id: 'files', label: 'Archivos', icon: Paperclip },
              { id: 'agenda', label: 'Agenda', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>MentorX</strong> es tu coordinador principal. Puedo ayudarte directamente o conectarte con mentores especializados según tus necesidades.
                </p>
              </div>
              
              <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg transition ${
                    isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic size={20} />
                </button>
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#1F2937]">Tareas Asignadas por MentorX</h3>
                <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition">
                  Nueva Tarea
                </button>
              </div>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-[#1F2937]">{task.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status === 'completed' ? 'Completada' : 
                             task.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? 'Alta' : 
                             task.priority === 'medium' ? 'Media' : 'Baja'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Asignada por: {task.assignedBy}</span>
                          <span>Vence: {task.dueDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#1F2937]">Notas y Reflexiones</h3>
                <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition">
                  Nueva Nota
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-[#1F2937]">{note.title}</h4>
                      <span className="text-xs text-gray-500">{note.date.toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 whitespace-pre-line">{note.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#1F2937]">Archivos Compartidos</h3>
                <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition">
                  Subir Archivo
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Plan_Estratégico_2024.pdf', type: 'PDF', size: '2.3 MB', date: '2024-01-15' },
                  { name: 'Análisis_Financiero.xlsx', type: 'Excel', size: '1.1 MB', date: '2024-01-10' },
                  { name: 'Objetivos_Mensuales.docx', type: 'Word', size: '856 KB', date: '2024-01-08' }
                ].map((file, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#2563EB]/10 p-2 rounded">
                        <FileText className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#1F2937] text-sm">{file.name}</h4>
                        <p className="text-gray-500 text-xs">{file.type} • {file.size} • {file.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda Tab */}
          {activeTab === 'agenda' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#1F2937]">Agenda y Reuniones</h3>
                <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition">
                  Programar Reunión
                </button>
              </div>
              
              <div className="space-y-3">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${
                          meeting.type === 'video' ? 'bg-blue-100' : 
                          meeting.type === 'voice' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {meeting.type === 'video' ? <Video className="w-5 h-5 text-blue-600" /> :
                           meeting.type === 'voice' ? <Phone className="w-5 h-5 text-green-600" /> :
                           <MessageCircle className="w-5 h-5 text-gray-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#1F2937]">{meeting.title}</h4>
                          <p className="text-gray-500 text-sm">
                            {meeting.date.toLocaleDateString()} • {meeting.duration}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {meeting.status === 'scheduled' ? 'Programada' :
                         meeting.status === 'completed' ? 'Completada' : 'Cancelada'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Atajos a otros mentores */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Conectar con Mentores Especializados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-[#1F2937]">Mentor de Hábitos</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-[#1F2937]">Mentor de Negocios</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-[#1F2937]">Mentor de Aprendizaje</span>
          </button>
          <button className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition">
            <DollarSign className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-[#1F2937]">Mentor Financiero</span>
          </button>
        </div>
      </div>
    </div>
  );
} 