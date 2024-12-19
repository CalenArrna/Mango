import { Expose } from 'class-transformer';

export class ResponseTaskDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;
}
