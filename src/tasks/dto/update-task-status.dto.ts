import { IsEnum } from 'class-validator';
import { TASK_STATUS_ENUM } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TASK_STATUS_ENUM)
  status: TASK_STATUS_ENUM;
}
