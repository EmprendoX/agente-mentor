import { OpenAPIV3_1 } from 'openapi-types';

export const createOpenAPIDocument = (): OpenAPIV3_1.Document => ({
  openapi: '3.1.0',
  info: {
    title: 'Agente Mentor API',
    version: '1.0.0',
    description:
      'API para gestionar briefings diarios, tareas, alertas y actualizaciones de contexto del agente mentor.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Servidor de desarrollo',
    },
  ],
  tags: [
    { name: 'Briefing', description: 'Endpoints relacionados con el briefing diario' },
    { name: 'Tareas', description: 'Gestión de tareas del agente' },
    { name: 'Alertas', description: 'Alertas críticas y avisos del sistema' },
    { name: 'Contexto', description: 'Actualizaciones del contexto operativo' },
    { name: 'Analítica', description: 'Eventos de uso y telemetría' },
  ],
  paths: {
    '/api/briefing/daily': {
      get: {
        tags: ['Briefing'],
        summary: 'Obtener briefing diario',
        parameters: [
          {
            name: 'date',
            in: 'query',
            description: 'Fecha objetivo en formato ISO 8601',
            schema: { type: 'string', format: 'date-time' },
            required: false,
          },
        ],
        responses: {
          '200': {
            description: 'Briefing generado exitosamente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DailyBriefing' },
              },
            },
          },
        },
      },
    },
    '/api/tasks': {
      get: {
        tags: ['Tareas'],
        summary: 'Listar tareas',
        responses: {
          '200': {
            description: 'Listado de tareas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Tareas'],
        summary: 'Crear tarea',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Tarea creada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
        },
      },
    },
    '/api/tasks/{id}': {
      patch: {
        tags: ['Tareas'],
        summary: 'Actualizar estado de tarea',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { $ref: '#/components/schemas/TaskStatus' },
                },
                required: ['status'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Tarea actualizada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
        },
      },
    },
    '/api/alerts': {
      get: {
        tags: ['Alertas'],
        summary: 'Listar alertas activas',
        responses: {
          '200': {
            description: 'Alertas recuperadas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Alert' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Alertas'],
        summary: 'Crear alerta',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AlertInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Alerta creada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Alert' },
              },
            },
          },
        },
      },
    },
    '/api/alerts/{id}': {
      patch: {
        tags: ['Alertas'],
        summary: 'Reconocer alerta',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'Alerta reconocida',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Alert' },
              },
            },
          },
        },
      },
    },
    '/api/context': {
      get: {
        tags: ['Contexto'],
        summary: 'Listar actualizaciones de contexto',
        responses: {
          '200': {
            description: 'Actualizaciones recuperadas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ContextUpdate' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Contexto'],
        summary: 'Registrar actualización de contexto',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContextUpdateInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Actualización registrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ContextUpdate' },
              },
            },
          },
        },
      },
    },
    '/api/analytics/events': {
      get: {
        tags: ['Analítica'],
        summary: 'Consultar eventos registrados',
        responses: {
          '200': {
            description: 'Eventos disponibles',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/AnalyticsEvent' },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      TaskStatus: {
        type: 'string',
        enum: ['pending', 'in_progress', 'completed'],
      },
      TaskPriority: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
      },
      TaskInput: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          dueDate: { type: 'string', format: 'date-time' },
          priority: { $ref: '#/components/schemas/TaskPriority' },
        },
      },
      Task: {
        type: 'object',
        required: ['id', 'title', 'status', 'priority', 'createdAt', 'updatedAt'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          dueDate: { type: 'string', format: 'date-time' },
          status: { $ref: '#/components/schemas/TaskStatus' },
          priority: { $ref: '#/components/schemas/TaskPriority' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      AlertInput: {
        type: 'object',
        required: ['type', 'message'],
        properties: {
          type: { type: 'string', enum: ['info', 'warning', 'critical'] },
          message: { type: 'string' },
        },
      },
      Alert: {
        type: 'object',
        required: ['id', 'type', 'message', 'acknowledged', 'createdAt'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['info', 'warning', 'critical'] },
          message: { type: 'string' },
          acknowledged: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      ContextUpdateInput: {
        type: 'object',
        required: ['summary', 'author'],
        properties: {
          summary: { type: 'string' },
          author: { type: 'string' },
          tags: {
            type: 'array',
            items: { type: 'string' },
            default: [],
          },
        },
      },
      ContextUpdate: {
        type: 'object',
        required: ['id', 'summary', 'author', 'createdAt', 'tags'],
        properties: {
          id: { type: 'string' },
          summary: { type: 'string' },
          author: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          tags: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      AnalyticsEvent: {
        type: 'object',
        required: ['id', 'type', 'timestamp'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          payload: { type: 'object', additionalProperties: true },
        },
      },
      DailyBriefing: {
        type: 'object',
        required: ['date', 'headline', 'tasksDue', 'activeAlerts', 'latestUpdates'],
        properties: {
          date: { type: 'string', format: 'date-time' },
          headline: { type: 'string' },
          tasksDue: {
            type: 'array',
            items: { $ref: '#/components/schemas/Task' },
          },
          activeAlerts: {
            type: 'array',
            items: { $ref: '#/components/schemas/Alert' },
          },
          latestUpdates: {
            type: 'array',
            items: { $ref: '#/components/schemas/ContextUpdate' },
          },
        },
      },
    },
  },
});
