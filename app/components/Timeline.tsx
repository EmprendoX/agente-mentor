'use client';

import type { ReactNode } from 'react';

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  owner: string;
  icon?: ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-6 border-l border-slate-200 pl-6">
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4">
          <span className="absolute -left-[37px] flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
            {event.icon ?? <span className="text-xs font-semibold">{index + 1}</span>}
          </span>
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-base font-semibold text-slate-900">{event.title}</h4>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {event.timestamp}
              </span>
            </header>
            <p className="mt-2 text-sm text-slate-600">{event.description}</p>
            <p className="mt-3 text-xs font-medium text-slate-500">Responsable: {event.owner}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
