import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Route } from './routes.entity';
import { Crew } from './crew.entity';
import { Ship } from './ship.entity';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  modified_time: Date;

  @Column()
  action: number;

  @ManyToOne(() => User, user => user.logs)
  @JoinColumn({ name: "userID" })
  users: User;

  @ManyToOne(() => Route, route => route.logs)
  @JoinColumn({ name: "routeID" })
  routes: Route;

  @ManyToOne(() => Crew, crew => crew.logs)
  @JoinColumn({ name: "crewID" })
  crews: Crew;

  @ManyToOne(() => Ship, ship => ship.logs)
  @JoinColumn({ name: "shipID" })
  ships: Ship;

  @ManyToOne(() => Role, roles => roles.logs)
  @JoinColumn({ name: "roleID" })
  roles: Role;

  @ManyToOne(() => Permission, permissions => permissions.logs)
  @JoinColumn({ name: "permissionID" })
  permissions: Permission;
}