import { Posts } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//User entity class
@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;
    
    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => Posts, post => post.author, { cascade: true })
    posts: Comment[];
}
