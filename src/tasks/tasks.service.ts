import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TASK_STATUS_ENUM } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filerDto: GetTasksFilterDto): Task[] {
    let result = true;
    return this.tasks.filter((task) => {
      if (filerDto.search) {
        result =
          task.title.toLowerCase().includes(filerDto.search.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(filerDto.search.toLowerCase());
      }
      if (filerDto.status) {
        result = task.status === filerDto.status;
      }
      return result;
    });
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TASK_STATUS_ENUM.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  deleteTask(id: string): void {
    const task: Task = this.getTaskById(id);
    const taskIdx: number = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks.splice(taskIdx, 1);
  }

  updateTask(id: string, status: TASK_STATUS_ENUM): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;

    const taskIdx: number = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskIdx, 1, task);
    return task;
  }
}
