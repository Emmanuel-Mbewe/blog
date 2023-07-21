import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'comments'})
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column({nullable:true})
    comment_date: Date;
}
