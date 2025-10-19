import { AgentsRepository, ActionsRepository, MemoryRepository, UsersRepository } from '../repositories';

async function seed(): Promise<void> {
  const usersRepository = new UsersRepository();
  const agentsRepository = new AgentsRepository();
  const memoryRepository = new MemoryRepository();
  const actionsRepository = new ActionsRepository();

  const userEmail = 'mentor.demo@example.com';
  const existingUser = await usersRepository.findByEmail(userEmail);

  const user =
    existingUser ??
    (await usersRepository.create({
      email: userEmail,
      fullName: 'Mentor Demo',
      avatarUrl: 'https://example.com/avatar.png',
    }));

  const agentName = 'Agente Mentor Demo';
  const existingAgent = await agentsRepository.findByName(agentName);
  const agent =
    existingAgent ??
    (await agentsRepository.create({
      userId: user.id,
      name: agentName,
      description: 'Agente mentor preparado con contexto base para demostraciones.',
      persona:
        'Eres un mentor estratégico que ayuda a equipos a priorizar tareas, entender alertas y consolidar aprendizajes.',
    }));

  const existingUpdates = await memoryRepository.listByAgent(agent.id, 10);
  const summaries = new Set(existingUpdates.map((item) => item.summary));

  const seedUpdates = [
    {
      summary: 'Se preparó el briefing diario con foco en oportunidades comerciales clave.',
      author: 'Sistema',
      tags: ['briefing', 'ventas'],
    },
    {
      summary: 'El equipo de soporte reportó un aumento en tickets críticos de clientes premium.',
      author: 'Soporte',
      tags: ['alerta', 'clientes'],
    },
  ];

  for (const update of seedUpdates) {
    if (!summaries.has(update.summary)) {
      await memoryRepository.create({
        agentId: agent.id,
        summary: update.summary,
        author: update.author,
        tags: update.tags,
        metadata: { seeded: true },
      });
    }
  }

  const externalId = 'seed-action-demo';
  const existingAction = await actionsRepository.findByExternalId(externalId);

  if (!existingAction) {
    await actionsRepository.create({
      agentId: agent.id,
      userId: user.id,
      externalId,
      type: 'daily_briefing',
      status: 'completed',
      payload: {
        summary: 'Acción de ejemplo para demostrar registros históricos.',
      },
      metadata: { seeded: true },
    });
  }

  // eslint-disable-next-line no-console
  console.log('Seed data ensured for user %s and agent %s', user.email, agent.name);
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to run seed script:', error);
  process.exitCode = 1;
});
