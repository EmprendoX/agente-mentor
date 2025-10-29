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

import { useI18n } from './context/I18nProvider';

// Type definitions
type NavItem = {
  href: string;
  labelKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: string;
};

type CategoryType = 'principal' | 'herramientas' | 'productividad' | 'agentes' | 'admin';

type GroupedItems = {
  [key in CategoryType]?: NavItem[];
};

export default function Sidebar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: '/', labelKey: 'sidebar.items.home', icon: Home, category: 'principal' },
    { href: '/ebooks', labelKey: 'sidebar.items.ebooks', icon: BookOpen, category: 'principal' },
    { href: '/agentes', labelKey: 'sidebar.items.agents', icon: Users, category: 'herramientas' },
    { href: '/automatizaciones', labelKey: 'sidebar.items.automations', icon: Zap, category: 'herramientas' },
    { href: '/mentor', labelKey: 'sidebar.items.mentor', icon: Brain, category: 'herramientas' },
    { href: '/calendario', labelKey: 'sidebar.items.calendar', icon: Calendar, category: 'productividad' },
    { href: '/reportes', labelKey: 'sidebar.items.reports', icon: BarChart3, category: 'productividad' },
    { href: '/tareas', labelKey: 'sidebar.items.tasks', icon: CheckSquare, category: 'productividad' },
    { href: '/comunicaciones', labelKey: 'sidebar.items.communications', icon: MessageSquare, category: 'productividad' },
    { href: '/documentos', labelKey: 'sidebar.items.documents', icon: FileText, category: 'productividad' },
    { href: '/agentes/automatizador', labelKey: 'sidebar.items.automator', icon: Bot, category: 'agentes' },
    { href: '/agentes/websearch', labelKey: 'sidebar.items.websearch', icon: Search, category: 'agentes' },
    { href: '/admin', labelKey: 'sidebar.items.admin', icon: Settings, category: 'admin' },
  ];

  const categories: Record<CategoryType, string> = {
    principal: 'sidebar.categories.principal',
    herramientas: 'sidebar.categories.herramientas',
    productividad: 'sidebar.categories.productividad',
    agentes: 'sidebar.categories.agentes',
    admin: 'sidebar.categories.admin'
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
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange text-white p-3 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all duration-300 hover:scale-105"
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
      <aside
        className={`
        fixed md:static top-0 left-0 h-full bg-[#0b1224]/95 text-white flex flex-col z-40
        transform transition-all duration-300 ease-in-out backdrop-blur-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-72 shadow-[0_0_40px_rgba(37,99,235,0.25)] border-r border-white/10
      `}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between md:justify-center px-6 py-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-base font-semibold tracking-wider">AM</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green bg-clip-text text-transparent">
                {t('sidebar.brand')}
              </h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{t('sidebar.tagline')}</p>
            </div>
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
                {t(categories[category as CategoryType])}
              </h3>
              
              {/* Category Items */}
              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const accentColor =
                    category === 'herramientas'
                      ? 'from-brand-purple/30 to-brand-blue/30'
                      : category === 'productividad'
                        ? 'from-brand-green/25 to-brand-yellow/25'
                        : category === 'agentes'
                          ? 'from-brand-orange/30 to-brand-purple/30'
                          : category === 'admin'
                            ? 'from-brand-yellow/30 to-brand-orange/30'
                            : 'from-brand-blue/30 to-brand-green/30';

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${accentColor} text-white border border-white/15 shadow-lg`
                          : 'hover:bg-white/5 text-white/70 hover:text-white hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          size={18}
                          className={`transition-colors duration-200 ${
                            isActive
                              ? 'text-brand-yellow'
                              : 'text-white/50 group-hover:text-brand-yellow'
                          }`}
                        />
                        <span className="truncate">{t(item.labelKey)}</span>
                      </div>

                      {isActive && (
                        <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
                      )}

                      {!isActive && (
                        <ChevronRight
                          size={14}
                          className="text-white/20 group-hover:text-brand-yellow/70 group-hover:translate-x-0.5 transition-all duration-200"
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
            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            <span>{t('layout.liveAgents')}</span>
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