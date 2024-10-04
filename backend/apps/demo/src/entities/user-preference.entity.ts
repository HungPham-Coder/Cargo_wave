import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserPreference{
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column ({default: true})
    useEmail: boolean;

    @Column ({default: false})
    usePush: boolean;

    @Column ({default: true})
    useSms: boolean;

    @OneToOne(() => User, (user) => user.userPreference)
    @JoinColumn()
    user: User;
}