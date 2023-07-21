import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private commentRepository: Repository<Comments>
  ){}
  create(comment: Comments) {
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({id});
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return this.commentRepository.save(updateCommentDto);
  // }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
