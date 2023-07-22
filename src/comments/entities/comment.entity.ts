import { Posts } from 'src/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // This is just a default value
  comment_date: Date;

  @ManyToOne(() => Posts, post => post.comments)
  post: Posts;
}
