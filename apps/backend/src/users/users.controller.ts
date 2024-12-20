import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'src/dtos/response-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersService.findAll();
    return plainToInstance(ResponseUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findOne(id);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: Partial<User>,
    @Request() req,
  ): Promise<User> {
    const currentUserId = req.user.userId;
    return this.usersService.update(id, user, currentUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    const currentUserId = req.user.userId;
    return this.usersService.remove(id, currentUserId);
  }
}
