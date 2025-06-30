"use client";

import { useState } from 'react';
import { 
  Users, UserPlus, UserMinus, Shield, 
  Settings, Search, Filter, MoreVertical,
  Mail, Calendar, Eye, Edit, Trash2,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: Date;
  status: 'active' | 'inactive' | 'pending';
  assignedAgents: string[];
  tools: string[];
  lastLogin?: Date;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      registrationDate: new Date('2024-01-15'),
      status: 'active',
      assignedAgents: ['Mentor Finanzas', 'Coach Emprendimiento'],
      tools: ['Sistema de Notas', 'Reportes Personalizados'],
      lastLogin: new Date('2024-01-28')
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      registrationDate: new Date('2024-01-20'),
      status: 'active',
      assignedAgents: ['Mentor Marketing Digital'],
      tools: ['Sistema de Notas'],
      lastLogin: new Date('2024-01-27')
    },
    {
      id: '3',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      registrationDate: new Date('2024-01-25'),
      status: 'pending',
      assignedAgents: [],
      tools: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const availableAgents = [
    'Mentor Finanzas',
    'Coach Emprendimiento', 
    'Mentor Marketing Digital',
    'Especialista en Ventas',
    'Consultor de Negocios'
  ];

  const availableTools = [
    'Sistema de Notas',
    'Reportes Personalizados',
    'Análisis de Mercado',
    'Herramientas de Productividad',
    'Chat Avanzado'
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const assignAgent = (userId: string, agent: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, assignedAgents: [...user.assignedAgents, agent] }
        : user
    ));
  };

  const removeAgent = (userId: string, agent: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, assignedAgents: user.assignedAgents.filter(a => a !== agent) }
        : user
    ));
  };

  const addTool = (userId: string, tool: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, tools: [...user.tools, tool] }
        : user
    ));
  };

  const removeTool = (userId: string, tool: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, tools: user.tools.filter(t => t !== tool) }
        : user
    ));
  };

  const updateUserStatus = (userId: string, status: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'inactive': return <XCircle size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-10">
      {/* Header azul con el mismo estilo de la plataforma */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-sm mt-2 text-white/80">Gestiona usuarios, agentes y accesos de la plataforma</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Users size={20} />
              <span>{users.length} usuarios registrados</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              <UserPlus size={16} className="inline mr-2" />
              Nuevo Usuario
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda con el mismo estilo */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="pending">Pendientes</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios con el mismo estilo */}
      <div className="bg-white border border-gray-100 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agentes Asignados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Herramientas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-[#1F2937]">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">
                        Registrado: {user.registrationDate.toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="ml-1 capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.assignedAgents.map((agent, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800"
                        >
                          {agent}
                          <button
                            onClick={() => removeAgent(user.id, agent)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <XCircle size={12} />
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        + Agregar
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-green-100 text-green-800"
                        >
                          {tool}
                          <button
                            onClick={() => removeTool(user.id, tool)}
                            className="ml-1 text-green-600 hover:text-green-800"
                          >
                            <XCircle size={12} />
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-xs text-green-600 hover:text-green-800"
                      >
                        + Agregar
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Nunca'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Editar usuario"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className="text-yellow-600 hover:text-yellow-900 transition"
                        title={user.status === 'active' ? 'Desactivar' : 'Activar'}
                      >
                        <Shield size={16} />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 transition"
                        title="Eliminar usuario"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de gestión de usuario con el mismo estilo */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#1F2937]">Gestionar Usuario: {selectedUser.name}</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Información del Usuario */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3 text-[#1F2937]">Información del Usuario</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Nombre:</span>
                    <p className="font-medium text-[#1F2937]">{selectedUser.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium text-[#1F2937]">{selectedUser.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Estado:</span>
                    <select
                      value={selectedUser.status}
                      onChange={(e) => updateUserStatus(selectedUser.id, e.target.value as User['status'])}
                      className="ml-2 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="pending">Pendiente</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Asignar Agentes */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3 text-[#1F2937]">Asignar Agentes</h4>
                <div className="space-y-2">
                  {availableAgents.map((agent) => (
                    <div key={agent} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                      <span className="text-sm text-[#1F2937]">{agent}</span>
                      {selectedUser.assignedAgents.includes(agent) ? (
                        <button
                          onClick={() => removeAgent(selectedUser.id, agent)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                        >
                          Quitar
                        </button>
                      ) : (
                        <button
                          onClick={() => assignAgent(selectedUser.id, agent)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                        >
                          Asignar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Asignar Herramientas */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3 text-[#1F2937]">Asignar Herramientas</h4>
                <div className="space-y-2">
                  {availableTools.map((tool) => (
                    <div key={tool} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                      <span className="text-sm text-[#1F2937]">{tool}</span>
                      {selectedUser.tools.includes(tool) ? (
                        <button
                          onClick={() => removeTool(selectedUser.id, tool)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                        >
                          Quitar
                        </button>
                      ) : (
                        <button
                          onClick={() => addTool(selectedUser.id, tool)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium transition"
                        >
                          Asignar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-[#1F2937]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 