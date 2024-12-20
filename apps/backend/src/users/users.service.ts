import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(emailToFind: string): Promise<User> {
    return this.userRepository.findOneBy({ email: emailToFind });
  }

  async update(
    userId: string,
    user: Partial<User>,
    currentUserId: string,
  ): Promise<User> {
    if (userId !== currentUserId) {
      throw new ForbiddenException('You can only update your own profile!');
    }
    await this.userRepository.update(userId, user);
    return this.findOne(userId);
  }

  async remove(id: string, currentUserId: string): Promise<void> {
    if (id !== currentUserId) {
      throw new ForbiddenException('You can only delete your own account!');
    }

    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }
}
