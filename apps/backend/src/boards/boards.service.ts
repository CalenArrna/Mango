import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { UsersService } from 'src/users/users.service';
import { CreateBoardDto } from 'src/dtos/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createBoardDto: CreateBoardDto): Promise<Board> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const board = this.boardRepository.create({ ...createBoardDto, user });
    return this.boardRepository.save(board);
  }

  async findAll(userId: string): Promise<Board[]> {
    return this.boardRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'title'],
    });
  }

  async findOne(userId: string, boardId: string): Promise<Board> {
    return this.validateOwnership(userId, boardId);
  }

  async update(
    userId: string,
    boardId: string,
    updatedData: Partial<Board>,
  ): Promise<Board> {
    await this.validateOwnership(userId, boardId);
    await this.boardRepository.update(boardId, updatedData);
    return this.findOne(userId, boardId);
  }

  async remove(userId: string, boardId: string): Promise<void> {
    const board = await this.validateOwnership(userId, boardId);
    await this.boardRepository.delete(board.id);
  }

  async validateOwnership(userId: string, boardId: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, user: { id: userId } },
      relations: ['user', 'columns', 'columns.tasks'],
    });

    if (!board) {
      throw new NotFoundException('Board not found! Not exists!');
    }

    if (board.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have access to this board! Please log in with proper user!",
      );
    }

    return board;
  }
}
