import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
