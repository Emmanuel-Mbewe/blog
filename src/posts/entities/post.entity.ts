import { Comments } from 'src/comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // This is just a default value
  postedOn: Date;

  @OneToMany(() => Comments, comment => comment.post)
  comment: Comment[];
}
