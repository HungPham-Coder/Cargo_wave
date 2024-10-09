import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "./routes.entity";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  longitude: number;  

  @Column('float')
  latitude: number;  

  @OneToMany(() => Route, (route) => route.arrival) 
  routeArrival: Route[];

  @OneToMany(() => Route, (route) => route.transport) 
  routeDeparture: Route[];
}
