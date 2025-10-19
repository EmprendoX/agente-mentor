import assert from 'node:assert/strict';
import { AgentsRepository, ActionsRepository, MemoryRepository, UsersRepository } from '../repositories';

async function verify(): Promise<void> {
  const usersRepository = new UsersRepository();
  const agentsRepository = new AgentsRepository();
  const memoryRepository = new MemoryRepository();
  const actionsRepository = new ActionsRepository();

  const agents = await agentsRepository.listAll();
  assert.ok(agents.length > 0, 'No agents found. Run the seed script before running the integrity check.');

  for (const agent of agents) {
    const user = await usersRepository.findById(agent.userId);
    assert.ok(user, `Agent ${agent.id} references missing user ${agent.userId}`);

    const updates = await memoryRepository.listByAgent(agent.id, 100);
    updates.forEach((update) => {
      assert.equal(update.agentId, agent.id, 'Memory entry has mismatched agent id');
      assert.ok(Array.isArray(update.tags), 'Memory entry tags should be an array');
    });

    const actions = await actionsRepository.listByAgent(agent.id, 100);
    actions.forEach((action) => {
      assert.equal(action?.agentId, agent.id, 'Action entry has mismatched agent id');
      assert.ok(action.userId, 'Action entry must contain a user reference');
      assert.ok(['queued', 'processing', 'completed', 'failed'].includes(action.status), 'Invalid action status value');
    });
  }

  const demoAgent = agents.find((item) => item.name === 'Agente Mentor Demo');
  assert.ok(demoAgent, 'Expected seeded agent "Agente Mentor Demo" to exist.');

  // eslint-disable-next-line no-console
  console.log(`Integrity check passed for ${agents.length} agent(s).`);
}

verify().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Integrity check failed:', error);
  process.exitCode = 1;
});
