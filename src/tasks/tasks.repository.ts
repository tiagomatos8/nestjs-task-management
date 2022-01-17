import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TASK_STATUS_ENUM } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filerDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filerDto;
    const query = this.createQueryBuilder('task');

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
    const tasks: Task[] = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = this.create({
      title,
      description,
      status: TASK_STATUS_ENUM.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
