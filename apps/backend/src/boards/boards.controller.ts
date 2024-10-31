import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() board: Partial<Board>): Promise<Board> {
    return this.boardsService.create(board);
  }

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Board> {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() board: Partial<Board>,
  ): Promise<Board> {
    return this.boardsService.update(id, board);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.boardsService.remove(id);
  }
}
