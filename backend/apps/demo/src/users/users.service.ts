import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './create-user-request.dto';

export type Users = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<Users>,
  ) { }

  async create(userDto: CreateUserDTO): Promise<Users> {
    // const user = await this.usersRepository.create(userDto);
    // userDto.role = userDto.roleID
    return await this.usersRepository.save(userDto);
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email }, relations: ['roles'] });
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

}