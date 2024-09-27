import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Route } from './routes.entity';
import { Crew } from './crew.entity';
import { Log } from './log.entity';

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
}