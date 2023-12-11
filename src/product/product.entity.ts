import { type } from 'os';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @Column()
    description: string;

   
    @Column('decimal', { precision: 5, scale: 2, default: 0.00 })
price: number;
}