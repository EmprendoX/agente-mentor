"use client";

import type { ReactNode } from 'react';
import {
  Users,
  Target,
  Zap,
  FileText,
  BarChart3,
  Headphones,
  User,
  Apple,
  Calendar,
  Globe,
  DollarSign,
  Heart,
  Star,
  ArrowRight,
} from 'lucide-react';

import { useI18n } from '../context/I18nProvider';

type AgentStatus = 'available' | 'coming-soon' | 'premium';

type AgentTranslation = {
  name: string;
  description: string;
  category: string;
};

type Agent = AgentTranslation & {
  id: string;
  icon: ReactNode;
  status: AgentStatus;
};

const agentDefinitions: { icon: ReactNode; status: AgentStatus }[] = [
  { icon: <Target className="w-8 h-8" />, status: 'available' },
  { icon: <Users className="w-8 h-8" />, status: 'available' },
  { icon: <Zap className="w-8 h-8" />, status: 'available' },
  { icon: <FileText className="w-8 h-8" />, status: 'coming-soon' },
  { icon: <BarChart3 className="w-8 h-8" />, status: 'available' },
  { icon: <Headphones className="w-8 h-8" />, status: 'coming-soon' },
  { icon: <User className="w-8 h-8" />, status: 'premium' },
  { icon: <Apple className="w-8 h-8" />, status: 'coming-soon' },
  { icon: <Calendar className="w-8 h-8" />, status: 'available' },
  { icon: <Globe className="w-8 h-8" />, status: 'premium' },
  { icon: <DollarSign className="w-8 h-8" />, status: 'available' },
  { icon: <Heart className="w-8 h-8" />, status: 'premium' },
];

function getStatusColor(status: AgentStatus) {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'coming-soon':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'premium':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getButtonStyle(status: AgentStatus) {
  switch (status) {
    case 'available':
      return 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white';
    case 'coming-soon':
      return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
    case 'premium':
      return 'bg-purple-100 hover:bg-purple-200 text-purple-800';
    default:
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
  }
}

export default function AgentesPage() {
  const { get, t } = useI18n();
  const agentTranslations = get<AgentTranslation[]>('agents.agents');
  const agents: Agent[] = agentTranslations.map((agent, index) => ({
    ...agent,
    id: String(index + 1),
    icon: agentDefinitions[index]?.icon ?? <Target className="w-8 h-8" />,
    status: agentDefinitions[index]?.status ?? 'available',
  }));

  const filters = [
    'agents.filters.all',
    'agents.filters.business',
    'agents.filters.productivity',
    'agents.filters.personal',
    'agents.filters.healthWellness',
  ];

  const statuses = get<Record<string, string>>('agents.statuses');
  const buttons = get<Record<string, string>>('agents.buttons');
  const metrics = get<Record<string, string>>('agents.metrics');
  const infoDescription = get<string[]>('agents.infoDescription');

  const getStatusText = (status: AgentStatus) => {
    switch (status) {
      case 'available':
        return statuses.available;
      case 'coming-soon':
        return statuses.comingSoon;
      case 'premium':
        return statuses.premium;
      default:
        return status;
    }
  };

  const getButtonText = (status: AgentStatus) => {
    switch (status) {
      case 'available':
        return buttons.available;
      case 'coming-soon':
        return buttons.comingSoon;
      case 'premium':
        return buttons.premium;
      default:
        return buttons.default;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] px-6 py-10 max-w-7xl mx-auto space-y-8">
      <div className="bg-[#2563EB] text-white rounded-xl shadow p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('agents.title')}</h1>
            <p className="text-white/80 mt-2">{t('agents.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-sm font-medium">
                {metrics.available}: {agents.filter((a) => a.status === 'available').length}
              </span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <span className="text-sm font-medium">
                {metrics.comingSoon}: {agents.filter((a) => a.status === 'coming-soon').length}
              </span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              <span className="text-sm font-medium">
                {metrics.premium}: {agents.filter((a) => a.status === 'premium').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <div className="flex flex-wrap gap-4">
          {filters.map((filterKey, index) => (
            <button
              key={filterKey}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                index === 0
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(filterKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white border border-gray-100 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden">
            <div className="border-b border-gray-50 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-[#2563EB]/10 p-3">{agent.icon}</div>
                <span className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#1F2937]">{agent.name}</h3>

              <span className="mb-3 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">{agent.category}</span>

              <p className="text-sm leading-relaxed text-gray-600">{agent.description}</p>
            </div>

            <div className="bg-gray-50 p-6">
              <button className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${getButtonStyle(agent.status)}`}>
                {getButtonText(agent.status)}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2563EB]/10">
            <Star className="h-8 w-8 text-[#2563EB]" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-[#1F2937]">{t('agents.infoTitle')}</h3>
          <div className="mx-auto max-w-2xl space-y-3 text-gray-600">
            {infoDescription.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
