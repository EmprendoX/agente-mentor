"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Clock, 
  User, 
  Star,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface Ebook {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  category: string;
  rating: number;
  readTime: string;
  downloads: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export default function EbooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const ebooks: Ebook[] = [
    {
      id: '1',
      title: 'Accede al Mercado de Bienes Raíces Más Rentable del Mundo',
      slug: 'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo',
      author: 'Agente Mentor',
      description: 'Descubre las estrategias más efectivas para invertir en el mercado inmobiliario más rentable del mundo.',
      coverImage: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.png',
      pdfUrl: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.pdf',
      category: 'Inversiones',
      rating: 4.8,
      readTime: '45 min',
      downloads: 1247,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Cómo Hacer que Extraños Compren tu Propiedad',
      slug: 'como-hacer-que-extranos-compren-tu-propiedad',
      author: 'Agente Mentor',
      description: 'Técnicas probadas para vender propiedades rápidamente a compradores que no conoces.',
      coverImage: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.png',
      pdfUrl: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.pdf',
      category: 'Ventas',
      rating: 4.9,
      readTime: '60 min',
      downloads: 2156,
      isNew: true
    },
    {
      id: '3',
      title: 'Educación con Sentido',
      slug: 'educacion-con-sentido',
      author: 'Agente Mentor',
      description: 'Transforma tu enfoque educativo con metodologías que realmente funcionan.',
      coverImage: '/ebooks/educacion-con-sentido/portada.png',
      pdfUrl: '/ebooks/educacion-con-sentido/educacion-con-sentido.pdf',
      category: 'Educación',
      rating: 4.7,
      readTime: '30 min',
      downloads: 892
    },
    {
      id: '4',
      title: 'Guía de Preventas Inmobiliarias',
      slug: 'guia-preventas-inmobiliarias',
      author: 'Agente Mentor',
      description: 'Todo lo que necesitas saber sobre preventas inmobiliarias exitosas.',
      coverImage: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.png',
      pdfUrl: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.pdf',
      category: 'Inversiones',
      rating: 4.6,
      readTime: '40 min',
      downloads: 1567
    },
    {
      id: '5',
      title: 'How to Turn Strangers into Buyers - Real Estate',
      slug: 'how-to-turn-strangers-into-buyers-real-estate',
      author: 'Agente Mentor',
      description: 'English version: Proven techniques to sell properties quickly to unknown buyers.',
      coverImage: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.png',
      pdfUrl: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.pdf',
      category: 'Ventas',
      rating: 4.8,
      readTime: '55 min',
      downloads: 943
    },
    {
      id: '6',
      title: 'Más Leads, Más Ventas',
      slug: 'mas-leads-mas-ventas',
      author: 'Agente Mentor',
      description: 'Estrategias efectivas para generar más leads y aumentar tus ventas.',
      coverImage: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.png',
      pdfUrl: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.pdf',
      category: 'Marketing',
      rating: 4.7,
      readTime: '35 min',
      downloads: 1789
    },
    {
      id: '7',
      title: 'More Leads eBook',
      slug: 'more-leads-ebook',
      author: 'Agente Mentor',
      description: 'English version: Effective strategies to generate more leads and increase your sales.',
      coverImage: '/ebooks/More-Leads-eBook/More-Leads-eBook.png',
      pdfUrl: '/ebooks/More-Leads-eBook/More-Leads-eBook.pdf',
      category: 'Marketing',
      rating: 4.6,
      readTime: '40 min',
      downloads: 1123
    },
    {
      id: '8',
      title: 'The Product Lab',
      slug: 'the-product-lab',
      author: 'Agente Mentor',
      description: 'English version: Master the art of product development and market validation.',
      coverImage: '/ebooks/the-product-lab/The-Product-Lab-eBook.png',
      pdfUrl: '/ebooks/the-product-lab/The-Product-Lab-eBook.pdf',
      category: 'Emprendimiento',
      rating: 4.9,
      readTime: '50 min',
      downloads: 1345,
      isFeatured: true
    }
  ];

  const categories = ['all', 'Inversiones', 'Ventas', 'Marketing', 'Educación', 'Emprendimiento'];

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Inversiones': return 'bg-blue-100 text-blue-800';
      case 'Ventas': return 'bg-green-100 text-green-800';
      case 'Marketing': return 'bg-purple-100 text-purple-800';
      case 'Educación': return 'bg-yellow-100 text-yellow-800';
      case 'Emprendimiento': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen size={32} />
              Biblioteca de eBooks
            </h1>
            <p className="text-lg mt-2 text-white/80">
              Descubre conocimiento valioso para impulsar tu éxito empresarial
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{ebooks.length}</div>
            <div className="text-sm text-white/80">eBooks disponibles</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eBooks por título, descripción o autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-3 transition ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-3 transition ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredEbooks.length} de {ebooks.length} eBooks
      </div>

      {/* eBooks Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'space-y-4'
      }>
        {filteredEbooks.map((ebook) => (
          <div
            key={ebook.id}
            className={`bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Cover Image */}
            <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
              <div className="relative">
                <img
                  src={ebook.coverImage}
                  alt={ebook.title}
                  className={`w-full object-cover ${
                    viewMode === 'list' ? 'h-48' : 'h-64'
                  }`}
                />
                {ebook.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Nuevo
                  </div>
                )}
                {ebook.isFeatured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Destacado
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(ebook.category)}`}>
                  {ebook.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs text-gray-600">{ebook.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-lg text-[#1F2937] mb-2 line-clamp-2">
                {ebook.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {ebook.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{ebook.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{ebook.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download size={14} />
                  <span>{ebook.downloads.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/ebook/${ebook.slug}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Leer
                </Link>
                <a
                  href={ebook.pdfUrl}
                  download
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  <Download size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEbooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron eBooks
          </h3>
          <p className="text-gray-500">
            Intenta ajustar tus filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
} 