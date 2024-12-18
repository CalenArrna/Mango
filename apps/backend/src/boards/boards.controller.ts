import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBoardDto } from 'src/dtos/create-board.dto';
import { ResponseBoardDto } from 'src/dtos/response-board.dto';
import { plainToInstance } from 'class-transformer';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<ResponseBoardDto> {
    const userId = req.user.userId;
    const board = await this.boardsService.create(createBoardDto, userId);
    return plainToInstance(ResponseBoardDto, board, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Board> {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() board: Partial<Board>,
  ): Promise<Board> {
    return this.boardsService.update(id, board);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.boardsService.remove(id);
  }
}
