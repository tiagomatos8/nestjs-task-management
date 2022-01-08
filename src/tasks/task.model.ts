export class Task {
  id: string;
  title: string;
  description: string;
  status: TASK_STATUS_ENUM;
}

export enum TASK_STATUS_ENUM {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
