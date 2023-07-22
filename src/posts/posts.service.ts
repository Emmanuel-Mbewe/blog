import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ){}

  async createPost(id: number, title: string, content: string): Promise<Posts> {
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) {
      throw new Error(`Post with ID ${id} not found.`);
    }

    const newPost = new Posts();
    newPost.title = title;
    newPost.content = content;
    newPost.category = category;

    return this.postRepository.save(newPost);
  }
  
  async findAll(): Promise<Posts[]> {
    return this.postRepository.find({ relations: ['category','comments'] });
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

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
