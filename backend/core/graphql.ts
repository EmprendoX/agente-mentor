import { RequestHandler } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { ActionService } from '../actions/service';
import { AgentsService } from '../agents/service';
import { MemoryService } from '../memory/service';
import { AnalyticsService } from '../analytics/service';
import { CreateAlertInput, CreateTaskInput } from '../actions/models';
import { CreateContextUpdateInput } from '../memory/models';

interface GraphQLHandlerDeps {
  actionService: ActionService;
  agentsService: AgentsService;
  memoryService: MemoryService;
  analyticsService: AnalyticsService;
}

const schema = buildSchema(`
  scalar DateTime

  enum TaskStatus {
    pending
    in_progress
    completed
  }

  enum TaskPriority {
    low
    medium
    high
  }

  enum AlertType {
    info
    warning
    critical
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    dueDate: String
    createdAt: String!
    updatedAt: String!
  }

  type Alert {
    id: ID!
    type: AlertType!
    message: String!
    acknowledged: Boolean!
    createdAt: String!
  }

  type ContextUpdate {
    id: ID!
    summary: String!
    author: String!
    createdAt: String!
    tags: [String!]!
  }

  type DailyBriefing {
    date: String!
    headline: String!
    tasksDue: [Task!]!
    activeAlerts: [Alert!]!
    latestUpdates: [ContextUpdate!]!
  }

  input TaskInput {
    title: String!
    description: String
    dueDate: String
    priority: TaskPriority = medium
  }

  input AlertInput {
    type: AlertType!
    message: String!
  }

  input ContextUpdateInput {
    summary: String!
    author: String!
    tags: [String!]
  }

  type Query {
    tasks: [Task!]!
    alerts: [Alert!]!
    contextUpdates: [ContextUpdate!]!
    dailyBriefing(date: String): DailyBriefing!
  }

  type Mutation {
    addTask(input: TaskInput!): Task!
    completeTask(id: ID!): Task
    addAlert(input: AlertInput!): Alert!
    acknowledgeAlert(id: ID!): Alert
    addContextUpdate(input: ContextUpdateInput!): ContextUpdate!
  }
`);

export const createGraphQLHandler = ({
  actionService,
  agentsService,
  memoryService,
  analyticsService,
}: GraphQLHandlerDeps): RequestHandler => {
  const root = {
    tasks: () => actionService.listTasks(),
    alerts: () => actionService.listAlerts(),
    contextUpdates: () => memoryService.listUpdates(),
    dailyBriefing: ({ date }: { date?: string }) =>
      agentsService.getDailyBriefing(date ? new Date(date) : undefined),
    addTask: ({ input }: { input: CreateTaskInput }) => actionService.createTask(input),
    completeTask: ({ id }: { id: string }) => actionService.completeTask(id),
    addAlert: ({ input }: { input: CreateAlertInput }) => actionService.createAlert(input),
    acknowledgeAlert: ({ id }: { id: string }) => actionService.acknowledgeAlert(id),
    addContextUpdate: ({ input }: { input: CreateContextUpdateInput }) => memoryService.addUpdate(input),
  };

  return graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    context: { analyticsService },
  });
};
