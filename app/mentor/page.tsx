"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Phone, Video, Mic, Send, 
  FileText, Calendar, CheckCircle, Clock, 
  Star, Paperclip, MoreVertical, User,
  Target, TrendingUp, BookOpen, DollarSign,
  ArrowRight, Plus, Search, Filter, Bot,
  Brain, Zap, Users, Activity, Shield,
  ChevronDown, X, Sparkles, Award,
  Lightbulb, TrendingDown, BarChart3,
  Settings, Download, Eye, Play
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
  type: 'text' | 'voice' | 'file';
  mentorType?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  assignedBy: string;
  estimatedTime?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
  category: string;
}

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: string;
  type: 'video' | 'voice' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
  mentor: string;
}

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  icon: any;
  color: string;
  description: string;
  isOnline: boolean;
  expertise: string[];
}

export default function MentorXPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy MentorX, tu agente de IA entrenado con las mejores mentes, biografías y conocimientos de especialistas mundiales. Estoy aquí para guiarte y conectarte con mentores especializados según tus necesidades específicas. ¿En qué área te gustaría trabajar hoy?',
      sender: 'mentor',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      mentorType: 'Principal'
    },
    {
      id: '2',
      text: 'Hola MentorX, necesito ayuda para desarrollar mi estrategia de crecimiento empresarial para el próximo trimestre',
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    },
    {
      id: '3',
      text: 'Excelente elección. Basándome en las estrategias de Peter Drucker, Gary Vaynerchuk y Jeff Bezos, te sugiero un enfoque de tres pilares: 1) Análisis de mercado profundo, 2) Optimización de procesos internos, 3) Estrategia de diferenciación. ¿Quieres que te conecte con el Mentor de Negocios para una sesión especializada o prefieres que elaboremos un plan inicial juntos?',
      sender: 'mentor',
      timestamp: new Date(Date.now() - 900000),
      type: 'text',
      mentorType: 'Principal'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'tasks' | 'notes' | 'files' | 'agenda' | 'specialists'>('chat');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const specialists: Specialist[] = [
    {
      id: 'business',
      name: 'Mentor de Negocios',
      specialty: 'Estrategia y Crecimiento',
      icon: TrendingUp,
      color: 'blue',
      description: 'Entrenado con Warren Buffett, Peter Drucker, Jeff Bezos',
      isOnline: true,
      expertise: ['Estrategia', 'Finanzas', 'Liderazgo', 'Escalabilidad']
    },
    {
      id: 'habits',
      name: 'Mentor de Hábitos',
      specialty: 'Productividad y Bienestar',
      icon: Target,
      color: 'green',
      description: 'Basado en James Clear, Charles Duhigg, Stephen Covey',
      isOnline: true,
      expertise: ['Hábitos', 'Productividad', 'Disciplina', 'Bienestar']
    },
    {
      id: 'learning',
      name: 'Mentor de Aprendizaje',
      specialty: 'Conocimiento y Desarrollo',
      icon: BookOpen,
      color: 'purple',
      description: 'Inspirado en Feynman, Carol Dweck, Malcolm Gladwell',
      isOnline: true,
      expertise: ['Aprendizaje', 'Memoria', 'Creatividad', 'Investigación']
    },
    {
      id: 'financial',
      name: 'Mentor Financiero',
      specialty: 'Finanzas e Inversiones',
      icon: DollarSign,
      color: 'orange',
      description: 'Conocimientos de Ray Dalio, Robert Kiyosaki, Dave Ramsey',
      isOnline: false,
      expertise: ['Inversiones', 'Presupuestos', 'Deudas', 'Patrimonio']
    },
    {
      id: 'innovation',
      name: 'Mentor de Innovación',
      specialty: 'Creatividad y Tecnología',
      icon: Lightbulb,
      color: 'yellow',
      description: 'Basado en Steve Jobs, Elon Musk, Clayton Christensen',
      isOnline: true,
      expertise: ['Innovación', 'Tecnología', 'Disruption', 'Creatividad']
    },
    {
      id: 'wellness',
      name: 'Mentor de Bienestar',
      specialty: 'Salud Mental y Física',
      icon: Activity,
      color: 'pink',
      description: 'Inspirado en Tony Robbins, Deepak Chopra, Tim Ferriss',
      isOnline: true,
      expertise: ['Mindfulness', 'Ejercicio', 'Nutrición', 'Balance']
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Análisis competitivo del mercado',
      description: 'Investigar principales competidores y identificar oportunidades de diferenciación',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000),
      assignedBy: 'MentorX',
      estimatedTime: '3 horas'
    },
    {
      id: '2',
      title: 'Implementar rutina matutina optimizada',
      description: 'Establecer hábitos matutinos basados en metodología de James Clear',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date(Date.now() + 172800000),
      assignedBy: 'Mentor de Hábitos',
      estimatedTime: '21 días'
    },
    {
      id: '3',
      title: 'Revisar portfolio de inversiones',
      description: 'Análisis mensual con estrategias de Ray Dalio',
      status: 'completed',
      priority: 'low',
      dueDate: new Date(Date.now() - 86400000),
      assignedBy: 'Mentor Financiero',
      estimatedTime: '2 horas'
    }
  ];

  const notes: Note[] = [
    {
      id: '1',
      title: 'Insights sobre liderazgo',
      content: 'Basado en conversación con Mentor de Negocios:\n\n• El liderazgo no es un título, es una influencia (John Maxwell)\n• Focus en delegar tareas operativas para concentrarse en estrategia\n• Implementar daily standups para mejor comunicación del equipo',
      date: new Date(Date.now() - 86400000),
      tags: ['liderazgo', 'gestión', 'equipos'],
      category: 'Negocios'
    },
    {
      id: '2',
      title: 'Técnicas de aprendizaje acelerado',
      content: 'Método Feynman aplicado:\n1. Elegir concepto\n2. Explicar en términos simples\n3. Identificar gaps de conocimiento\n4. Simplificar y crear analogías\n\nResultado: 40% mejora en retención de información',
      date: new Date(Date.now() - 172800000),
      tags: ['aprendizaje', 'productividad', 'memoria'],
      category: 'Desarrollo Personal'
    }
  ];

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Sesión de estrategia empresarial',
      date: new Date(Date.now() + 86400000),
      duration: '60 min',
      type: 'video',
      status: 'scheduled',
      mentor: 'Mentor de Negocios'
    },
    {
      id: '2',
      title: 'Revisión de hábitos semanales',
      date: new Date(Date.now() + 259200000),
      duration: '45 min',
      type: 'voice',
      status: 'scheduled',
      mentor: 'Mentor de Hábitos'
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
      setIsTyping(true);
      
      // Simular respuesta del mentor con typing indicator
      setTimeout(() => {
        setIsTyping(false);
        const mentorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Perfecto. Basándome en las mejores prácticas de líderes empresariales como Satya Nadella y Reed Hastings, te recomiendo implementar un enfoque ágil. ¿Te gustaría que elabore un plan detallado o prefieres que coordine una sesión especializada con el Mentor de Negocios?',
          sender: 'mentor',
          timestamp: new Date(),
          type: 'text',
          mentorType: 'Principal'
        };
        setMessages(prev => [...prev, mentorResponse]);
      }, 2000);
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-green-300';
      case 'in-progress': return 'text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300';
      case 'pending': return 'text-amber-700 bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300';
      default: return 'text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSpecialistColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="px-6 py-8 md:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header con diseño mejorado */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white rounded-2xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-32 translate-y-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                <Bot size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                  MentorX
                  <div className="flex items-center gap-2 text-lg bg-white/20 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">IA Activa</span>
                  </div>
                </h1>
                <p className="text-xl text-white/90 mt-2 max-w-2xl">
                  Tu agente de IA entrenado con las mejores mentes, biografías y especialistas mundiales
                </p>
                <div className="flex items-center gap-6 mt-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <Brain size={20} />
                    <span>Conocimiento de +500 expertos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>{specialists.length} especialistas disponibles</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-blue-300" />
                  <div>
                    <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'pending').length}</div>
                    <div className="text-sm text-white/80">Tareas pendientes</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-green-300" />
                  <div>
                    <div className="text-2xl font-bold">{meetings.filter(m => m.status === 'scheduled').length}</div>
                    <div className="text-sm text-white/80">Próximas sesiones</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-purple-300" />
                  <div>
                    <div className="text-2xl font-bold">{notes.length}</div>
                    <div className="text-sm text-white/80">Insights guardados</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-yellow-300" />
                  <div>
                    <div className="text-2xl font-bold">{specialists.filter(s => s.isOnline).length}</div>
                    <div className="text-sm text-white/80">Especialistas online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas mejoradas */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-blue-500" size={24} />
            Acciones Rápidas con IA
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200 hover:shadow-lg hover:scale-105">
              <Video className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-800">Sesión de Video</span>
              <span className="text-xs text-gray-600 text-center">Reunión cara a cara con IA</span>
            </button>
            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200 hover:shadow-lg hover:scale-105">
              <Phone className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-800">Consulta de Voz</span>
              <span className="text-xs text-gray-600 text-center">Conversación natural</span>
            </button>
            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200 hover:shadow-lg hover:scale-105">
              <Brain className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-800">Análisis Profundo</span>
              <span className="text-xs text-gray-600 text-center">Insights avanzados</span>
            </button>
            <button className="group flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 border border-orange-200 hover:shadow-lg hover:scale-105">
              <Plus className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-800">Plan Personalizado</span>
              <span className="text-xs text-gray-600 text-center">Estrategia a medida</span>
            </button>
          </div>
        </div>

        {/* Tabs mejorados */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-0 px-2">
              {[
                { id: 'chat', label: 'Chat IA', icon: MessageCircle },
                { id: 'specialists', label: 'Especialistas', icon: Users },
                { id: 'tasks', label: 'Tareas', icon: CheckCircle },
                { id: 'notes', label: 'Insights', icon: FileText },
                { id: 'agenda', label: 'Agenda', icon: Calendar },
                { id: 'files', label: 'Archivos', icon: Paperclip }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Chat Tab Mejorado */}
            {activeTab === 'chat' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Bot className="text-blue-600" size={24} />
                    <h4 className="font-bold text-gray-800">MentorX - IA Avanzada</h4>
                    <div className="flex items-center gap-1 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Online
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Entrenado con conocimientos de:</strong> Warren Buffett, Steve Jobs, Einstein, Feynman, 
                    Tim Cook, Jeff Bezos, Ray Dalio, James Clear, y +500 expertos mundiales en diferentes áreas.
                  </p>
                </div>
                
                <div className="h-96 overflow-y-auto border border-gray-200 rounded-xl p-6 space-y-4 bg-gray-50/30 backdrop-blur-sm">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md transition-all duration-300 ${
                        message.sender === 'user' ? 'order-2' : 'order-1'
                      }`}>
                        {message.sender === 'mentor' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot size={16} className="text-blue-600" />
                            <span className="text-xs font-medium text-blue-600">
                              {message.mentorType || 'MentorX'}
                            </span>
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-lg ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
                        <Bot size={16} className="text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">MentorX está pensando...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Pregunta algo a MentorX..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/70 backdrop-blur-sm transition-all"
                  />
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <Mic size={20} />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Specialists Tab */}
            {activeTab === 'specialists' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="text-blue-500" />
                    Mentores Especialistas IA
                  </h3>
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    {specialists.filter(s => s.isOnline).length} de {specialists.length} disponibles
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {specialists.map((specialist) => (
                    <div key={specialist.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${getSpecialistColor(specialist.color)} text-white shadow-lg`}>
                            <specialist.icon size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                              {specialist.name}
                              <div className={`w-2 h-2 rounded-full ${specialist.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                            </h4>
                            <p className="text-gray-600 text-sm">{specialist.specialty}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          specialist.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {specialist.isOnline ? 'Disponible' : 'Ocupado'}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {specialist.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {specialist.expertise.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          disabled={!specialist.isOnline}
                          className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            specialist.isOnline 
                              ? `bg-gradient-to-r ${getSpecialistColor(specialist.color)} text-white hover:scale-105 shadow-lg`
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <MessageCircle size={16} className="inline mr-2" />
                          Consultar
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all hover:scale-105">
                          <Calendar size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Tab Mejorado */}
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <CheckCircle className="text-blue-500" />
                    Tareas Asignadas por IA
                  </h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Plus size={16} className="inline mr-2" />
                    Nueva Tarea
                  </button>
                </div>
                
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="font-bold text-gray-800">{task.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                              {task.status === 'completed' ? '✓ Completada' : 
                               task.status === 'in-progress' ? '🔄 En progreso' : '⏳ Pendiente'}
                            </span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority === 'high' ? '🔴 Alta' : 
                               task.priority === 'medium' ? '🟡 Media' : '🟢 Baja'}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">{task.description}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>Asignada por: <strong>{task.assignedBy}</strong></span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>Vence: {task.dueDate.toLocaleDateString()}</span>
                            </div>
                            {task.estimatedTime && (
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>Estimado: {task.estimatedTime}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Tab Mejorado */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Brain className="text-purple-500" />
                    Insights y Aprendizajes IA
                  </h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Plus size={16} className="inline mr-2" />
                    Nuevo Insight
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {notes.map((note) => (
                    <div key={note.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Award className="text-purple-500" size={16} />
                          <h4 className="font-bold text-gray-800">{note.title}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">
                            {note.category}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {note.date.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 whitespace-pre-line leading-relaxed">
                        {note.content}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {note.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda Tab Mejorado */}
            {activeTab === 'agenda' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="text-green-500" />
                    Agenda de Sesiones IA
                  </h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Plus size={16} className="inline mr-2" />
                    Agendar Sesión
                  </button>
                </div>
                
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${
                            meeting.type === 'video' ? 'bg-blue-100 text-blue-600' : 
                            meeting.type === 'voice' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {meeting.type === 'video' ? <Video size={20} /> :
                             meeting.type === 'voice' ? <Phone size={20} /> :
                             <MessageCircle size={20} />}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                              {meeting.title}
                              <Bot size={16} className="text-blue-500" />
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {meeting.date.toLocaleDateString()} a las {meeting.date.toLocaleTimeString()} • {meeting.duration}
                            </p>
                            <p className="text-blue-600 text-sm font-medium">
                              Con: {meeting.mentor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                            meeting.status === 'completed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {meeting.status === 'scheduled' ? '📅 Programada' :
                             meeting.status === 'completed' ? '✅ Completada' : '❌ Cancelada'}
                          </span>
                          {meeting.status === 'scheduled' && (
                            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm">
                              <Play size={14} className="inline mr-1" />
                              Unirse
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Files Tab Mejorado */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="text-indigo-500" />
                    Recursos y Archivos
                  </h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Plus size={16} className="inline mr-2" />
                    Subir Archivo
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Estrategia_Empresarial_2024.pdf', type: 'PDF', size: '3.2 MB', date: '2024-01-20', mentor: 'Mentor de Negocios' },
                    { name: 'Análisis_Hábitos_Productivos.xlsx', type: 'Excel', size: '1.8 MB', date: '2024-01-18', mentor: 'Mentor de Hábitos' },
                    { name: 'Plan_Aprendizaje_Acelerado.docx', type: 'Word', size: '1.2 MB', date: '2024-01-15', mentor: 'Mentor de Aprendizaje' },
                    { name: 'Portfolio_Inversiones.pdf', type: 'PDF', size: '2.1 MB', date: '2024-01-12', mentor: 'Mentor Financiero' }
                  ].map((file, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-100 p-3 rounded-xl">
                          <FileText className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                            {file.name}
                          </h4>
                          <p className="text-gray-600 text-xs mb-2">
                            {file.type} • {file.size}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-blue-600 mb-3">
                            <Bot size={12} />
                            <span>Generado por: {file.mentor}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-xs">
                              <Eye size={12} className="inline mr-1" />
                              Ver
                            </button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                              <Download size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conexión con especialistas mejorada */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Conectar con Especialistas IA
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specialists.filter(s => s.isOnline).map((specialist) => (
              <button 
                key={specialist.id}
                className="group flex items-center gap-3 p-4 bg-white/80 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getSpecialistColor(specialist.color)} text-white group-hover:scale-110 transition-transform`}>
                  <specialist.icon size={20} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                    {specialist.name}
                  </div>
                  <div className="text-xs text-gray-600">{specialist.specialty}</div>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ml-auto" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}