"use client";

import { 
  BarChart3, TrendingUp, DollarSign, FileText, 
  PieChart, Activity, Target, Clock, CheckCircle,
  Users, Mail, MessageSquare, Zap, Bot, 
  Calendar, FolderOpen, Lightbulb, Settings,
  ArrowUpRight, Download, Eye, Filter
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  status: 'available' | 'premium' | 'coming-soon';
  lastUpdated?: string;
  frequency: string;
}

export default function ReportesPage() {
  const reports: Report[] = [
    // Financieros / Contables
    {
      id: '1',
      title: 'Reporte Financiero Mensual',
      description: 'Resumen completo de ingresos, gastos y balance del mes con análisis de tendencias',
      icon: <BarChart3 size={24} />,
      category: 'Financieros',
      status: 'available',
      lastUpdated: 'Hace 2 días',
      frequency: 'Mensual'
    },
    {
      id: '2',
      title: 'Reporte de Ingresos y Egresos',
      description: 'Desglose detallado de todas las entradas y salidas de dinero con categorización',
      icon: <TrendingUp size={24} />,
      category: 'Financieros',
      status: 'available',
      lastUpdated: 'Hace 1 día',
      frequency: 'Semanal'
    },
    {
      id: '3',
      title: 'Estado de Resultados',
      description: 'Análisis de rentabilidad y margen de ganancia por período y categoría',
      icon: <PieChart size={24} />,
      category: 'Financieros',
      status: 'premium',
      lastUpdated: 'Hace 3 días',
      frequency: 'Mensual'
    },
    {
      id: '4',
      title: 'Reporte de Balance General',
      description: 'Vista completa de activos, pasivos y patrimonio neto actualizado',
      icon: <DollarSign size={24} />,
      category: 'Financieros',
      status: 'premium',
      lastUpdated: 'Hace 1 semana',
      frequency: 'Trimestral'
    },
    {
      id: '5',
      title: 'Reporte de Gastos Personales',
      description: 'Seguimiento de gastos personales y empresariales con alertas de presupuesto',
      icon: <FileText size={24} />,
      category: 'Financieros',
      status: 'available',
      lastUpdated: 'Hace 5 horas',
      frequency: 'Diario'
    },
    {
      id: '6',
      title: 'Reporte de Flujo de Efectivo',
      description: 'Análisis del movimiento de dinero y proyecciones de liquidez futura',
      icon: <Activity size={24} />,
      category: 'Financieros',
      status: 'premium',
      lastUpdated: 'Hace 2 días',
      frequency: 'Semanal'
    },

    // Productividad y tareas
    {
      id: '7',
      title: 'Reporte de Tareas Completadas',
      description: 'Estadísticas de productividad y cumplimiento de objetivos diarios y semanales',
      icon: <CheckCircle size={24} />,
      category: 'Productividad',
      status: 'available',
      lastUpdated: 'Hace 1 hora',
      frequency: 'Diario'
    },
    {
      id: '8',
      title: 'Reporte de Actividad Semanal',
      description: 'Resumen de actividades realizadas, tiempo invertido y logros alcanzados',
      icon: <Activity size={24} />,
      category: 'Productividad',
      status: 'available',
      lastUpdated: 'Hace 1 día',
      frequency: 'Semanal'
    },
    {
      id: '9',
      title: 'Reporte de Cumplimiento de Objetivos',
      description: 'Seguimiento del progreso hacia metas establecidas con métricas de éxito',
      icon: <Target size={24} />,
      category: 'Productividad',
      status: 'available',
      lastUpdated: 'Hace 3 días',
      frequency: 'Semanal'
    },
    {
      id: '10',
      title: 'Reporte de Horas Trabajadas',
      description: 'Análisis del tiempo dedicado a diferentes proyectos y actividades',
      icon: <Clock size={24} />,
      category: 'Productividad',
      status: 'premium',
      lastUpdated: 'Hace 6 horas',
      frequency: 'Diario'
    },
    {
      id: '11',
      title: 'Reporte de Seguimiento de Proyectos',
      description: 'Estado actual de todos los proyectos con hitos y fechas de entrega',
      icon: <FolderOpen size={24} />,
      category: 'Productividad',
      status: 'available',
      lastUpdated: 'Hace 2 días',
      frequency: 'Semanal'
    },

    // Marketing y comunicación
    {
      id: '12',
      title: 'Reporte de Campañas de Marketing',
      description: 'Rendimiento de campañas publicitarias con métricas de ROI y conversión',
      icon: <TrendingUp size={24} />,
      category: 'Marketing',
      status: 'premium',
      lastUpdated: 'Hace 1 día',
      frequency: 'Semanal'
    },
    {
      id: '13',
      title: 'Reporte de Publicaciones Realizadas',
      description: 'Análisis de engagement y alcance de contenido publicado en redes sociales',
      icon: <MessageSquare size={24} />,
      category: 'Marketing',
      status: 'available',
      lastUpdated: 'Hace 4 horas',
      frequency: 'Diario'
    },
    {
      id: '14',
      title: 'Reporte de Apertura de Correos',
      description: 'Estadísticas de email marketing con tasas de apertura y clics',
      icon: <Mail size={24} />,
      category: 'Marketing',
      status: 'available',
      lastUpdated: 'Hace 1 día',
      frequency: 'Semanal'
    },
    {
      id: '15',
      title: 'Reporte de Interacciones con Clientes',
      description: 'Análisis de comunicación y satisfacción del cliente con métricas de servicio',
      icon: <Users size={24} />,
      category: 'Marketing',
      status: 'premium',
      lastUpdated: 'Hace 2 días',
      frequency: 'Semanal'
    },

    // Automatizaciones y sistema
    {
      id: '16',
      title: 'Reporte de Automatizaciones Ejecutadas',
      description: 'Estadísticas de procesos automatizados y ahorro de tiempo generado',
      icon: <Zap size={24} />,
      category: 'Automatizaciones',
      status: 'available',
      lastUpdated: 'Hace 30 minutos',
      frequency: 'Diario'
    },
    {
      id: '17',
      title: 'Reporte de Agentes Activos',
      description: 'Estado y rendimiento de todos los agentes AI configurados en el sistema',
      icon: <Bot size={24} />,
      category: 'Automatizaciones',
      status: 'available',
      lastUpdated: 'Hace 1 hora',
      frequency: 'Diario'
    },
    {
      id: '18',
      title: 'Reporte de Resúmenes Generados',
      description: 'Estadísticas de documentos y contenido procesado por los agentes AI',
      icon: <FileText size={24} />,
      category: 'Automatizaciones',
      status: 'premium',
      lastUpdated: 'Hace 2 horas',
      frequency: 'Semanal'
    },
    {
      id: '19',
      title: 'Reporte de Eventos Agendados',
      description: 'Resumen de citas, reuniones y eventos programados con recordatorios',
      icon: <Calendar size={24} />,
      category: 'Automatizaciones',
      status: 'available',
      lastUpdated: 'Hace 1 día',
      frequency: 'Diario'
    },
    {
      id: '20',
      title: 'Reporte de Documentos Recientes',
      description: 'Análisis de documentos creados, modificados y compartidos recientemente',
      icon: <FolderOpen size={24} />,
      category: 'Automatizaciones',
      status: 'available',
      lastUpdated: 'Hace 3 horas',
      frequency: 'Diario'
    }
  ];

  const categories = [
    { name: 'Financieros', icon: <DollarSign size={20} />, color: 'bg-green-100 text-green-800' },
    { name: 'Productividad', icon: <Target size={20} />, color: 'bg-blue-100 text-blue-800' },
    { name: 'Marketing', icon: <TrendingUp size={20} />, color: 'bg-purple-100 text-purple-800' },
    { name: 'Automatizaciones', icon: <Zap size={20} />, color: 'bg-orange-100 text-orange-800' }
  ];

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'premium': return 'Premium';
      case 'coming-soon': return 'Próximamente';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <BarChart3 size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Reportes</h1>
              <p className="text-white/80 mt-2">Análisis detallado y métricas de rendimiento de tu negocio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
              <Filter size={16} />
              Filtrar
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
              <Download size={16} />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.name} className="bg-white border border-gray-100 rounded-xl shadow p-4 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${category.color}`}>
                {category.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937]">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {reports.filter(r => r.category === category.name).length} reportes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-lg transition group">
            <div className="p-6">
              {/* Header de la tarjeta */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition">
                    {report.icon}
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition opacity-0 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Contenido */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#2563EB] transition">
                  {report.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {report.description}
                </p>

                {/* Metadatos */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {report.frequency}
                      </span>
                      {report.lastUpdated && (
                        <span>Actualizado {report.lastUpdated}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition" title="Ver reporte">
                        <Eye size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition" title="Descargar">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Reportes Destacados */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1F2937]">Reportes Destacados</h2>
            <p className="text-gray-600 mt-2">Los reportes más consultados y útiles para tu negocio</p>
          </div>
          <button className="bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-[#1D4ED8] transition flex items-center gap-2">
            <Lightbulb size={16} />
            Ver Todos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-200 text-green-700 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Reporte Financiero Mensual</h3>
                <p className="text-sm text-green-600">Más consultado este mes</p>
              </div>
            </div>
            <p className="text-sm text-green-700 mb-4">
              Análisis completo de la salud financiera de tu negocio con recomendaciones personalizadas.
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
              Generar Reporte
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-200 text-blue-700 rounded-lg">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Reporte de Productividad</h3>
                <p className="text-sm text-blue-600">Nuevo este mes</p>
              </div>
            </div>
            <p className="text-sm text-blue-700 mb-4">
              Optimiza tu tiempo y mejora tu eficiencia con análisis detallado de tus actividades.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              Generar Reporte
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-200 text-purple-700 rounded-lg">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-purple-800">Reporte de Automatizaciones</h3>
                <p className="text-sm text-purple-600">Ahorro de tiempo</p>
              </div>
            </div>
            <p className="text-sm text-purple-700 mb-4">
              Descubre cuánto tiempo te están ahorrando tus automatizaciones y agentes AI.
            </p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium">
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 