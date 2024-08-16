import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeStaff } from './TypeStaff';
import { Customers } from './Custormers';
import { Router } from 'express';
import { Routes } from './Routes';

@Entity()
export class Bookshippings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_typestaff: number;

  @Column()
  id_customer: number;

  @Column()
  booking_date: Date;

  @Column()
  id_route: number;

  @Column()
  destination: string;

  @Column()
  price: number

  @ManyToOne(() => TypeStaff, typeStaff => typeStaff.id)
  typeStaff: TypeStaff;

  @ManyToOne (() => Customers, customers => customers.id)
  customer: Customers;

  @ManyToOne (() => Routes, route => route.id)
  route: Router;
}