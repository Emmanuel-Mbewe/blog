import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  async findAll(): Promise<Posts[]> {
    return this.postRepository.find({ relations: ['comments'] });
  }

  async findOneWithComments(id: number): Promise<Posts> {
    const post = await this.postRepository.findOneBy({id});
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    return post;
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.save(updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
