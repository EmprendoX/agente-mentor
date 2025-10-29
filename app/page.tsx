"use client";

import type { ComponentType } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Bot,
  LineChart,
  Rocket,
  Shield,
  Compass,
  Lightbulb,
  Layers,
  BarChart3,
} from 'lucide-react';

type VisionCard = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
  points?: string[];
};

type AgentSuite = {
  name: string;
  description: string;
  gradient: string;
  focuses: string[];
};

type Objective = {
  title: string;
  description: string;
  result: string;
};

const visionCards: VisionCard[] = [
  {
    title: 'Visión',
    description:
      'Construir el ecosistema líder de agentes IA en español que acompaña a emprendedores y equipos Latinoamericanos desde la ideación hasta la expansión global.',
    icon: Sparkles,
    accent: 'from-brand-blue/25 via-brand-purple/20 to-brand-blue/10',
  },
  {
    title: 'Promesa de valor',
    description:
      'Activamos decisiones estratégicas, ejecución comercial y aprendizaje continuo con agentes colaborativos que hablan el idioma del negocio.',
    icon: Rocket,
    accent: 'from-brand-green/25 via-brand-blue/20 to-brand-green/10',
    points: ['Implementaciones guiadas en menos de 30 días', 'Plantillas accionables conectadas a datos reales'],
  },
  {
    title: 'Principios operativos',
    description:
      'Cada agente combina inteligencia contextual, automatización y criterio humano para desbloquear progreso tangible semana a semana.',
    icon: Shield,
    accent: 'from-brand-orange/25 via-brand-yellow/20 to-brand-purple/10',
    points: ['Contexto de negocio primero', 'Velocidad sin perder precisión', 'Experiencia centrada en las personas'],
  },
];

const agentSuites: AgentSuite[] = [
  {
    name: 'Agente Azul · Estratega de Crecimiento',
    description: 'Define posicionamiento, narrativa y la hoja de ruta de expansión del negocio.',
    gradient: 'from-brand-blue/80 via-brand-purple/70 to-brand-blue/40',
    focuses: ['Mapas de oportunidad y visión a 12 meses', 'Diseño de propuestas de valor y lanzamientos', 'OKR y tableros de alineación'],
  },
  {
    name: 'Agente Verde · Arquitecto de Operaciones',
    description: 'Optimiza procesos, automatiza flujos y coordina tareas críticas entre equipos.',
    gradient: 'from-brand-green/80 via-brand-blue/60 to-brand-green/40',
    focuses: ['Diseño de flujos automatizados', 'Integración de herramientas y fuentes de datos', 'Playbooks de ejecución recurrente'],
  },
  {
    name: 'Agente Naranja · Catalizador Comercial',
    description: 'Activa funnels, contenido y señales de mercado para impulsar revenue predecible.',
    gradient: 'from-brand-orange/80 via-brand-yellow/70 to-brand-orange/40',
    focuses: ['Secuencias multicanal y nurturing', 'Mensajería y guiones entrenados por industria', 'Paneles de conversión en tiempo real'],
  },
  {
    name: 'Agente Morado · Diseñador de Experiencias',
    description: 'Personaliza onboarding, comunidades y recursos educativos para retener usuarios.',
    gradient: 'from-brand-purple/80 via-brand-blue/60 to-brand-purple/40',
    focuses: ['Rutas de aprendizaje y cohortes', 'Bibliotecas vivas con contenido IA', 'Feedback loops omnicanal'],
  },
  {
    name: 'Agente Amarillo · Radar de Insights',
    description: 'Analiza señales de clientes, produce reportes accionables y detecta riesgos tempranos.',
    gradient: 'from-brand-yellow/80 via-brand-green/60 to-brand-yellow/30',
    focuses: ['Inteligencia de clientes en tiempo real', 'Alertas de salud del negocio', 'Storytelling con métricas clave'],
  },
];

const objectives: Objective[] = [
  {
    title: 'Orquestar lanzamientos y experimentos continuos',
    description: 'Los agentes coordinan backlog, recursos y aprendizajes para mantener ciclos de innovación cortos.',
    result: 'Velocidad de lanzamiento 4× y mejores retroalimentaciones en cada sprint.',
  },
  {
    title: 'Escalar ventas consultivas basadas en datos',
    description: 'Unificamos inteligencia comercial con automatizaciones de seguimiento y recomendaciones contextuales.',
    result: 'Embudo siempre activo y pipeline priorizado por impacto.',
  },
  {
    title: 'Crear experiencias memorables para clientes y equipos',
    description: 'Cada interacción con Agente Mentor OS mantiene consistencia de marca y tono humano.',
    result: 'Retención sostenida, NPS creciente y equipos enfocados en decisiones estratégicas.',
  },
];

const impactHighlights = [
  { value: '4×', label: 'Velocidad de lanzamiento', color: 'text-brand-blue' },
  { value: '72%', label: 'Procesos automatizados en 60 días', color: 'text-brand-green' },
  { value: '360°', label: 'Visión del usuario final', color: 'text-brand-purple' },
];

const audiences = [
  'Founders y equipos directivos de startups y scaleups en etapa de crecimiento.',
  'Líderes de innovación corporativa que requieren pilotos ágiles y medibles.',
  'Consultoras, aceleradoras y hubs que buscan experiencias premium para sus comunidades.',
];

const journey = [
  {
    title: '1. Descubrimiento guiado',
    description: 'Diagnóstico junto al equipo para identificar retos, datos disponibles y quick wins.',
    icon: Compass,
  },
  {
    title: '2. Activación de agentes',
    description: 'Configuramos agentes prioritarios, conexiones de datos y tableros de seguimiento.',
    icon: Bot,
  },
  {
    title: '3. Escalamiento continuo',
    description: 'Medimos impacto, ampliamos automatizaciones y co-creamos nuevos casos de uso.',
    icon: LineChart,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-surface/90 via-surface/80 to-surface/60 shadow-[0_0_60px_rgba(37,99,235,0.25)]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-brand-blue/40 blur-3xl" />
          <div className="absolute -bottom-20 -right-6 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl" />
          <div className="absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 bg-gradient-to-r from-brand-orange/10 via-brand-yellow/10 to-brand-green/10 blur-2xl" />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">
                Ecosistema vivo de agentes IA
              </span>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Construimos tu Digital Workforce inteligente para operar tu negocio
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Orquestamos agentes de inteligencia artificial que piensan, aprenden y ejecutan en equipo, diseñando workflows inteligentes para cada área del negocio.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/agentes"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-brand-purple"
                >
                  Explorar agentes
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/registro"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-yellow/60 hover:text-brand-yellow"
                >
                  Solicitar demo guiada
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              {impactHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur"
                >
                  <p className={`text-3xl font-semibold ${highlight.color}`}>{highlight.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{highlight.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto grid gap-6 px-6 py-12 lg:grid-cols-3 lg:px-12">
            {visionCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${card.accent} p-6 shadow-[0_12px_40px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:border-brand-yellow/40`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-10 w-10 text-brand-yellow" />
                    <Layers className="h-8 w-8 text-white/10" />
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{card.title}</h2>
                  <p className="mt-3 text-sm text-slate-200">{card.description}</p>
                  {card.points && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-200">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative z-10 max-w-7xl mx-auto px-6 py-14 lg:px-12">
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">Suites de agentes interconectados</h2>
              <p className="mt-2 max-w-3xl text-base text-slate-300">
                Cinco agentes principales trabajan sincronizados para diagnosticar, crear, automatizar, comunicar y medir cada frente del negocio.
              </p>
            </div>
            <Link
              href="/agentes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:text-brand-orange"
            >
              Ver panel interactivo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {agentSuites.map((agent) => (
              <div
                key={agent.name}
                className={`rounded-3xl border border-white/10 bg-gradient-to-br ${agent.gradient} p-6 shadow-[0_16px_50px_rgba(15,23,42,0.45)] backdrop-blur-lg`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                  <Bot className="h-7 w-7 text-white/70" />
                </div>
                <p className="mt-3 text-sm text-slate-100/90">{agent.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-100/80">
                  {agent.focuses.map((focus) => (
                    <li key={focus} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white/70" />
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 border-t border-white/5 bg-black/25">
          <div className="max-w-7xl mx-auto grid gap-12 px-6 py-14 lg:grid-cols-[1.3fr_1fr] lg:px-12 lg:gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold text-white">Objetivos que guía Agente Mentor OS</h2>
              <div className="space-y-6">
                {objectives.map((objective) => (
                  <div key={objective.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_14px_45px_rgba(15,23,42,0.4)]">
                    <div className="flex items-start gap-4">
                      <Target className="h-6 w-6 text-brand-yellow" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">{objective.title}</h3>
                        <p className="mt-2 text-sm text-slate-200">{objective.description}</p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
                          Resultado: {objective.result}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-purple/20 via-brand-blue/10 to-brand-green/10 p-6 shadow-[0_14px_45px_rgba(15,23,42,0.35)]">
                <h3 className="text-lg font-semibold text-white">Viaje acompañado de principio a fin</h3>
                <p className="mt-2 text-sm text-slate-200">
                  Activamos una metodología en tres etapas para asegurar adopción, impacto y escalabilidad de cada agente.
                </p>
                <div className="mt-5 space-y-4">
                  {journey.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                        <Icon className="mt-1 h-5 w-5 text-brand-yellow" />
                        <div>
                          <p className="text-sm font-semibold text-white">{step.title}</p>
                          <p className="mt-1 text-xs text-slate-300">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.35)]">
                <h3 className="text-lg font-semibold text-white">Público objetivo</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {audiences.map((audience) => (
                    <li key={audience} className="flex items-start gap-2">
                      <Users className="mt-0.5 h-4 w-4 text-brand-yellow" />
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white">Una plataforma lista para implementarse</h2>
              <p className="text-base text-slate-300">
                Documentación pública, sistemas de plantillas y componentes reutilizables facilitan la entrega de experiencias personalizadas. Los agentes se conectan a herramientas existentes y aprenden con cada interacción.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <Lightbulb className="h-6 w-6 text-brand-yellow" />
                  <h3 className="mt-3 text-sm font-semibold text-white">Criterios de diseño</h3>
                  <p className="mt-2 text-xs text-slate-300">Interfaces enfocadas en claridad, ritmo narrativo y datos accionables.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <BarChart3 className="h-6 w-6 text-brand-yellow" />
                  <h3 className="mt-3 text-sm font-semibold text-white">Insights conectados</h3>
                  <p className="mt-2 text-xs text-slate-300">Reportes dinámicos que traducen señales en decisiones inmediatas.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-yellow/20 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.45)]">
              <h3 className="text-lg font-semibold text-white">Construyamos la próxima versión de tu operación con IA</h3>
              <p className="mt-3 text-sm text-slate-200">
                Agenda una sesión con nuestro equipo para mapear objetivos, agentes prioritarios y el plan de despliegue.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="mailto:hola@mentorx.mx"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-brand-yellow"
                >
                  Escribir al equipo
                </Link>
                <Link
                  href="/ebooks"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-purple/60 hover:text-brand-purple"
                >
                  Ver recursos disponibles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
