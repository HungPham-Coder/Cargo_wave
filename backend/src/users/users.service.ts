import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { CreateUserRequest } from './create-user-request.dto';

export type User = any;

@Injectable()
export class UsersService {

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        }
    ];

    // async findOne (username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username)
    // }

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<User>,
      ) {}
      async create (userDto: CreateUserRequest): Promise <User>{
        const user = this.usersRepository.create(userDto);
        return await this.usersRepository.save(user);
      }
  
      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      async findOne(name: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ name });
      }
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }

    
    
      


    
}
