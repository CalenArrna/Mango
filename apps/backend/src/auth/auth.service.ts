import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use! Please sign in!');
    }
    Logger.debug(
      `Value of things: ${email} and ${password} and bycrypt: ${bcrypt}`,
      'REGISTER',
    );
    const hashedPassword = await bcrypt.hash(password, 11);
    return this.usersService.create({ email, password: hashedPassword });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found! Please, register!');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) return user;

    throw new UnauthorizedException('Wrong Password!');
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
