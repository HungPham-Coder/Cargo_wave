import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Staffs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @OneToOne (() => Users, user => user.id)
  user: Users;
  // @Column({ default: true })
  // isActive: boolean;
}