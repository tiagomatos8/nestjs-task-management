import { IsEnum } from 'class-validator';
import { TASK_STATUS_ENUM } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TASK_STATUS_ENUM)
  status: TASK_STATUS_ENUM;
}
