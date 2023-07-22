import { Posts } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Category table named categories
// Will be storing the attributes for the category of the post
@Entity({name:'categories'})
export class Category {
  //Primary key to be auto generated on runtime
    @PrimaryGeneratedColumn()
    id: number;

    //Name of the Category
    @Column()
    name: string;

    //Referenced by the post table
    @OneToMany(() => Posts, post => post.category, { cascade: true })
    posts: Posts[];
}
