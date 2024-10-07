import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transport } from "./transport.entity";

@Entity()
export class ShippingType {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    status: string;

    @OneToMany(() => Transport, (transport) => transport.shippingType)
    transports: Transport[]
}