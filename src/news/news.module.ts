import { Module } from '@nestjs/common';
import { NewsController, NewsService } from './';
import { PostEntity } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
