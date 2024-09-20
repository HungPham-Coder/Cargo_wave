import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Ship } from './ship.entity';
import { Log } from './log.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column()
  port_start: string;

  @Column()
  port_end: string;

  @Column()
  departure_time: Date;

  @Column()
  arrival_time: Date;

  @Column()
  status: number;

  @Column()
  flag: number;

  @ManyToOne(() => User, user => user.routes)
  @JoinColumn({ name: "userID" })
  users: User;

  @ManyToOne(() => Ship, ships => ships.routes)
  @JoinColumn({ name: "shipID" })
  ships: Ship;

  @OneToMany(() => Log, (logs) => logs.routes)
  logs: Log[]
}