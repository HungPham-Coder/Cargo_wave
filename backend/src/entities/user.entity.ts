import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  password: string;

  @Column()
  born: string;
  // @Column({ default: true })
  // isActive: boolean;
}