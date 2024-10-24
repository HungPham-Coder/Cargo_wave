import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @Column ()
  // deviceToken: string;
  @Column()
  name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  gender: number

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  verify_token: string;

  @Column({ nullable: true })
  verify_token_expires: Date;

  @Column({ nullable: true })
  status: number

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role'
  })
  roles: Role[]
}