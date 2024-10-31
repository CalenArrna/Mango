import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { BoardColumn } from 'src/columns/column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board)
  columns: BoardColumn[];
}
