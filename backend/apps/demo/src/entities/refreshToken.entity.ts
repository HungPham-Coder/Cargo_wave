import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @ManyToOne(() => User, users => users.refreshTokens)
  users: User;
}