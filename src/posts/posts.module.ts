import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
