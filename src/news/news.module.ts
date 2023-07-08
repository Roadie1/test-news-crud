import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { Post } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
