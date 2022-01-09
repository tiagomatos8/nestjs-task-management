import { Injectable, NotFoundException } from '@nestjs/common';
import { TASK_STATUS_ENUM } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filerDto: GetTasksFilterDto): Task[] {
  //   let result = true;
  //   return this.tasks.filter((task) => {
  //     if (filerDto.search) {
  //       result =
  //         task.title.toLowerCase().includes(filerDto.search.toLowerCase()) ||
  //         task.description
  //           .toLowerCase()
  //           .includes(filerDto.search.toLowerCase());
  //     }
  //     if (filerDto.status) {
  //       result = task.status === filerDto.status;
  //     }
  //     return result;
  //   });
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  // deleteTask(id: string): void {
  //   const task: Task = this.getTaskById(id);
  //   const taskIdx: number = this.tasks.findIndex((t) => t.id === task.id);
  //   this.tasks.splice(taskIdx, 1);
  // }

  async updateTask(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    const task: Task = await this.getTaskById(id);
    task.status = status;

    await this.tasksRepository.save(task);
    return task;
  }

  // updateTask(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //   const { status } = updateTaskStatusDto;
  //   const task: Task = this.getTaskById(id);
  //   task.status = status;

  //   const taskIdx: number = this.tasks.findIndex((task) => task.id === id);
  //   this.tasks.splice(taskIdx, 1, task);
  //   return task;
  // }
}
