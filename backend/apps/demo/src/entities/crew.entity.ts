import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Ship } from './ship.entity';
import { Log } from './log.entity';

@Entity()
export class Crew {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (users) => users.crews )
  @JoinColumn({ name: "userID" })
  users: User[]

  @OneToMany(() => Ship, (ships) => ships.crews )
  ships: Ship[]

  @OneToMany(() => Log, (logs) => logs.crews )
  logs: Log[]
}