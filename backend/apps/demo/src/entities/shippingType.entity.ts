import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ship } from "./ship.entity";

@Entity()
export class ShippingType {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    status: string;

    @OneToOne(() => Ship, ship => ship.shipping)
    @JoinColumn({name: "shipID"})
    ship: Ship;
}