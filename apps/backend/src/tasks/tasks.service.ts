import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(columnId: string, task: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...task,
      column: { id: columnId },
    });
    return this.taskRepository.save(newTask);
  }

  // async findAll(columnId: string): Promise<Task[]> {
  //   return this.taskRepository.find({
  //     where: { column: { id: columnId } },
  //     relations: ['column'],
  //   });
  // } TODO: Delete if won't be used.

  async findOne(userId: string, columnId: string, id: string): Promise<Task> {
    return this.validateOwnership(userId, columnId, id);
  }

  async update(
    userId: string,
    columnId: string,
    id: string,
    updatedData: Partial<Task>,
  ): Promise<Task> {
    const task = await this.validateOwnership(userId, columnId, id);
    await this.taskRepository.update(task.id, updatedData);
    return this.findOne(userId, columnId, id);
  }

  async remove(userId: string, columnId: string, id: string): Promise<void> {
    const task = await this.validateOwnership(userId, columnId, id);
    await this.taskRepository.delete(task.id);
  }

  async validateOwnership(
    userId: string,
    columnId: string,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, column: { id: columnId } },
      relations: ['column', 'column.board', 'column.board.user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found, it is not exists!');
    }

    if (task.column.board.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have access to this task! Please login with proper user!",
      );
    }

    return task;
  }
}
