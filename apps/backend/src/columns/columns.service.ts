import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(
    userId: string,
    boardId: string,
    column: CreateColumnDto,
  ): Promise<BoardColumn> {
    const newBoard = this.columnRepository.create({
      ...column,
      board: { id: boardId, user: { id: userId } },
    });
    return this.columnRepository.save(newBoard);
  }

  async findAll(userId: string, boardId: string): Promise<BoardColumn[]> {
    return this.columnRepository.find({
      where: { board: { id: boardId, user: { id: userId } } },
      relations: ['board'],
    });
  }

  async findOne(
    userId: string,
    boardId: string,
    id: string,
  ): Promise<BoardColumn> {
    return this.validateOwnership(userId, boardId, id);
  }

  async update(
    userId: string,
    boardId: string,
    id: string,
    updatedData: Partial<BoardColumn>,
  ): Promise<BoardColumn> {
    const column = await this.validateOwnership(userId, boardId, id);
    await this.columnRepository.update(id, { ...column, ...updatedData });
    return this.findOne(userId, boardId, id);
  }

  async remove(userId: string, boardId: string, id: string): Promise<void> {
    const column = await this.validateOwnership(userId, boardId, id);
    await this.columnRepository.delete(column.id);
  }

  async validateOwnership(
    userId: string,
    boardId: string,
    columnId: string,
  ): Promise<BoardColumn> {
    const column = await this.columnRepository.findOne({
      where: { id: columnId, board: { id: boardId } },
      relations: ['board', 'board.user'], // Fetch necessary relations
    });

    if (!column) {
      throw new NotFoundException('Column not found, not exists!');
    }

    if (column.board.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have access to this column! Please login with the correct user!",
      );
    }

    return column;
  }
}
