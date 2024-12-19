import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
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
    @Param('boardId') boardId: string,
  ): Promise<ResponseColumnDto> {
    return this.columnService.create(boardId, column);
  }

  @Get()
  findAll(@Param('boardId') boardId: string): Promise<BoardColumn[]> {
    return this.columnService.findAll(boardId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
  ): Promise<BoardColumn> {
    return this.columnService.findOne(boardId, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() columnData: Partial<BoardColumn>,
  ): Promise<BoardColumn> {
    return this.columnService.update(boardId, id, columnData);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
  ): Promise<void> {
    return this.columnService.remove(boardId, id);
  }
}
