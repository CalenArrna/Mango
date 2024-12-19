import { Injectable, NotFoundException } from '@nestjs/common';
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
      select: ['id', 'title'], // Return minimal information
    });
  }

  async findOne(userId: string, id: string): Promise<Board> {
    const board = this.boardRepository.findOne({
      where: { id, user: { id: userId } }, // Verify ownership current implementation
      relations: ['columns', 'columns.tasks'], // Fetch columns and tasks
    });

    if (!board) {
      throw new NotFoundException('Board not found or access denied');
    }

    return board;
  }

  async update(
    userId: string,
    id: string,
    board: Partial<Board>,
  ): Promise<Board> {
    await this.boardRepository.update(id, board);
    return this.findOne(userId, id);
  }

  async remove(userId: string, id: string): Promise<void> {
    const board = await this.findOne(userId, id);
    await this.boardRepository.delete(board.id);
  }
}
