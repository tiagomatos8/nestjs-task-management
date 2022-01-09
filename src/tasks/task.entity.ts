import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TASK_STATUS_ENUM } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TASK_STATUS_ENUM;
}
