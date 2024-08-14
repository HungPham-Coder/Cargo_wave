import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Routes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: string;

  @Column()
  finish: string;

  @Column()
  init_date: Date;

  @Column()
  finish_date: Date;

  @Column()
  weight: number;

  @Column()
  id_user_manager: number;
  
  // @Column({ default: true })
  // isActive: boolean;
}