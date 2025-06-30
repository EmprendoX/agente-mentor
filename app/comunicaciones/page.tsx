"use client";

import { useState } from 'react';
import {
  MessageCircle, Phone, Video, Users, Mail, Plus, Search, Filter, MoreVertical, Send, Paperclip,
  Mic, Camera, Smile, Clock, CheckCircle, AlertCircle, UserPlus, Settings, Archive, Star, Edit, Trash2, Volume2, VolumeX
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  tags: string[];
  lastContact: Date;
}

interface Channel {
  id: string;
  name: string;
  type: 'whatsapp' | 'chat' | 'zoom' | 'call' | 'email';
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: Date;
  participants: string[];
  isActive: boolean;
}

export default function ComunicacionesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'whatsapp' | 'chat' | 'zoom' | 'call' | 'email'>('all');

  const channels: Channel[] = [
    {
      id: '1',
      name: 'WhatsApp Business',
      type: 'whatsapp',
      unreadCount: 3,
      lastMessage: 'Perfecto, envíame la propuesta final',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      participants: ['Cliente Premium', 'Equipo Ventas'],
      isActive: true
    },
    {
      id: '2',
      name: 'Chat Interno',
      type: 'chat',
      unreadCount: 0,
      lastMessage: 'Reunión de equipo mañana a las 10am',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 120),
      participants: ['Todo el equipo'],
      isActive: true
    },
    {
      id: '3',
      name: 'Zoom - Cliente ABC',
      type: 'zoom',
      unreadCount: 1,
      lastMessage: 'Presentación de resultados',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 45),
      participants: ['Cliente ABC', 'Equipo Técnico'],
      isActive: false
    },
    {
      id: '4',
      name: 'Llamada - Proveedor',
      type: 'call',
      unreadCount: 0,
      lastMessage: 'Confirmación de entrega',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 180),
      participants: ['Proveedor XYZ'],
      isActive: false
    },
    {
      id: '5',
      name: 'Email - Newsletter',
      type: 'email',
      unreadCount: 12,
      lastMessage: 'Nuevas oportunidades de negocio',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
      participants: ['Lista de suscriptores'],
      isActive: false
    }
  ];

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'María González',
      role: 'CEO',
      email: 'maria@empresa.com',
      phone: '+1 555-0123',
      avatar: 'MG',
      status: 'online',
      tags: ['Ejecutivo', 'Cliente Premium'],
      lastContact: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      role: 'Director de Marketing',
      email: 'carlos@empresa.com',
      phone: '+1 555-0124',
      avatar: 'CR',
      status: 'busy',
      tags: ['Marketing', 'Estratégico'],
      lastContact: new Date(Date.now() - 1000 * 60 * 120)
    },
    {
      id: '3',
      name: 'Ana Martínez',
      role: 'Desarrolladora Senior',
      email: 'ana@empresa.com',
      phone: '+1 555-0125',
      avatar: 'AM',
      status: 'away',
      tags: ['Técnico', 'Desarrollo'],
      lastContact: new Date(Date.now() - 1000 * 60 * 240)
    },
    {
      id: '4',
      name: 'Luis Pérez',
      role: 'Ventas',
      email: 'luis@empresa.com',
      phone: '+1 555-0126',
      avatar: 'LP',
      status: 'online',
      tags: ['Ventas', 'Cliente'],
      lastContact: new Date(Date.now() - 1000 * 60 * 90)
    },
    {
      id: '5',
      name: 'Sofia Torres',
      role: 'Diseñadora UX',
      email: 'sofia@empresa.com',
      phone: '+1 555-0127',
      avatar: 'ST',
      status: 'offline',
      tags: ['Diseño', 'UX/UI'],
      lastContact: new Date(Date.now() - 1000 * 60 * 360)
    }
  ];

  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'whatsapp': return <MessageCircle size={20} className="text-green-500" />;
      case 'chat': return <MessageCircle size={20} className="text-blue-500" />;
      case 'zoom': return <Video size={20} className="text-purple-500" />;
      case 'call': return <Phone size={20} className="text-red-500" />;
      case 'email': return <Mail size={20} className="text-orange-500" />;
      default: return <MessageCircle size={20} />;
    }
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const filteredChannels = channels.filter(channel => 
    filterType === 'all' || channel.type === filterType
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Enviando mensaje:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Centro de Comunicaciones</h1>
            <p className="text-sm mt-2 text-white/80">Gestiona todas tus comunicaciones desde un solo lugar</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Users size={20} />
              <span>{contacts.length} contactos</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              <UserPlus size={16} className="inline mr-2" />
              Nuevo Contacto
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Canales Activos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filtros */}
          <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar en conversaciones..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="all">Todos los canales</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="chat">Chat</option>
                  <option value="zoom">Zoom</option>
                  <option value="call">Llamadas</option>
                  <option value="email">Email</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Canales */}
          <div className="bg-white border border-gray-100 rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-[#1F2937]">Canales Activos</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                    selectedChannel === channel.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getChannelIcon(channel.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[#1F2937]">{channel.name}</h4>
                          {channel.isActive && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{channel.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {channel.participants.join(', ')} • {channel.lastMessageTime.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {channel.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {channel.unreadCount}
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 transition">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Área de Chat */}
          {selectedChannel && (
            <div className="bg-white border border-gray-100 rounded-xl shadow">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getChannelIcon(channels.find(c => c.id === selectedChannel)?.type || 'chat')}
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">
                        {channels.find(c => c.id === selectedChannel)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {channels.find(c => c.id === selectedChannel)?.participants.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <Video size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mensajes */}
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-sm">Hola, ¿cómo va todo?</p>
                    <p className="text-xs opacity-75 mt-1">10:30 AM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-sm">Todo bien, gracias. ¿Y tú?</p>
                    <p className="text-xs opacity-75 mt-1">10:32 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-sm">Perfecto, envíame la propuesta final</p>
                    <p className="text-xs opacity-75 mt-1">10:35 AM</p>
                  </div>
                </div>
              </div>

              {/* Input de Mensaje */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <Paperclip size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <Smile size={16} />
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                    <Mic size={16} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Directorio de Contactos */}
        <div className="space-y-6">
          {/* Búsqueda de Contactos */}
          <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar contactos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Lista de Contactos */}
          <div className="bg-white border border-gray-100 rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-[#1F2937]">Directorio de Contactos</h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {contact.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1F2937]">{contact.name}</h4>
                      <p className="text-sm text-gray-500">{contact.role}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition" title="Llamar">
                        <Phone size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition" title="WhatsApp">
                        <MessageCircle size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 transition" title="Video">
                        <Video size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition" title="Más opciones">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                <MessageCircle size={16} />
                <span className="text-sm font-medium">Nuevo WhatsApp</span>
              </button>
              <button className="flex items-center gap-2 p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                <Phone size={16} />
                <span className="text-sm font-medium">Nueva Llamada</span>
              </button>
              <button className="flex items-center gap-2 p-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                <Video size={16} />
                <span className="text-sm font-medium">Nueva Reunión</span>
              </button>
              <button className="flex items-center gap-2 p-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition">
                <Mail size={16} />
                <span className="text-sm font-medium">Nuevo Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 