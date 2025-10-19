import { AgentChatRequest, AgentRecommendationResponse } from '@/app/types/agents';

const DEFAULT_BACKEND_URL = 'http://localhost:4000/api';
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL;

export async function sendAgentMessage(payload: AgentChatRequest): Promise<AgentRecommendationResponse> {
  const response = await fetch(`${backendBaseUrl}/agents/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'No se pudo obtener una respuesta del agente.');
  }

  return (await response.json()) as AgentRecommendationResponse;
}
