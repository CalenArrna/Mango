import { Expose, Type } from 'class-transformer';
import { ResponseTaskDto } from './response-task.dto';

export class ResponseColumnDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => ResponseTaskDto)
  tasks: ResponseTaskDto[];
}
