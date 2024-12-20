import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { BoardColumn } from './column.entity';
import { CreateColumnDto } from 'src/dtos/create-column.dto';
import { ResponseColumnDto } from 'src/dtos/response-column.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Post()
  create(
    @Body() column: CreateColumnDto,
    @Request() req,
    @Param('boardId') boardId: string,
  ): Promise<ResponseColumnDto> {
    const userId = req.user.userId;
    return this.columnService.create(userId, boardId, column);
  }

  @Get()
  findAll(
    @Param('boardId') boardId: string,
    @Request() req,
  ): Promise<BoardColumn[]> {
    const userId = req.user.userId;
    return this.columnService.findAll(userId, boardId);
  }

  @Get(':id')
  findOne(
    @Request() req,
    @Param('id') id: string,
    @Param('boardId') boardId: string,
  ): Promise<BoardColumn> {
    const userId = req.user.userId;
    return this.columnService.findOne(userId, boardId, id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() columnData: Partial<BoardColumn>,
  ): Promise<BoardColumn> {
    const userId = req.user.userId;
    return this.columnService.update(userId, boardId, id, columnData);
  }

  @Delete(':id')
  remove(
    @Request() req,
    @Param('id') id: string,
    @Param('boardId') boardId: string,
  ): Promise<void> {
    const userId = req.user.userId;
    return this.columnService.remove(userId, boardId, id);
  }
}
