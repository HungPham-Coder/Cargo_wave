import { Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './create-user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  // @MessagePattern('hero.user.findAll')
  @HttpCode(HttpStatus.OK)
  @Get('findAll')
  async findAll() {
    console.log('Received request for findAll');
    return this.userService.findAll();
  }

  // @MessagePattern("hero.user.createUser")
  @HttpCode(HttpStatus.OK)
  @Get('create')
  create(userDto: CreateUserDTO) {
    return this.userService.create(userDto);
  }

  // @MessagePattern("hero.user.removeUser")
  @Put('removeUser/:id')
  @HttpCode(HttpStatus.OK)
  removeUser(id: string) {
    return this.userService.removeUser(id);
  }

  @MessagePattern("hero.user.findByEmail")
  findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }
}
