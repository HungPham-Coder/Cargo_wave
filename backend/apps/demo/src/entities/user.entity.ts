import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Role } from './role.entity';
import { Route } from './routes.entity';
import { RefreshToken } from './refreshToken.entity';
import { UserPreference } from './user-preference.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column ()
  deviceToken: string;
  @Column()
  name: string;

  @Column()
  phone_number: number;

  @Column()
  email: string;

  @Column()
  dob: Date;

  @Column()
  gender: number

  @Column({ nullable: true })
  image: string

  @Column()
  password: string;

  @Column({ nullable: true })
  verify_token: string;

  @Column({ nullable: true })
  verify_token_expires: Date;

  @Column()
  status: number

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role'
  })
  roles: Role[]

  @OneToMany(() => RefreshToken, (refreshTokens) => refreshTokens.users)
  refreshTokens: RefreshToken[]

  @OneToOne (() => UserPreference, (userPreference) => userPreference.user)
  userPreference: UserPreference
}