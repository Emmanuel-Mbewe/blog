import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comment.entity';
import { Posts } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comments) private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
  ){}

  async createComment(postId: number, comment: string): Promise<Comments> {
    const post = await this.postRepository.findOneBy({});
    if (!post) {
      throw new Error(`Post with ID ${postId} not found.`);
    }

    const newComment = new Comments();
    newComment.comment = comment;
    newComment.post = post;

    return this.commentRepository.save(newComment);
  }
  
  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({id});
  }
  
  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
