import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

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
    user: UpdateUserDto,
    currentUserId: string,
  ): Promise<User> {
    if (userId !== currentUserId) {
      throw new ForbiddenException('You can only update your own profile!');
    }

    if (!user.email && !user.password) {
      throw new BadRequestException(
        "Didn't provided any values! You should send at least a password or email to make a change!",
      );
    }

    if (user.email && (await this.findByEmail(user.email))) {
      throw new ConflictException(
        'Provided email value is already in use! Try another one!',
      );
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 11);
      user.password = hashedPassword;
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
