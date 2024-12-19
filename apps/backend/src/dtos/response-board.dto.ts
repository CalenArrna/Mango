import { Expose, Type } from 'class-transformer';
import { ResponseColumnDto } from './response-column.dto';

export class ResponseBoardDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => ResponseColumnDto)
  columns: ResponseColumnDto[];
}
