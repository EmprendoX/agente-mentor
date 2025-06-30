"use client";

import { useState } from 'react';
import { 
  FileText, FileSpreadsheet, Image, Video, 
  File, Folder, Download, Eye, Share2,
  Search, Filter, Grid, List, MoreVertical,
  Star, Clock, Users, Lock, Globe,
  Calendar, Tag, Archive, Trash2
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'image' | 'video' | 'document' | 'presentation' | 'audio';
  size: string;
  date: Date;
  tags: string[];
  isImportant: boolean;
  isShared: boolean;
  isRecent: boolean;
  description?: string;
}

export default function DocumentosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'excel' | 'image' | 'video' | 'document' | 'presentation' | 'audio'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const documents: Document[] = [
    {
      id: '1',
      name: 'Plan de Negocio 2024',
      type: 'pdf',
      size: '2.4 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      tags: ['Importante', 'Estratégico'],
      isImportant: true,
      isShared: true,
      isRecent: true,
      description: 'Plan estratégico completo para el año 2024'
    },
    {
      id: '2',
      name: 'Reporte Financiero Q4',
      type: 'excel',
      size: '1.8 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      tags: ['Finanzas', 'Reporte'],
      isImportant: true,
      isShared: false,
      isRecent: true,
      description: 'Análisis financiero del cuarto trimestre'
    },
    {
      id: '3',
      name: 'Presentación Cliente ABC',
      type: 'presentation',
      size: '5.2 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      tags: ['Presentación', 'Cliente'],
      isImportant: false,
      isShared: true,
      isRecent: true,
      description: 'Presentación para reunión con cliente ABC'
    },
    {
      id: '4',
      name: 'Logo Empresa - Vector',
      type: 'image',
      size: '856 KB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      tags: ['Branding', 'Logo'],
      isImportant: true,
      isShared: false,
      isRecent: false,
      description: 'Logo corporativo en formato vectorial'
    },
    {
      id: '5',
      name: 'Tutorial Producto X',
      type: 'video',
      size: '45.2 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      tags: ['Tutorial', 'Producto'],
      isImportant: false,
      isShared: true,
      isRecent: true,
      description: 'Video tutorial del nuevo producto'
    },
    {
      id: '6',
      name: 'Contrato Proveedor XYZ',
      type: 'pdf',
      size: '3.1 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      tags: ['Legal', 'Contrato'],
      isImportant: true,
      isShared: false,
      isRecent: false,
      description: 'Contrato de servicios con proveedor'
    },
    {
      id: '7',
      name: 'Análisis de Mercado',
      type: 'excel',
      size: '2.7 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      tags: ['Mercado', 'Análisis'],
      isImportant: false,
      isShared: true,
      isRecent: false,
      description: 'Estudio completo del mercado objetivo'
    },
    {
      id: '8',
      name: 'Fotos Evento Lanzamiento',
      type: 'image',
      size: '12.4 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      tags: ['Evento', 'Marketing'],
      isImportant: false,
      isShared: true,
      isRecent: true,
      description: 'Galería de fotos del evento de lanzamiento'
    },
    {
      id: '9',
      name: 'Notas Reunión Equipo',
      type: 'document',
      size: '245 KB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      tags: ['Reunión', 'Notas'],
      isImportant: false,
      isShared: true,
      isRecent: true,
      description: 'Minutas de la última reunión de equipo'
    },
    {
      id: '10',
      name: 'Podcast Entrevista CEO',
      type: 'audio',
      size: '28.7 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
      tags: ['Podcast', 'Entrevista'],
      isImportant: false,
      isShared: false,
      isRecent: true,
      description: 'Entrevista del CEO en podcast empresarial'
    },
    {
      id: '11',
      name: 'Manual de Usuario',
      type: 'pdf',
      size: '8.9 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
      tags: ['Manual', 'Usuario'],
      isImportant: true,
      isShared: true,
      isRecent: false,
      description: 'Manual completo para usuarios finales'
    },
    {
      id: '12',
      name: 'Dashboard Ventas',
      type: 'excel',
      size: '1.2 MB',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      tags: ['Ventas', 'Dashboard'],
      isImportant: true,
      isShared: false,
      isRecent: false,
      description: 'Dashboard interactivo de ventas'
    }
  ];

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf': return <FileText size={24} className="text-red-500" />;
      case 'excel': return <FileSpreadsheet size={24} className="text-green-500" />;
      case 'image': return <Image size={24} className="text-blue-500" />;
      case 'video': return <Video size={24} className="text-purple-500" />;
      case 'audio': return <File size={24} className="text-orange-500" />;
      case 'presentation': return <FileText size={24} className="text-yellow-500" />;
      case 'document': return <FileText size={24} className="text-gray-500" />;
      default: return <File size={24} className="text-gray-400" />;
    }
  };

  const getFileTypeLabel = (type: Document['type']) => {
    switch (type) {
      case 'pdf': return 'PDF';
      case 'excel': return 'Excel';
      case 'image': return 'Imagen';
      case 'video': return 'Video';
      case 'audio': return 'Audio';
      case 'presentation': return 'Presentación';
      case 'document': return 'Documento';
      default: return 'Archivo';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Documentos y Archivos</h1>
            <p className="text-sm mt-2 text-white/80">Gestiona y organiza todos tus archivos importantes</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Folder size={20} />
              <span>{documents.length} archivos</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              <File size={16} className="inline mr-2" />
              Subir Archivo
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              <option value="all">Todos los tipos</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="presentation">Presentaciones</option>
              <option value="document">Documentos</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter size={16} />
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 transition ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 transition ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de documentos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden">
              {/* Header de la tarjeta */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1F2937] truncate">{doc.name}</h3>
                      <p className="text-xs text-gray-500">{getFileTypeLabel(doc.type)} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {doc.isImportant && <Star size={14} className="text-yellow-500 fill-current" />}
                    {doc.isShared && <Share2 size={14} className="text-blue-500" />}
                    <button className="text-gray-400 hover:text-gray-600 transition">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-4">
                {doc.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
                )}
                
                {/* Etiquetas */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {doc.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Fecha */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar size={12} />
                  <span>{doc.date.toLocaleDateString()}</span>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition flex items-center justify-center gap-1">
                    <Eye size={14} />
                    Ver
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamaño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Etiquetas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[#1F2937]">{doc.name}</div>
                          {doc.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{doc.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getFileTypeLabel(doc.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 transition" title="Ver">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition" title="Descargar">
                          <Download size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition" title="Compartir">
                          <Share2 size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition" title="Más opciones">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-xl shadow p-12 text-center">
          <File size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron documentos</h3>
          <p className="text-gray-500">Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
} 