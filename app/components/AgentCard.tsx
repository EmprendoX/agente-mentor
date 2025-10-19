'use client';

import type { JSX } from 'react';
import { Activity, AlertTriangle, PlugZap } from 'lucide-react';
import type { AgentSummary, AgentStatus } from '@/app/store/dashboardStore';

const statusConfig: Record<AgentStatus, { label: string; color: string; icon: JSX.Element }> = {
  operational: {
    label: 'Operativo',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: <Activity className="h-4 w-4" />,
  },
  attention: {
    label: 'Requiere atención',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  offline: {
    label: 'Fuera de línea',
    color: 'bg-slate-200 text-slate-600 border-slate-300',
    icon: <PlugZap className="h-4 w-4" />,
  },
};

interface AgentCardProps {
  agent: AgentSummary;
}

export function AgentCard({ agent }: AgentCardProps) {
  const status = statusConfig[agent.status];

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{agent.name}</h3>
          <p className="text-sm text-slate-500">{agent.focus}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${status.color}`}
        >
          {status.icon}
          {status.label}
        </span>
      </header>
      <dl className="flex gap-6 text-sm text-slate-600">
        <div>
          <dt className="font-medium text-slate-500">Tareas activas</dt>
          <dd className="text-base font-semibold text-slate-900">{agent.activeTasks}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Última actualización</dt>
          <dd className="text-base font-semibold text-slate-900">{agent.lastUpdate}</dd>
        </div>
      </dl>
    </article>
  );
}
