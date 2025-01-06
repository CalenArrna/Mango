import { Expose } from 'class-transformer';
import { Priority } from 'src/tasks/enums';

export class ResponseTaskDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  priority: Priority;
}
