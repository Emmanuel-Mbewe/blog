import { Controller, Post, Body, Param, NotFoundException, Get, Delete } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comments } from './entities/comment.entity';
//A controller class of the comments
@Controller('comments')
export class CommentController {
  //constructing the new comment
  constructor(private readonly commentService: CommentService) {}

  //Posting a comment on a specific post ....... identified by the post id number
  @Post(':postId')
  //Comment Object
    async createComment(@Param('postId') postId: number, @Body('text') text: string,
    ) {
      //If the post exists, then create a comment
    try {
      const comment = await this.commentService.createComment(postId, text);
      return { success: true, comment };
    } catch (error) {
      //Otherwise, throw an exception
      throw new NotFoundException(error.message);
    }
  }


  //Getting all the comment from the database
  @Get()
  async findAll(): Promise<Comments []> {
    return this.commentService.findAll();
  }

  //Getting a single comment
  @Get(':id')
  async findOneComment(@Param('id') id: number) {
    try {
      const comment = await this.commentService.findOne(id);
      return { success: true, comment };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //Deleting the comment from the database by id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
