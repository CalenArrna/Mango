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

  async create(createBoardDto: CreateBoardDto, userId: string): Promise<Board> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const board = this.boardRepository.create({ ...createBoardDto, user });
    return this.boardRepository.save(board);
  }

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, board: Partial<Board>): Promise<Board> {
    await this.boardRepository.update(id, board);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
