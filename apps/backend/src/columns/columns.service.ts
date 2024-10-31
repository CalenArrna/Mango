import { Injectable } from '@nestjs/common';
import { BoardColumn } from './column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardRepository: Repository<BoardColumn>,
  ) {}

  async create(board: Partial<BoardColumn>): Promise<BoardColumn> {
    const newBoard = this.boardRepository.create(board);
    return this.boardRepository.save(newBoard);
  }

  async findAll(): Promise<BoardColumn[]> {
    return this.boardRepository.find({ relations: ['board'] });
  }

  async findOne(id: string): Promise<BoardColumn> {
    return this.boardRepository.findOne({
      where: { id },
      relations: ['board'],
    });
  }

  async update(id: string, board: Partial<BoardColumn>): Promise<BoardColumn> {
    await this.boardRepository.update(id, board);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
