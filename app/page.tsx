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

import { useI18n } from './context/I18nProvider';

type VisionCardTranslation = {
  title: string;
  description: string;
  points?: string[];
};

type AgentSuiteTranslation = {
  name: string;
  description: string;
  focuses: string[];
};

type ObjectiveTranslation = {
  title: string;
  description: string;
  result: string;
};

type JourneyTranslation = {
  title: string;
  description: string;
};

type ImpactHighlightTranslation = {
  value: string;
  label: string;
};

type PlatformHighlight = {
  title: string;
  description: string;
};

type VisionCard = VisionCardTranslation & {
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

type AgentSuite = AgentSuiteTranslation & { gradient: string };

type JourneyCard = JourneyTranslation & { icon: ComponentType<{ className?: string }> };

export default function LandingPage() {
  const { get, t } = useI18n();

  const visionIcons: ComponentType<{ className?: string }>[] = [Sparkles, Rocket, Shield];
  const visionAccents = [
    'from-brand-blue/25 via-brand-purple/20 to-brand-blue/10',
    'from-brand-green/25 via-brand-blue/20 to-brand-green/10',
    'from-brand-orange/25 via-brand-yellow/20 to-brand-purple/10',
  ];
  const visionCards = get<VisionCardTranslation[]>('landing.visionCards').map<VisionCard>((card, index) => ({
    ...card,
    icon: visionIcons[index % visionIcons.length] ?? Sparkles,
    accent: visionAccents[index % visionAccents.length] ?? visionAccents[0],
  }));

  const impactColors = ['text-brand-blue', 'text-brand-green', 'text-brand-purple'];
  const impactHighlights = get<ImpactHighlightTranslation[]>('landing.impactHighlights').map((highlight, index) => ({
    ...highlight,
    color: impactColors[index % impactColors.length] ?? impactColors[0],
  }));

  const suiteGradients = [
    'from-brand-blue/80 via-brand-purple/70 to-brand-blue/40',
    'from-brand-green/80 via-brand-blue/60 to-brand-green/40',
    'from-brand-orange/80 via-brand-yellow/70 to-brand-orange/40',
    'from-brand-purple/80 via-brand-blue/60 to-brand-purple/40',
    'from-brand-yellow/80 via-brand-green/60 to-brand-yellow/30',
  ];
  const agentSuites = get<AgentSuiteTranslation[]>('landing.agentSuites').map<AgentSuite>((suite, index) => ({
    ...suite,
    gradient: suiteGradients[index % suiteGradients.length] ?? suiteGradients[0],
  }));

  const audiences = get<string[]>('landing.audiences');

  const journeyIcons: ComponentType<{ className?: string }>[] = [Compass, Bot, LineChart];
  const journey = get<JourneyTranslation[]>('landing.journey').map<JourneyCard>((step, index) => ({
    ...step,
    icon: journeyIcons[index % journeyIcons.length] ?? Compass,
  }));

  const objectives = get<ObjectiveTranslation[]>('landing.objectives');
  const platformIcons: ComponentType<{ className?: string }>[] = [Lightbulb, BarChart3];
  const platformHighlights = get<PlatformHighlight[]>('landing.platformHighlights');

  return (
    <div className="min-h-screen text-slate-100">
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-surface/90 via-surface/80 to-surface/60 shadow-[0_0_60px_rgba(37,99,235,0.25)]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-brand-blue/40 blur-3xl" />
          <div className="absolute -bottom-20 -right-6 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl" />
          <div className="absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 bg-gradient-to-r from-brand-orange/10 via-brand-yellow/10 to-brand-green/10 blur-2xl" />
        </div>

        <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">
                {t('landing.badge')}
              </span>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{t('landing.title')}</h1>
              <p className="max-w-2xl text-lg text-slate-300">{t('landing.description')}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/agentes"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-brand-purple"
                >
                  {t('landing.exploreAgents')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/registro"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-yellow/60 hover:text-brand-yellow"
                >
                  {t('landing.requestDemo')}
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
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 lg:grid-cols-3 lg:px-12">
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

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">{t('landing.suiteTitle')}</h2>
              <p className="mt-2 max-w-3xl text-base text-slate-300">{t('landing.suiteSubtitle')}</p>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{t('landing.suiteDescription')}</p>
            </div>
            <Link
              href="/agentes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:text-brand-orange"
            >
              {t('landing.suiteCta')}
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
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.3fr_1fr] lg:px-12 lg:gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold text-white">{t('landing.objectivesSectionTitle')}</h2>
              <div className="space-y-6">
                {objectives.map((objective) => (
                  <div key={objective.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_14px_45px_rgba(15,23,42,0.4)]">
                    <div className="flex items-start gap-4">
                      <Target className="h-6 w-6 text-brand-yellow" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">{objective.title}</h3>
                        <p className="mt-2 text-sm text-slate-200">{objective.description}</p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
                          {t('landing.objectivesTitle')}: {objective.result}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-purple/20 via-brand-blue/10 to-brand-green/10 p-6 shadow-[0_14px_45px_rgba(15,23,42,0.35)]">
                <h3 className="text-lg font-semibold text-white">{t('landing.journeySupportTitle')}</h3>
                <p className="mt-2 text-sm text-slate-200">{t('landing.journeySupportDescription')}</p>
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
                <h3 className="text-lg font-semibold text-white">{t('landing.audienceCardTitle')}</h3>
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

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white">{t('landing.platformTitle')}</h2>
              <p className="text-base text-slate-300">{t('landing.platformDescription')}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {platformHighlights.map((highlight, index) => {
                  const Icon = platformIcons[index % platformIcons.length] ?? Lightbulb;
                  return (
                    <div key={highlight.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <Icon className="h-6 w-6 text-brand-yellow" />
                    <h3 className="mt-3 text-sm font-semibold text-white">{highlight.title}</h3>
                    <p className="mt-2 text-xs text-slate-300">{highlight.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-yellow/20 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.45)]">
              <h3 className="text-lg font-semibold text-white">{t('landing.ctaTitle')}</h3>
              <p className="mt-3 text-sm text-slate-200">{t('landing.ctaDescription')}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="mailto:hola@mentorx.mx"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-brand-yellow"
                >
                  {t('landing.ctaPrimaryLabel')}
                </Link>
                <Link
                  href="/ebooks"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-brand-purple/60 hover:text-brand-purple"
                >
                  {t('landing.ctaSecondaryLabel')}
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
