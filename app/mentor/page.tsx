"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Send, Sparkles, Target, Activity } from 'lucide-react';
import { sendAgentMessage } from '@/app/lib/chat';
import {
  AgentContextSnapshot,
  AgentConversationMessage,
  AgentRecommendationResponse,
} from '@/app/types/agents';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const DEFAULT_ORGANIZATION_ID = process.env.NEXT_PUBLIC_ORGANIZATION_ID ?? 'demo-organization';

const quickPrompts = [
  'Resume el estado comercial de esta semana y dime los riesgos clave.',
  'Genera un plan de acción para incrementar conversiones en el embudo digital.',
  '¿Qué tareas operativas debo priorizar hoy? Hazlo en formato checklist.',
  'Analiza el tono de los últimos mensajes del equipo y dame recomendaciones.',
];

const formatTimestamp = (date: Date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const mapConversationHistory = (messages: ChatMessage[]): AgentConversationMessage[] =>
  messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .map((message) => ({ role: message.role, content: message.content }));

const initialAssistantMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Soy tu Core Mentor empresarial. Puedo analizar métricas, tareas y contexto estratégico para darte respuestas accionables. Pregúntame lo que necesites y prepararé un plan inmediato.',
  timestamp: new Date(),
};

export default function MentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contextSnapshot, setContextSnapshot] = useState<AgentContextSnapshot | null>(null);
  const [lastResponse, setLastResponse] = useState<AgentRecommendationResponse | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const organizationId = useMemo(() => DEFAULT_ORGANIZATION_ID, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isSending]);

  const appendAssistantResponse = useCallback((response: AgentRecommendationResponse) => {
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.answer,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setContextSnapshot(response.context);
    setLastResponse(response);
  }, []);

  const handleSend = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      if (event) {
        event.preventDefault();
      }

      if (!inputValue.trim() || isSending) {
        return;
      }

      const query = inputValue.trim();
      const history = mapConversationHistory(messages);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: query,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setError(null);
      setIsSending(true);

      try {
        const response = await sendAgentMessage({
          organizationId,
          query,
          conversation: history,
        });

        appendAssistantResponse(response);
      } catch (err) {
        const fallbackMessage =
          err instanceof Error ? err.message : 'No se pudo generar una respuesta en este momento.';
        setError(fallbackMessage);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-error-${Date.now()}`,
            role: 'assistant',
            content: 'Ocurrió un problema al consultar la IA. Intenta nuevamente en unos segundos.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [appendAssistantResponse, inputValue, isSending, messages, organizationId],
  );

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <header className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Agente central</p>
            <h1 className="mt-2 text-3xl font-semibold lg:text-4xl">Core Mentor en modo conversación</h1>
            <p className="mt-3 max-w-2xl text-base text-white/80">
              Conecta tu contexto operativo y estratégico para recibir respuestas accionables. El asistente ya está listo para
              funcionar sin memoria persistente; cuando habilites Supabase solo tendrás que añadir la base de datos para ampliar
              su conocimiento.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">IA conectada</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">
              <Target className="h-4 w-4" />
              <span className="text-sm">Contexto operativo</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Supabase opcional</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="flex flex-col rounded-3xl border border-white/10 bg-slate-950/50 p-6 shadow-inner">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Chat estratégico en vivo</h2>
              <p className="text-sm text-white/60">
                Organización activa: <span className="font-medium text-white">{organizationId}</span>
              </p>
            </div>
            {lastResponse?.model && (
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                Modelo: {lastResponse.model}
              </span>
            )}
          </div>

          <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col gap-1">
                <div
                  className={`max-w-3xl rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg backdrop-blur ${
                    message.role === 'user'
                      ? 'ml-auto bg-emerald-500/10 text-emerald-100'
                      : 'bg-white/5 text-white'
                  }`}
                >
                  {message.content}
                </div>
                <span className="text-xs text-white/40">
                  {message.role === 'user' ? 'Tú' : 'Core Mentor'} · {formatTimestamp(message.timestamp)}
                </span>
              </div>
            ))}
            {isSending && (
              <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/70">
                <Loader2 className="h-4 w-4 animate-spin" />
                El mentor está generando la respuesta…
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSend} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left text-xs text-white/70 transition hover:border-white/20 hover:bg-white/10"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-3">
              <textarea
                className="min-h-[100px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
                placeholder="Formula tu solicitud para el Core Mentor..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <button
                type="submit"
                disabled={isSending || !inputValue.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-white/10"
              >
                {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
          </form>
        </section>

        <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Contexto utilizado</h2>
            <p className="text-sm text-white/60">
              El mentor compone la respuesta con señales estratégicas, memoria temporal y tareas activas. Cuando conectes Supabase
              se añadirá la base de conocimientos documental.
            </p>
          </div>

          <div className="space-y-5 text-sm text-white/70">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Contexto estratégico</h3>
              {contextSnapshot?.globalContext?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {contextSnapshot.globalContext.map((item, index) => (
                    <li key={`global-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-white/40">Aún no se han definido lineamientos globales.</p>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Memoria reciente</h3>
              {contextSnapshot?.memoryUpdates?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {contextSnapshot.memoryUpdates.map((item, index) => (
                    <li key={`memory-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-white/40">Comparte insights manuales o activa la ingesta cuando Supabase esté listo.</p>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Datos operativos</h3>
              {contextSnapshot?.recentInsights?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {contextSnapshot.recentInsights.map((item, index) => (
                    <li key={`insight-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-white/40">Sin tareas o alertas activas en la simulación actual.</p>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Base documental</h3>
              {contextSnapshot?.knowledgeBase?.length ? (
                <ul className="mt-2 space-y-2">
                  {contextSnapshot.knowledgeBase.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70"
                    >
                      <p className="font-semibold text-white">{item.metadata?.title ?? item.documentId}</p>
                      <p className="mt-1">{item.content}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        {(item.similarity * 100).toFixed(1)}% de afinidad
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-white/40">
                  Aún no hay embeddings cargados. Conéctate a Supabase para habilitar la recuperación semántica.
                </p>
              )}
            </div>

            {lastResponse?.reasoning && (
              <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4 text-xs text-violet-100">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200/80">
                  Razonamiento del modelo
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed">{lastResponse.reasoning}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
