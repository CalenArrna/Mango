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

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<ResponseBoardDto> {
    const userId = req.user.userId;
    const board = await this.boardsService.create(userId, createBoardDto);
    return plainToInstance(ResponseBoardDto, board, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  findAll(@Request() req): Promise<Board[]> {
    const userId = req.user.userId;
    return this.boardsService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') boardId: string,
  ): Promise<ResponseBoardDto> {
    const userId = req.user.userId;
    const board = await this.boardsService.findOne(userId, boardId);
    return plainToInstance(ResponseBoardDto, board, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  async update(
    @Param('id') boardId: string,
    @Request() req,
    @Body() updatedData: Partial<Board>,
  ): Promise<ResponseBoardDto> {
    const userId = req.user.userId;
    const board = await this.boardsService.update(userId, boardId, updatedData);
    return plainToInstance(ResponseBoardDto, board, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') boardId: string, @Request() req): Promise<void> {
    const userId = req.user.userId;
    return this.boardsService.remove(userId, boardId);
  }
}
