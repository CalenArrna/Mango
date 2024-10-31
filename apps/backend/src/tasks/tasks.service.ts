import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly TaskRepository: Repository<Task>,
  ) {}

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.TaskRepository.create(task);
    return this.TaskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return this.TaskRepository.find({ relations: ['column'] });
  }

  async findOne(id: string): Promise<Task> {
    return this.TaskRepository.findOne({
      where: { id },
      relations: ['column'],
    });
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    await this.TaskRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.TaskRepository.delete(id);
  }
}
