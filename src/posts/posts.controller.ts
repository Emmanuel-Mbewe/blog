import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './entities/post.entity';

//Controller class of the posts
@Controller('posts')
export class PostsController {
  //Constructing the post
  constructor(private readonly postsService: PostsService) {}

  //Posting the post in some category
  @Post(':categoryId')
    async createPost(@Param('categoryId') categoryId: number, @Body('title') title: string, @Body('content') content: string,
    ) {
    //Try to create a post provided that all the required info is available
    //That is id, title and content of the post
    try {
      const post = await this.postsService.createPost(categoryId, title, content);
      return { success: true, post };
    } catch (error) {
      //If some is missing, then throw an error
      throw new NotFoundException(error.message);
    }
  }

  //Fetching all the posts from the database
  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  //Fetching a single post with its comments from the database indentified by the id
  @Get(':id')
  async findOneWithComments(@Param('id') id: number) {
    try {
      const post = await this.postsService.findOneWithComments(id);
      return { success: true, post };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //Deleting the post from the database
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
