import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'subscriptions'})
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
}
