"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Menu, 
  X, 
  Home,
  BookOpen,
  Users,
  Zap,
  Brain,
  Calendar,
  BarChart3,
  CheckSquare,
  MessageSquare,
  FileText,
  Bot,
  Search,
  Settings,
  ChevronRight
} from 'lucide-react';

// Type definitions
type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: string;
};

type CategoryType = 'principal' | 'herramientas' | 'productividad' | 'agentes' | 'admin';

type GroupedItems = {
  [key in CategoryType]?: NavItem[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: '/', label: 'Inicio', icon: Home, category: 'principal' },
    { href: '/ebooks', label: 'Ebooks', icon: BookOpen, category: 'principal' },
    { href: '/agentes', label: 'Mi Panel de Agentes', icon: Users, category: 'herramientas' },
    { href: '/automatizaciones', label: 'Automatizaciones', icon: Zap, category: 'herramientas' },
    { href: '/mentor', label: 'MentorX', icon: Brain, category: 'herramientas' },
    { href: '/calendario', label: 'Calendario', icon: Calendar, category: 'productividad' },
    { href: '/reportes', label: 'Reportes', icon: BarChart3, category: 'productividad' },
    { href: '/tareas', label: 'Tareas', icon: CheckSquare, category: 'productividad' },
    { href: '/comunicaciones', label: 'Comunicaciones', icon: MessageSquare, category: 'productividad' },
    { href: '/documentos', label: 'Documentos y Archivos', icon: FileText, category: 'productividad' },
    { href: '/agentes/automatizador', label: 'AutomatizadorX', icon: Bot, category: 'agentes' },
    { href: '/agentes/websearch', label: 'WebSearch GPT', icon: Search, category: 'agentes' },
    { href: '/admin', label: 'Panel de Administración', icon: Settings, category: 'admin' },
  ];

  const categories: Record<CategoryType, string> = {
    principal: 'Principal',
    herramientas: 'Herramientas IA',
    productividad: 'Productividad',
    agentes: 'Agentes Especiales',
    admin: 'Administración'
  };

  const groupedItems: GroupedItems = navItems.reduce((acc, item) => {
    const category = item.category as CategoryType;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category]!.push(item);
    return acc;
  }, {} as GroupedItems);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col z-40
        transform transition-all duration-300 ease-in-out backdrop-blur-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-72 shadow-2xl border-r border-white/10
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between md:justify-center px-6 py-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold">E</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Emprendox
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-2">
              {/* Category Header */}
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 mb-3">
                {categories[category as CategoryType]}
              </h3>
              
              {/* Category Items */}
              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 shadow-lg'
                          : 'hover:bg-white/10 text-white/80 hover:text-white hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          size={18} 
                          className={`transition-colors duration-200 ${
                            isActive 
                              ? 'text-blue-400' 
                              : 'text-white/60 group-hover:text-white'
                          }`} 
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                      
                      {!isActive && (
                        <ChevronRight 
                          size={14} 
                          className="text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200" 
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center space-x-3 text-white/60 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Sistema activo</span>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-white\\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}