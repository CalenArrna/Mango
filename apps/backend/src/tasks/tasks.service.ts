import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly TaskRepository: Repository<Task>,
  ) {}

  async create(columnId: string, task: CreateTaskDto): Promise<Task> {
    const newTask = this.TaskRepository.create({
      ...task,
      column: { id: columnId },
    });
    return this.TaskRepository.save(newTask);
  }

  async findAll(columnId: string): Promise<Task[]> {
    return this.TaskRepository.find({
      where: { column: { id: columnId } },
      relations: ['column'],
    });
  }

  async findOne(columnId: string, id: string): Promise<Task> {
    const task = await this.TaskRepository.findOne({
      where: { id, column: { id: columnId } },
      relations: ['column'],
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(
    columnId: string,
    id: string,
    updatedData: Partial<Task>,
  ): Promise<Task> {
    const task = await this.findOne(columnId, id);
    await this.TaskRepository.update(task.id, updatedData);
    return this.findOne(columnId, id);
  }

  async remove(columnId: string, id: string): Promise<void> {
    const task = await this.findOne(columnId, id);
    await this.TaskRepository.delete(task.id);
  }
}
