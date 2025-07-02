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
  List,
  TrendingUp,
  Award,
  Sparkles
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
      case 'Inversiones': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200';
      case 'Ventas': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200';
      case 'Marketing': return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-200';
      case 'Educación': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200';
      case 'Emprendimiento': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200';
    }
  };

  const featuredEbooks = ebooks.filter(ebook => ebook.isFeatured);
  const popularEbooks = ebooks.sort((a, b) => b.downloads - a.downloads).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="px-6 py-8 md:px-8 max-w-7xl mx-auto space-y-8">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-2xl shadow-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <BookOpen size={36} />
                  </div>
                  Biblioteca de eBooks
                </h1>
                <p className="text-xl text-white/90 mb-2">
                  Descubre conocimiento valioso para impulsar tu éxito empresarial
                </p>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} />
                    <span>+{ebooks.reduce((acc, book) => acc + book.downloads, 0).toLocaleString()} descargas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={20} />
                    <span>{featuredEbooks.length} destacados</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  {ebooks.length}
                </div>
                <div className="text-lg text-white/80 mt-2">eBooks disponibles</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularEbooks.map((ebook, index) => (
              <div key={ebook.id} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={ebook.coverImage} 
                      alt={ebook.title}
                      className="w-16 h-20 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm mb-1">
                      {ebook.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Download size={12} />
                      <span>{ebook.downloads.toLocaleString()} descargas</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar eBooks por título, descripción o autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas las categorías' : category}
                    </option>
                  ))}
                </select>
                <div className="flex bg-white/50 border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-4 transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-4 transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <div className="text-gray-600 bg-white/50 px-4 py-2 rounded-lg backdrop-blur-sm">
              Mostrando <span className="font-semibold">{filteredEbooks.length}</span> de <span className="font-semibold">{ebooks.length}</span> eBooks
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-blue-600 hover:text-blue-800 bg-white/70 px-3 py-1 rounded-lg transition-colors"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>

          {/* eBooks Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }>
            {filteredEbooks.map((ebook) => (
              <div
                key={ebook.id}
                className={`group bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Cover Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      viewMode === 'list' ? 'h-48' : 'h-64'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {ebook.isNew && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      <Sparkles size={12} className="inline mr-1" />
                      Nuevo
                    </div>
                  )}
                  {ebook.isFeatured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <Award size={12} className="inline mr-1" />
                      Destacado
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(ebook.category)}`}>
                      {ebook.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < Math.floor(ebook.rating) ? "currentColor" : "none"}
                            className={i < Math.floor(ebook.rating) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">{ebook.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {ebook.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {ebook.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                      <Clock size={14} />
                      <span>{ebook.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                      <User size={14} />
                      <span>{ebook.author}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                      <Download size={14} />
                      <span>{ebook.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/ebook/${ebook.slug}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Eye size={16} />
                      Leer ahora
                    </Link>
                    <a
                      href={ebook.pdfUrl}
                      download
                      className="bg-white/70 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl hover:scale-105"
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
            <div className="text-center py-16 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={48} className="text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  No se encontraron eBooks
                </h3>
                <p className="text-gray-500 mb-6">
                  Intenta ajustar tus filtros de búsqueda o explora otras categorías
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Ver todos los eBooks
                </button>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}