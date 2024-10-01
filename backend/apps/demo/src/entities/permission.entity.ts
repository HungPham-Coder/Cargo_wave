import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Log } from './log.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  isDisabled: boolean;

  @ManyToMany(() => Role, (roles) => roles.permissions)
  roles: Role[]

  @OneToMany(() => Log, (logs) => logs.permissions)
  logs: Log[]
}