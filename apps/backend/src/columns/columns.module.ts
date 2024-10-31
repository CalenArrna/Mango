import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from './column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
