import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { Post } from '../entities';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (post) {
      return Promise.resolve(post);
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(createDto: CreatePostDto): Promise<Post> {
    const postEntity = {
      ...createDto,
      createdAt: new Date().toString(),
      createdBy: 'TODO get user from auth',
    };
    const newPost = await this.postsRepository.create(postEntity);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, updateDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, updateDto);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number): Promise<void> {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
