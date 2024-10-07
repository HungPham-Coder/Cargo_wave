import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Transport } from './transport.entity';
import { Location } from './location.entity';

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
  transports: Transport;

  @ManyToOne(() => Location, departure => departure.departure)
  @JoinColumn({ name: "departureID" })
  departure: Location;

  @ManyToOne(() => Location, arrival => arrival.arrival)
  @JoinColumn({ name: "arrivalID" })
  arrival: Location;
}