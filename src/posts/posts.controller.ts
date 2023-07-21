import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Posts } from './entities/post.entity';
import { PostService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOneWithComments(@Param('id') id: number) {
    try {
      const post = await this.postService.findOneWithComments(id);
      return { success: true, post };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
