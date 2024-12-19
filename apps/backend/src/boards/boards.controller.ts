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
    @Param('id') id: string,
  ): Promise<ResponseBoardDto> {
    const userId = req.user.userId;
    const board = await this.boardsService.findOne(userId, id);
    return plainToInstance(ResponseBoardDto, board, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() board: Partial<Board>,
  ): Promise<Board> {
    const userId = req.user.userId;
    return this.boardsService.update(userId, id, board);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    const userId = req.user.userId;
    return this.boardsService.remove(userId, id);
  }
}
