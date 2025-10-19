import { Router } from 'express';
import { ActionService, isValidPriority, isValidTaskStatus } from './service';
import { CreateAlertInput, CreateTaskInput } from './models';

export const createActionsRouter = (actionService: ActionService): Router => {
  const router = Router();

  router.get('/tasks', (_req, res) => {
    res.json(actionService.listTasks());
  });

  router.post('/tasks', (req, res) => {
    const input = req.body as Partial<CreateTaskInput>;

    if (!input?.title) {
      return res.status(400).json({ message: 'El campo "title" es obligatorio.' });
    }

    if (input.priority && !isValidPriority(input.priority)) {
      return res.status(400).json({ message: 'Prioridad inválida.' });
    }

    const task = actionService.createTask({
      title: input.title,
      description: input.description,
      dueDate: input.dueDate,
      priority: input.priority,
    });

    return res.status(201).json(task);
  });

  router.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body as { status?: string };

    if (!status || !isValidTaskStatus(status)) {
      return res.status(400).json({ message: 'Estado inválido.' });
    }

    const task = actionService.updateTaskStatus({ id, status });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    return res.json(task);
  });

  router.get('/alerts', (_req, res) => {
    res.json(actionService.listAlerts());
  });

  router.post('/alerts', (req, res) => {
    const { type, message } = req.body as { type?: string; message?: string };

    if (!type || !message) {
      return res.status(400).json({ message: 'Los campos "type" y "message" son obligatorios.' });
    }

    if (!['info', 'warning', 'critical'].includes(type)) {
      return res.status(400).json({ message: 'Tipo de alerta inválido.' });
    }

    const alertInput: CreateAlertInput = { type: type as CreateAlertInput['type'], message };
    const alert = actionService.createAlert(alertInput);
    return res.status(201).json(alert);
  });

  router.patch('/alerts/:id', (req, res) => {
    const { id } = req.params;
    const alert = actionService.acknowledgeAlert(id);

    if (!alert) {
      return res.status(404).json({ message: 'Alerta no encontrada.' });
    }

    return res.json(alert);
  });

  return router;
};
