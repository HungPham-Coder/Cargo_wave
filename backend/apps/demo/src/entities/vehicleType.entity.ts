import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ship } from "./ship.entity";

@Entity()
export class VehicleType{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    status: number;

    @OneToOne(()=> Ship, ship => ship.vehicle)
    @JoinColumn ({name: "shipID"})
    ship: Ship;
}
