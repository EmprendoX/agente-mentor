import { Alert, Task } from '../actions/models';
import { ContextUpdate } from '../memory/models';

export interface DailyBriefing {
  date: string;
  headline: string;
  tasksDue: Task[];
  activeAlerts: Alert[];
  latestUpdates: ContextUpdate[];
}
