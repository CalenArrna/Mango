import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from 'src/tasks/enums';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
