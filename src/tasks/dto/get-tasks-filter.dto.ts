import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TASK_STATUS_ENUM } from '../task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TASK_STATUS_ENUM)
  status?: TASK_STATUS_ENUM;

  @IsOptional()
  @IsString()
  search?: string;
}
