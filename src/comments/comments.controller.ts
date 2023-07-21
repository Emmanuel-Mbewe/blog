import { Controller, Post, Body, Param, NotFoundException, Get } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comments } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body('text') text: string,
  ) {
    try {
      const comment = await this.commentService.createComment(postId, text);
      return { success: true, comment };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<Comments []> {
    return this.commentService.findAll();
  }
}
