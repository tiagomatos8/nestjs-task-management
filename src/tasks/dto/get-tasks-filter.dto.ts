import { TASK_STATUS_ENUM } from '../task.model';

export class GetTasksFilterDto {
  status?: TASK_STATUS_ENUM;
  search?: string;
}
