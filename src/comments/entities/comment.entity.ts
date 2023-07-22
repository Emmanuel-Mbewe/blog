import { Posts } from 'src/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

//Entiry class of the comments
@Entity()
export class Comments {
  //Auto generating the is for the comment
  @PrimaryGeneratedColumn()
  id: number;

  //comment content
  @Column()
  comment: string;

  //Date and time .......when the comment was posted
  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // This is just a default value
  comment_date: Date;

  //Referencing the post table.......matching the comments with the particular post
  @ManyToOne(() => Posts, post => post.comments)
  post: Posts;
}
