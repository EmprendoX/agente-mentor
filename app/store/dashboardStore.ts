'use client';

import { create } from 'zustand';

export type AgentStatus = 'operational' | 'attention' | 'offline';

export interface AgentSummary {
  id: string;
  name: string;
  focus: string;
  status: AgentStatus;
  activeTasks: number;
  lastUpdate: string;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  acknowledged: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  completed: boolean;
}

interface DashboardState {
  context: string;
  alerts: AlertItem[];
  tasks: TaskItem[];
  agents: AgentSummary[];
  setContext: (context: string) => void;
  addAlert: (alert: AlertItem) => void;
  acknowledgeAlert: (id: string) => void;
  addTask: (task: TaskItem) => void;
  toggleTask: (id: string) => void;
  setAgents: (agents: AgentSummary[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  context:
    'El equipo de agentes se encuentra en modo de planificación de campaña. Revisa las actualizaciones críticas y los próximos hitos para coordinar al equipo.',
  alerts: [
    {
      id: 'alert-1',
      title: 'Revisión de mensajes pendientes',
      description:
        'El Agente de Comunicaciones ha detectado 5 mensajes urgentes sin responder en los últimos 30 minutos.',
      severity: 'warning',
      acknowledged: false,
    },
    {
      id: 'alert-2',
      title: 'Actualización de base de datos',
      description:
        'El Agente de Datos completó la sincronización con el CRM. No se requieren acciones adicionales.',
      severity: 'info',
      acknowledged: false,
    },
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Aprobar la propuesta creativa del Agente de Marketing',
      owner: 'Directora Creativa',
      due: 'Hoy 15:00',
      completed: false,
    },
    {
      id: 'task-2',
      title: 'Confirmar presupuesto de la campaña Q2',
      owner: 'Equipo Financiero',
      due: 'Mañana 10:00',
      completed: false,
    },
  ],
  agents: [
    {
      id: 'agent-1',
      name: 'Mentor de Marketing',
      focus: 'Estrategia omnicanal',
      status: 'operational',
      activeTasks: 3,
      lastUpdate: 'Hace 12 minutos',
    },
    {
      id: 'agent-2',
      name: 'Analista de Datos',
      focus: 'Segmentación de audiencias',
      status: 'attention',
      activeTasks: 2,
      lastUpdate: 'Hace 5 minutos',
    },
    {
      id: 'agent-3',
      name: 'Agente de Comunicaciones',
      focus: 'Gestión de leads',
      status: 'operational',
      activeTasks: 4,
      lastUpdate: 'Hace 2 minutos',
    },
    {
      id: 'agent-4',
      name: 'Agente de Automatización',
      focus: 'Flujos de email',
      status: 'offline',
      activeTasks: 1,
      lastUpdate: 'Hace 45 minutos',
    },
  ],
  setContext: (context) => set({ context }),
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 5) })),
  acknowledgeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert,
      ),
    })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),
  setAgents: (agents) => set({ agents }),
}));
