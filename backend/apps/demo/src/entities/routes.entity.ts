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

  @Column('float')
  distance: number;

  @Column()
  status: number;

  @ManyToOne(() => Transport, transport => transport.routes)
  @JoinColumn({ name: "transportID" })
  transport: Transport; // Changed to singular

  @ManyToOne(() => Location, departure => departure.routeDeparture) // Assuming 'departure' has a 'routes' relationship
  @JoinColumn({ name: "departureID" })
  departure: Location;

  @ManyToOne(() => Location, arrival => arrival.routeArrival) // Assuming 'arrival' has a 'routes' relationship
  @JoinColumn({ name: "arrivalID" })
  arrival: Location;
}