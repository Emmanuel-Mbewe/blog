import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':categoryId')
    async createPost(@Param('categoryId') categoryId: number, @Body('title') title: string, @Body('content') content: string,
    ) {
    try {
      const post = await this.postsService.createPost(categoryId, title, content);
      return { success: true, post };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOneWithComments(@Param('id') id: number) {
    try {
      const post = await this.postsService.findOneWithComments(id);
      return { success: true, post };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
