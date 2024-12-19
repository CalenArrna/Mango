import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from 'src/dtos/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/columns/:columnId/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  create(
    @Param('columnId') columnId: string,
    @Body() task: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.create(columnId, task);
  }

  @Get()
  findAll(@Param('columnId') columnId: string): Promise<Task[]> {
    return this.taskService.findAll(columnId);
  }

  @Get(':id')
  findOne(
    @Param('columnId') columnId: string,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.findOne(columnId, id);
  }

  @Put(':id')
  update(
    @Param('columnId') columnId: string,
    @Param('id') id: string,
    @Body() updates: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(columnId, id, updates);
  }

  @Delete(':id')
  remove(
    @Param('columnId') columnId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.taskService.remove(columnId, id);
  }
}
