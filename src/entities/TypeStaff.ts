import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypeStaff {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    position: string;
}