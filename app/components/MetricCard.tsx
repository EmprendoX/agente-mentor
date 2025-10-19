'use client';

import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  helper?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
}

const trendConfig: Record<NonNullable<MetricCardProps['trend']>, string> = {
  up: 'text-emerald-600 bg-emerald-100',
  down: 'text-rose-600 bg-rose-100',
  neutral: 'text-slate-600 bg-slate-100',
};

export function MetricCard({ label, value, helper, trend = 'neutral', icon }: MetricCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </header>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        {helper && (
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${trendConfig[trend]}`}>
            {helper}
          </span>
        )}
      </div>
    </article>
  );
}
