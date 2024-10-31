import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { BoardColumn } from './column.entity';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly boardsService: ColumnsService) {}

  @Post()
  create(@Body() board: Partial<BoardColumn>): Promise<BoardColumn> {
    return this.boardsService.create(board);
  }

  @Get()
  findAll(): Promise<BoardColumn[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BoardColumn> {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() board: Partial<BoardColumn>,
  ): Promise<BoardColumn> {
    return this.boardsService.update(id, board);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.boardsService.remove(id);
  }
}
