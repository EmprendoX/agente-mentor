'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  PieChart as PieIcon,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { MetricCard } from '@/app/components/MetricCard';
import { getReportAnalytics } from '@/app/lib/analytics';
import type { ReportAnalyticsSnapshot } from '@/app/types/analytics';

const pieColors = ['#2563EB', '#F97316', '#10B981', '#8B5CF6', '#F59E0B'];

const formatShortDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
};

export default function ReportesPage() {
  const [report, setReport] = useState<ReportAnalyticsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadReport = async () => {
      try {
        const data = await getReportAnalytics();
        if (!active) {
          return;
        }

        setReport(data);
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'No fue posible cargar los reportes.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadReport();

    return () => {
      active = false;
    };
  }, []);

  const interactionsVsDecisions = useMemo(() => {
    if (!report) {
      return [] as Array<{ date: string; interactions: number; decisions: number }>;
    }

    const merged = new Map<string, { date: string; interactions: number; decisions: number }>();

    report.timeseries.interactions.forEach((point) => {
      merged.set(point.date, { date: point.date, interactions: point.value, decisions: 0 });
    });

    report.timeseries.decisions.forEach((point) => {
      const current = merged.get(point.date) ?? { date: point.date, interactions: 0, decisions: 0 };
      current.decisions = point.value;
      merged.set(point.date, current);
    });

    return [...merged.values()].sort((a, b) => a.date.localeCompare(b.date));
  }, [report]);

  const alertsSeries = useMemo(
    () =>
      report?.timeseries.alerts.map((point, index) => ({
        date: point.date,
        created: point.value,
        acknowledged: report.timeseries.alertsAcknowledged[index]?.value ?? 0,
      })) ?? [],
    [report],
  );

  const interactionSources = report?.interactionSources ?? [];
  const decisionOutcomes = report?.decisionOutcomes ?? [];
  const overview = report?.overview;

  return (
    <div className="min-h-screen bg-[#F5F1EA] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="rounded-3xl bg-gradient-to-br from-[#0EA5E9] via-[#2563EB] to-[#1D4ED8] p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                <BarChart3 className="h-4 w-4" /> Reportes ejecutivos
              </span>
              <h1 className="text-3xl font-semibold lg:text-4xl">Inteligencia operativa</h1>
              <p className="text-base text-white/80">
                KPIs accionables con evolución temporal para coordinar acciones y anticipar riesgos en tu red de agentes.
              </p>
            </div>
            <div className="grid gap-1 text-sm text-white/80">
              <p className="text-xs uppercase tracking-wide text-white/70">Última actualización</p>
              <p className="text-lg font-semibold text-white">{report?.generatedAt ? formatShortDate(report.generatedAt) : '—'}</p>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
              {errorMessage}
            </div>
          )}
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Interacciones semana"
            value={overview ? overview.interactionsThisWeek.toLocaleString('es-MX') : loading ? '…' : '0'}
            helper={report ? `${report.timeseries.interactions.length} días analizados` : undefined}
            trend={overview && overview.interactionsThisWeek > 0 ? 'up' : 'neutral'}
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            label="Alertas creadas"
            value={overview ? overview.alertsCreatedThisWeek.toLocaleString('es-MX') : loading ? '…' : '0'}
            helper={overview ? 'Últimos 7 días' : undefined}
            trend={overview && overview.alertsCreatedThisWeek > 0 ? 'down' : 'neutral'}
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <MetricCard
            label="Alertas reconocidas"
            value={overview ? overview.alertsAcknowledgedThisWeek.toLocaleString('es-MX') : loading ? '…' : '0'}
            helper={overview ? 'Casos atendidos' : undefined}
            trend={overview && overview.alertsAcknowledgedThisWeek > 0 ? 'up' : 'neutral'}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard
            label="Tasa de aceptación"
            value={overview ? `${overview.decisionsAcceptanceRate.toFixed(1)}%` : loading ? '…' : '0%'}
            helper={overview ? 'Decisiones aceptadas vs rechazadas' : undefined}
            trend={overview && overview.decisionsAcceptanceRate >= 80 ? 'up' : 'neutral'}
            icon={<PieIcon className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Interacciones vs decisiones</h2>
                <p className="text-sm text-slate-500">Serie diaria comparativa</p>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {interactionsVsDecisions.length} días
              </span>
            </div>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer>
                <AreaChart data={interactionsVsDecisions} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reportInteractions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="reportDecisions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tickFormatter={formatShortDate} stroke="#94A3B8" />
                  <YAxis tickFormatter={(value) => value.toLocaleString('es-MX')} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: '#BFDBFE' }}
                    labelFormatter={(label) => formatShortDate(label)}
                    formatter={(value: number) => value.toLocaleString('es-MX')}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="interactions"
                    stroke="#0EA5E9"
                    fill="url(#reportInteractions)"
                    name="Interacciones"
                  />
                  <Area
                    type="monotone"
                    dataKey="decisions"
                    stroke="#059669"
                    fill="url(#reportDecisions)"
                    name="Decisiones"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Distribución decisiones</h2>
                <p className="text-sm text-slate-500">Aceptadas vs rechazadas</p>
              </div>
            </div>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip formatter={(value: number) => value.toLocaleString('es-MX')} />
                  <Legend />
                  <Pie
                    data={decisionOutcomes}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {decisionOutcomes.map((entry, index) => (
                      <Cell key={entry.label} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {overview && overview.decisionsAcceptanceRate > 0
                ? `Aceptación promedio: ${overview.decisionsAcceptanceRate.toFixed(1)}%`
                : 'Aún no hay decisiones registradas.'}
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Alertas creadas vs reconocidas</h2>
                <p className="text-sm text-slate-500">Monitoreo diario</p>
              </div>
            </div>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={alertsSeries} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tickFormatter={formatShortDate} stroke="#94A3B8" />
                  <YAxis tickFormatter={(value) => value.toLocaleString('es-MX')} stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: '#FED7AA' }}
                    labelFormatter={(label) => formatShortDate(label)}
                    formatter={(value: number) => value.toLocaleString('es-MX')}
                  />
                  <Legend />
                  <Bar dataKey="created" name="Creadas" fill="#F97316" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="acknowledged" name="Reconocidas" fill="#4ADE80" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Orígenes de interacción</h2>
                <p className="text-sm text-slate-500">Top 5 fuentes por volumen</p>
              </div>
            </div>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={interactionSources} layout="vertical" margin={{ top: 10, bottom: 0, left: 0, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" tickFormatter={(value) => value.toLocaleString('es-MX')} stroke="#94A3B8" />
                  <YAxis type="category" dataKey="label" width={120} stroke="#94A3B8" />
                  <Tooltip formatter={(value: number) => value.toLocaleString('es-MX')} />
                  <Bar dataKey="value" fill="#6366F1" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {interactionSources.length > 0
                ? 'Identifica qué canales requieren más soporte o automatización.'
                : 'Aún no hay suficientes interacciones para clasificar.'}
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
