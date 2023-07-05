import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewsService } from './';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { PostEntity } from '../entities';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllPosts(): Promise<PostEntity[]> {
    return this.newsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.newsService.getPostById(Number(id));
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.newsService.createPost(createPostDto);
  }

  @Put(':id')
  updatePost(
    @Param() id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.newsService.updatePost(Number(id), updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param() id: string): Promise<void> {
    return this.newsService.deletePost(Number(id));
  }
}
