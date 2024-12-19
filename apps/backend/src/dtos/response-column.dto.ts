import { Expose } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';

export class ResponseColumnDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  tasks: Array<Task>;
}
