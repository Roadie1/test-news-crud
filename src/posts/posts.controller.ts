import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, GetPostsDto, UpdatePostDto } from '../dto';
import { Post as PostEntity } from '../entities';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { RequestWithUser } from '../interfaces';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() query: GetPostsDto): Promise<PostEntity[]> {
    return this.postsService.getAllPosts(query);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @Req() request: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto, request.user.email);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Param() id: { id: string },
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(Number(id.id), updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param() id: { id: string }): Promise<void> {
    return this.postsService.deletePost(Number(id.id));
  }
}
