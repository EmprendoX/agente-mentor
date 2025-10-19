'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  BellRing,
  CheckCircle2,
  ClipboardList,
  MapPinned,
  MessageCircle,
  Rocket,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AgentCard } from '@/app/components/AgentCard';
import { MetricCard } from '@/app/components/MetricCard';
import { Timeline } from '@/app/components/Timeline';
import type { TimelineEvent } from '@/app/components/Timeline';
import { getBriefingAnalytics } from '@/app/lib/analytics';
import { useDashboardStore } from '@/app/store/dashboardStore';
import type { BriefingAnalyticsSnapshot, BriefingHighlight } from '@/app/types/analytics';

const mentorMap = [
  {
    cluster: 'Estrategia y Creatividad',
    lead: 'Mentor de Marketing',
    focus: 'Diseño de campañas, posicionamiento y storytelling',
    agents: ['Creativo IA', 'Investigador de Tendencias', 'Analista de Audiencias'],
  },
  {
    cluster: 'Operaciones y Automatización',
    lead: 'Agente de Automatización',
    focus: 'Optimización de procesos, flujos automatizados y eficiencia',
    agents: ['Agente de Integraciones', 'Gestor de Pipelines', 'Bot de Calidad'],
  },
  {
    cluster: 'Relación con Clientes',
    lead: 'Agente de Comunicaciones',
    focus: 'Experiencia de usuario, soporte y nurturing de leads',
    agents: ['Especialista en Feedback', 'Moderador de Comunidades', 'Asistente de Agenda'],
  },
];

const highlightStyles: Record<BriefingHighlight['impact'], string> = {
  positive: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  negative: 'border-rose-200 bg-rose-50 text-rose-700',
  neutral: 'border-slate-200 bg-slate-50 text-slate-600',
};

const formatShortDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
};

const formatRelativeTime = (value: string): string => {
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    return 'Fecha desconocida';
  }

  const diff = Date.now() - timestamp.getTime();
  const minutes = Math.round(diff / (60 * 1000));
  if (minutes < 60) {
    return `hace ${minutes} min`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} h`;
  }

  const days = Math.round(hours / 24);
  return `hace ${days} d`;
};

const mergeTrendData = (briefing: BriefingAnalyticsSnapshot | null) => {
  if (!briefing) {
    return [] as Array<{ date: string; interactions: number; decisions: number }>;
  }

  const merged = new Map<string, { date: string; interactions: number; decisions: number }>();

  briefing.trend.interactions.forEach((point) => {
    merged.set(point.date, { date: point.date, interactions: point.value, decisions: 0 });
  });

  briefing.trend.decisions.forEach((point) => {
    const current = merged.get(point.date) ?? { date: point.date, interactions: 0, decisions: 0 };
    current.decisions = point.value;
    merged.set(point.date, current);
  });

  return [...merged.values()].sort((a, b) => a.date.localeCompare(b.date));
};

export default function CoreDashboardPage() {
  const { context, agents } = useDashboardStore();
  const [briefing, setBriefing] = useState<BriefingAnalyticsSnapshot | null>(null);
  const [loadingBriefing, setLoadingBriefing] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadBriefing = async () => {
      try {
        const data = await getBriefingAnalytics();
        if (!active) {
          return;
        }

        setBriefing(data);
      } catch (error) {
        if (!active) {
          return;
        }

        setAnalyticsError(error instanceof Error ? error.message : 'No fue posible cargar la analítica.');
      } finally {
        if (active) {
          setLoadingBriefing(false);
        }
      }
    };

    void loadBriefing();

    return () => {
      active = false;
    };
  }, []);


  const trendData = useMemo(() => mergeTrendData(briefing), [briefing]);
  const alertsTrend = useMemo(
    () => briefing?.trend.alertsAcknowledged.map((point) => ({ date: point.date, alerts: point.value })) ?? [],
    [briefing],
  );

  const interactionsToday = trendData.at(-1)?.interactions ?? 0;
  const interactionsYesterday = trendData.at(-2)?.interactions ?? interactionsToday;
  const interactionsDelta = interactionsToday - interactionsYesterday;
  const decisionsToday = trendData.at(-1)?.decisions ?? 0;
  const decisionsYesterday = trendData.at(-2)?.decisions ?? decisionsToday;
  const decisionsDelta = decisionsToday - decisionsYesterday;
  const alertsResolvedToday = alertsTrend.at(-1)?.alerts ?? 0;

  const weeklyAlertsResolved = alertsTrend.reduce((acc, item) => acc + item.alerts, 0);
  const weeklyInteractions = trendData.reduce((acc, item) => acc + item.interactions, 0);

  const timelineEvents = useMemo<TimelineEvent[]>(
    () => [
      {
        id: 'event-1',
        title: 'Kick-off de campaña “Expansión Q2”',
        timestamp: '08:30 - Finalizado',
        description:
          'Se definieron objetivos, KPIs y segmentos prioritarios para la expansión en mercados hispanohablantes.',
        owner: 'Mentor de Marketing',
        icon: <Rocket className="h-4 w-4" />,
      },
      {
        id: 'event-2',
        title: 'Sincronización de bases de datos',
        timestamp: '10:15 - En progreso',
        description:
          'El Agente de Datos está limpiando y combinando registros provenientes del CRM y formularios web.',
        owner: 'Analista de Datos',
        icon: <Activity className="h-4 w-4" />,
      },
      {
        id: 'event-3',
        title: 'Revisión de guiones para outreach',
        timestamp: '12:45 - Próximo',
        description:
          'Revisión conjunta para aprobar los nuevos mensajes multicanal propuestos por el Agente de Comunicaciones.',
        owner: 'Directora de Ventas',
        icon: <MessageCircle className="h-4 w-4" />,
      },
    ],
    [],
  );

  const highlights = briefing?.highlights ?? [];
  const recentActivity = briefing?.recentActivity ?? [];

  return (
    <div className="min-h-screen bg-[#F5F1EA] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#1E3A8A] to-[#0F172A] p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                <BellRing className="h-4 w-4" /> Briefing diario
              </span>
              <h1 className="text-3xl font-semibold lg:text-4xl">Panel de coordinación del Mentor</h1>
              <p className="text-base text-white/80">
                Mantén visibilidad del estado de los agentes, canaliza las alertas críticas y coordina las acciones del día para asegurar el cumplimiento de objetivos.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-white/80">
              <p className="font-semibold text-white">Contexto operativo</p>
              <p>{context}</p>
            </div>
          </div>

          {analyticsError && (
            <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
              {analyticsError}
            </div>
          )}
        </header>

        {highlights.length > 0 && (
          <section className="grid gap-3 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={`${highlight.label}-${highlight.description}`}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${highlightStyles[highlight.impact]}`}
              >
                <p className="text-xs uppercase tracking-wide text-current/70">{highlight.label}</p>
                <p className="mt-1 text-current">{highlight.description}</p>
              </article>
            ))}
          </section>
        )}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Interacciones (24h)"
            value={briefing ? briefing.totals.interactions24h.toLocaleString('es-MX') : loadingBriefing ? '…' : '0'}
            helper={
              briefing
                ? `${interactionsDelta >= 0 ? '+' : '−'}${Math.abs(interactionsDelta)} vs ayer`
                : undefined
            }
            trend={
              interactionsDelta > 0 ? 'up' : interactionsDelta < 0 ? 'down' : 'neutral'
            }
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            label="Decisiones aceptadas (24h)"
            value={briefing ? briefing.totals.decisionsAccepted24h.toLocaleString('es-MX') : loadingBriefing ? '…' : '0'}
            helper={
              briefing
                ? `${decisionsDelta >= 0 ? '+' : '−'}${Math.abs(decisionsDelta)} vs ayer`
                : undefined
            }
            trend={
              decisionsDelta > 0 ? 'up' : decisionsDelta < 0 ? 'down' : 'neutral'
            }
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard
            label="Alertas activas"
            value={briefing ? briefing.totals.activeAlerts.toLocaleString('es-MX') : loadingBriefing ? '…' : '0'}
            helper={
              briefing
                ? alertsResolvedToday > 0
                  ? `${alertsResolvedToday} resueltas hoy`
                  : 'Sin cierres hoy'
                : undefined
            }
            trend={briefing && briefing.totals.activeAlerts === 0 ? 'up' : 'neutral'}
            icon={<AlertCircle className="h-5 w-5" />}
          />
          <MetricCard
            label="Interacciones (últimos 7 días)"
            value={briefing ? weeklyInteractions.toLocaleString('es-MX') : loadingBriefing ? '…' : '0'}
            helper={briefing ? `${trendData.length} días analizados` : undefined}
            trend={interactionsDelta > 0 ? 'up' : 'neutral'}
            icon={<ClipboardList className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Interacciones vs decisiones</h2>
                <p className="text-sm text-slate-500">Comparativa de los últimos {trendData.length || 0} días</p>
              </div>
            </div>
            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={trendData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDecisions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tickFormatter={formatShortDate} stroke="#94A3B8" />
                  <YAxis tickFormatter={(value) => value.toLocaleString('es-MX')} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: '#CBD5F5' }}
                    labelFormatter={(label) => formatShortDate(label)}
                    formatter={(value: number) => value.toLocaleString('es-MX')}
                  />
                  <Area
                    type="monotone"
                    dataKey="interactions"
                    stroke="#2563EB"
                    fill="url(#colorInteractions)"
                    name="Interacciones"
                  />
                  <Area
                    type="monotone"
                    dataKey="decisions"
                    stroke="#10B981"
                    fill="url(#colorDecisions)"
                    name="Decisiones"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Alertas reconocidas</h2>
                <p className="text-sm text-slate-500">Actividad de cierres en los últimos {alertsTrend.length || 0} días</p>
              </div>
            </div>
            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={alertsTrend} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tickFormatter={formatShortDate} stroke="#94A3B8" />
                  <YAxis tickFormatter={(value) => value.toLocaleString('es-MX')} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: '#FEE2E2' }}
                    labelFormatter={(label) => formatShortDate(label)}
                    formatter={(value: number) => value.toLocaleString('es-MX')}
                  />
                  <Bar dataKey="alerts" fill="#F97316" radius={[8, 8, 0, 0]} name="Alertas resueltas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {weeklyAlertsResolved > 0
                ? `${weeklyAlertsResolved} alertas atendidas en la última semana.`
                : 'Sin cierres registrados en la última semana.'}
            </p>
          </article>
        </section>

        <section className="grid gap-8 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Estado de agentes</h2>
                <span className="text-sm font-medium text-slate-500">{agents.length} activos en tu red</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-[#2563EB]" />
                <h2 className="text-xl font-semibold text-slate-900">Mentor Map</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Visualiza los clústeres de colaboración para identificar dependencias y asignar refuerzos cuando sea necesario.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {mentorMap.map((cluster) => (
                  <div key={cluster.cluster} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{cluster.cluster}</h3>
                    <p className="mt-1 text-sm text-slate-500">Lead: {cluster.lead}</p>
                    <p className="mt-2 text-sm text-slate-600">{cluster.focus}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {cluster.agents.map((agent) => (
                        <li key={agent}>{agent}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Actividad reciente</h2>
                <span className="text-sm text-slate-500">Actualizado {briefing?.generatedAt ? formatRelativeTime(briefing.generatedAt) : '—'}</span>
              </div>
              <ul className="mt-4 space-y-3">
                {recentActivity.length === 0 && !loadingBriefing && (
                  <li className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                    Aún no hay eventos registrados.
                  </li>
                )}
                {recentActivity.map((event) => (
                  <li key={event.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">{event.type}</span>
                      <span className="text-xs text-slate-500">{formatRelativeTime(event.timestamp)}</span>
                    </div>
                    {event.payload && (
                      <pre className="mt-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Timeline events={timelineEvents} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
