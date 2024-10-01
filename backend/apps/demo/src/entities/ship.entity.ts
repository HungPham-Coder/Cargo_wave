import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Route } from './routes.entity';
import { Crew } from './crew.entity';
import { Log } from './log.entity';
import { VehicleType } from './vehicleType.entity';
import { ShippingType } from './shippingType.entity';

@Entity()
export class Ship {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    license_plate: string;

    @Column()
    status: number;

    @OneToMany(() => Route, route => route.ships)
    routes: Route[];

    @OneToMany(() => Crew, (crews) => crews.ships)
    crews: Crew[]

    @OneToMany(() => Log, (logs) => logs.ships)
    logs: Log[]

    @OneToOne(() => VehicleType, (vehicle) => vehicle.id)
    vehicle: VehicleType;
    
    @OneToOne(() => ShippingType, (shipping) => shipping.id)
    shipping: ShippingType;
}