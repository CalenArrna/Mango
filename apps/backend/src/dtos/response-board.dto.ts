import { Expose } from 'class-transformer';

export class ResponseBoardDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  columns: [];
}
