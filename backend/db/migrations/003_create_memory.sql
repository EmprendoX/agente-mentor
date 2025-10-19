-- Create the memory table for context updates associated with agents
CREATE TABLE IF NOT EXISTS public.memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  author TEXT,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_memory_agent_id ON public.memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_memory_tags ON public.memory USING GIN(tags);
