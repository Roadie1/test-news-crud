import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { Post as PostEntity } from '../entities';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Param() id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(Number(id), updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param() id: string): Promise<void> {
    return this.postsService.deletePost(Number(id));
  }
}
