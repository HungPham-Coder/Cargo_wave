import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Transport } from './transport.entity';
import { Location } from './location.entity';
import { Type } from 'class-transformer';

@Entity()
export class Route {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column()
  departure_time: Date;

  @Column()
  arrival_time: Date;

  @Column()
  status: number;

  @ManyToOne(() => Transport, transport => transport.routes)
  @JoinColumn({ name: "transportID" })
  transport: Transport; 

  @ManyToOne(() => Location, departure => departure.routeDeparture) 
  @JoinColumn({ name: "departureID" })
  departure: Location;

  @ManyToOne(() => Location, arrival => arrival.routeArrival)   
  @JoinColumn({ name: "arrivalID" })
  arrival: Location;
}