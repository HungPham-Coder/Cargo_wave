import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  id_card: string;
  // @Column({ default: true })
  // isActive: boolean;

  @OneToOne (() => Users, user => user.id)
  user: Users;

  
}