import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ()
export class Storage{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_bookingshipping: number;
    
}