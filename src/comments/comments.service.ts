import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comment.entity';
import { Posts } from 'src/posts/entities/post.entity';

//Provider class of the comments
@Injectable()
export class CommentService {
  //Constructing the new comment on the particular post
  constructor(
    //New comment
    @InjectRepository(Comments) private readonly commentRepository: Repository<Comments>,
    //On a post
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
  ){}

  //Commenting on the specific post by id
  async createComment(id: number, comment: string): Promise<Comments> {
    //Fetching a post from database by id
    const post = await this.postRepository.findOneBy({id});
    //Checking if the post exists
    if (!post) {
      //If it does not exists, throw an error hence, cannot be commented
      throw new Error(`Post with ID ${id} not found.`);
    }
    //If it exists, the write a comment on that post
    const newComment = new Comments();
    newComment.comment = comment;
    newComment.post = post;

    //Save the comment to the database
    return this.commentRepository.save(newComment);
  }
  
  //Fetching all the posts
  findAll() {
    return this.commentRepository.find();
  }

  //Fetching a particular comment from the database by id
  findOne(id: number) {
    return this.commentRepository.findOneBy({id});
  }
  
  //Deleting the comment on the post from the database by id
  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
