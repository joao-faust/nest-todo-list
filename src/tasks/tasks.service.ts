import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TaskStatus } from 'src/tasks/tasks.types';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, userId: number) {
    const task = this.tasksRepository.create({ ...dto, user: { id: userId } });
    return await this.tasksRepository.save(task);
  }

  async get(userId: number) {
    return await this.tasksRepository.findBy({ user: { id: userId } });
  }

  async getById(taskId: number, userId: number) {
    const task = await this.tasksRepository.findOneBy({
      id: taskId,
      user: { id: userId },
    });

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(dto: UpdateTaskDto, taskId: number, userId: number) {
    const task = await this.getById(taskId, userId);
    const data = { ...task, ...dto };

    if (dto.status && dto.status !== task.status) {
      switch (dto.status) {
        case TaskStatus.IN_PROGRESS: {
          data.startedAt = new Date();
          data.finishedAt = null;
          break;
        }
        case TaskStatus.FINISHED: {
          data.finishedAt = new Date();
          if (!task.startedAt) data.startedAt = data.finishedAt;
          break;
        }
        case TaskStatus.PENDING: {
          data.startedAt = null;
          data.finishedAt = null;
          break;
        }
      }
    }

    await this.tasksRepository.save(this.tasksRepository.create(data));
  }

  async delete(taskId: number, userId: number) {
    await this.tasksRepository.remove(await this.getById(taskId, userId));
  }
}
