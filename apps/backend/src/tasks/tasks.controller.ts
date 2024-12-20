import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
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
    @Request() req,
    @Body() task: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.create(columnId, task);
  }

  @Get(':id')
  findOne(
    @Param('columnId') columnId: string,
    @Request() req,
    @Param('id') id: string,
  ): Promise<Task> {
    const userId = req.user.userId;
    return this.taskService.findOne(userId, columnId, id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('columnId') columnId: string,
    @Param('id') id: string,
    @Body() updates: Partial<Task>,
  ): Promise<Task> {
    const userId = req.user.userId;
    return this.taskService.update(userId, columnId, id, updates);
  }

  @Delete(':id')
  remove(
    @Request() req,
    @Param('columnId') columnId: string,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user.userId;
    return this.taskService.remove(userId, columnId, id);
  }
}
