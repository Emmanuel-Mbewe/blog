import { Category } from 'src/category/entities/category.entity';
import { Comments } from 'src/comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity({name: 'posts'})
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // This is just a default value
  postedOn: Date;

  @OneToMany(() => Comments, comment => comment.post, { cascade: true })
  comments: Comment[];

  @ManyToOne(() => Category, category => category.posts)
  category: Category;
}
