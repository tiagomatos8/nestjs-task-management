import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TASK_STATUS_ENUM } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger(TasksRepository.name);

  async getTasks(filerDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filerDto;
    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (!!status) {
      query.andWhere('task.status = :status', { status });
    }

    if (!!search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    try {
      const tasks: Task[] = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user: ${
          user.username
        } | filters: ${JSON.stringify(filerDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = this.create({
      title,
      description,
      status: TASK_STATUS_ENUM.OPEN,
      user,
    });

    try {
      await this.save(task);
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to create task for user: ${
          user.username
        } | task: ${JSON.stringify({
          title: task.title,
          description: task.description,
        })}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
