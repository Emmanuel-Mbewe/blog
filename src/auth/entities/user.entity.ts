import { BeforeInsert, Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import * as bcrypt from 'bcrypt';
import { classToPlain } from "class-transformer";

//User entity class
@Entity({name: 'users'})
export class User extends AbstractEntity{
    @Column({unique: true})
    email: string;
    
    @Column({unique: true})
    user_name: string;

    @Column()
    password: string;

    @Column({default: ' '})
    bio: string;

    @Column({default: null, nullable: true})
    image: string | null;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toJSON(){
        return classToPlain(this);
    }
    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt, this.password);
    }
}
