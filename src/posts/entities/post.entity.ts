import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Comments } from 'src/comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

//Entity class of post resource
@Entity({name: 'posts'})
export class Posts {
  //Auto generating the id of post
  @PrimaryGeneratedColumn()
  id: number;

  //Each post must have a title
  @Column({nullable: false})
  title: string;

  //Post can have an empty content....This is so in times when the title gives all the required information of the post
  @Column({nullable:true})
  content: string;

  //Publication date and time of the post
  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // This is just a default value
  publication_date: Date;

  //Referenced by the comments table
  @OneToMany(() => Comments, comment => comment.post, { cascade: true })
  comments: Comment[];

  //Referencing the category table. Each post belogs to a single category
  @ManyToOne(() => Category, category => category.posts)
  category: Category;

  //Referencing the users table.... Each post is poted by the single user
  // @ManyToOne(() => User, user => user.posts)
  // author: User;
}
