import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Route } from './routes.entity';
import { ShippingType } from './shippingType.entity';

@Entity()
export class Transport {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    license_plate: string;

    @Column()
    status: number;

    @OneToMany(() => Route, route => route.transport)
    routes: Route[];

    @ManyToOne(() => ShippingType, (shipping) => shipping.transports)
    @JoinColumn({ name: "shippingTypeID" })
    shippingType: ShippingType;
}