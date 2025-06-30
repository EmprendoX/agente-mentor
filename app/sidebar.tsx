"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/ebooks', label: 'Ebooks' },
    { href: '/agentes', label: 'Mi Panel de Agentes' },
    { href: '/automatizaciones', label: 'Automatizaciones' },
    { href: '/mentor', label: 'MentorX' },
    { href: '/calendario', label: 'Calendario' },
    { href: '/reportes', label: 'Reportes' },
    { href: '/tareas', label: 'Tareas' },
    { href: '/comunicaciones', label: 'Comunicaciones' },
    { href: '/documentos', label: 'Documentos y Archivos' },
    { href: '/agentes/automatizador', label: 'AutomatizadorX' },
    { href: '/agentes/websearch', label: 'WebSearch GPT' },
    { href: '/admin', label: 'Panel de Administración' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2563EB] text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 h-full bg-[#2563EB] text-white flex flex-col px-6 py-6 space-y-4 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64
      `}>
        <div className="flex items-center justify-between md:justify-start mb-4">
          <h1 className="text-2xl font-bold">Emprendox</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                pathname === item.href
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
