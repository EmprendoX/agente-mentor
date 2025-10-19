'use client';

import { useMemo } from 'react';
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

import { AgentCard } from '@/app/components/AgentCard';
import { MetricCard } from '@/app/components/MetricCard';
import { Timeline } from '@/app/components/Timeline';
import type { TimelineEvent } from '@/app/components/Timeline';
import { useDashboardStore } from '@/app/store/dashboardStore';

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

export default function CoreDashboardPage() {
  const { context, alerts, tasks, agents, acknowledgeAlert, toggleTask } = useDashboardStore();

  const activeAlerts = useMemo(
    () => alerts.filter((alert) => !alert.acknowledged),
    [alerts],
  );
  const criticalAlerts = useMemo(
    () => activeAlerts.filter((alert) => alert.severity === 'critical'),
    [activeAlerts],
  );
  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks],
  );

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
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Leads nuevos" value="248" helper="+12% vs ayer" trend="up" icon={<Users className="h-5 w-5" />} />
          <MetricCard
            label="Alertas activas"
            value={`${activeAlerts.length}`}
            helper={criticalAlerts.length > 0 ? `${criticalAlerts.length} críticas` : 'Sin críticas'}
            trend={criticalAlerts.length > 0 ? 'down' : 'neutral'}
            icon={<AlertCircle className="h-5 w-5" />}
          />
          <MetricCard
            label="Tareas pendientes"
            value={`${pendingTasks.length}`}
            helper={pendingTasks.length > 0 ? 'Prioriza hoy' : 'Todo al día'}
            trend={pendingTasks.length > 0 ? 'neutral' : 'up'}
            icon={<ClipboardList className="h-5 w-5" />}
          />
          <MetricCard label="Satisfacción clientes" value="94%" helper="+3 pts" trend="up" icon={<CheckCircle2 className="h-5 w-5" />} />
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
                      {cluster.agents.map((member) => (
                        <li key={member}>{member}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-slate-900">Alertas</h2>
              </div>
              <ul className="mt-4 space-y-4">
                {alerts.map((alert) => (
                  <li key={alert.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <p className="text-sm font-semibold text-slate-800">{alert.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{alert.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium uppercase tracking-wide">{alert.severity}</span>
                      {!alert.acknowledged ? (
                        <button
                          type="button"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="rounded-full bg-[#2563EB] px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                        >
                          Marcar como visto
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Atendida
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#2563EB]" />
                <h2 className="text-lg font-semibold text-slate-900">Tareas pendientes</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                        task.completed
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-slate-300 bg-white'
                      }`}
                      aria-label={`Marcar ${task.title}`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 ${task.completed ? 'text-white' : 'text-slate-300'}`}
                      />
                    </button>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{task.title}</p>
                      <p className="text-xs text-slate-500">Responsable: {task.owner}</p>
                      <p className="text-xs text-slate-500">Vence: {task.due}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#2563EB]" />
                <h2 className="text-lg font-semibold text-slate-900">Timeline diario</h2>
              </div>
              <div className="mt-4">
                <Timeline events={timelineEvents} />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
