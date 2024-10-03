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

  @Column()
  flag: number;

  @ManyToOne(() => User, user => user.routes)
  @JoinColumn({ name: "userID" })
  users: User;

  @ManyToOne(() => Transport, transport => transport.routes)
  @JoinColumn({ name: "shipID" })
  transport: Transport;

  @ManyToOne(() => Location, locations => locations.routes)
  @JoinColumn({ name: "locationID" })
  locations: Location;

}