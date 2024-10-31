import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(board: Partial<Board>): Promise<Board> {
    const newBoard = this.boardRepository.create(board);
    return this.boardRepository.save(newBoard);
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
