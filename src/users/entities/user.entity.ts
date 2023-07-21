import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class Users {
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
}
