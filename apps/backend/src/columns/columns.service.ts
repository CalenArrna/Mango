import { Injectable } from '@nestjs/common';
import { BoardColumn } from './column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from 'src/dtos/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) {}

  async create(boardId: string, column: CreateColumnDto): Promise<BoardColumn> {
    const newBoard = this.columnRepository.create({
      ...column,
      board: { id: boardId },
    });
    return this.columnRepository.save(newBoard);
  }

  async findAll(boardId: string): Promise<BoardColumn[]> {
    return this.columnRepository.find({
      where: { board: { id: boardId } },
      relations: ['board'],
    });
  }

  async findOne(boardId: string, id: string): Promise<BoardColumn> {
    return this.columnRepository.findOne({
      where: { id, board: { id: boardId } },
      relations: ['board'],
    });
  }

  async update(
    boardId: string,
    id: string,
    updatedData: Partial<BoardColumn>,
  ): Promise<BoardColumn> {
    const column = await this.findOne(boardId, id);
    await this.columnRepository.update(id, { ...column, ...updatedData });
    return this.findOne(boardId, id);
  }

  async remove(boardId: string, id: string): Promise<void> {
    const column = await this.findOne(boardId, id);
    await this.columnRepository.delete(column.id);
  }
}
