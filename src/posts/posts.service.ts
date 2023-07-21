import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

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
}
