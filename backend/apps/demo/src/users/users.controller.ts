import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  @Post ('redirect')
  redirect(@Body() name:string, email:string){
    return this.userService.create(name, email);
  }

  // @MessagePattern("hero.user.createUser")
  @HttpCode(HttpStatus.OK)
  @Get('create')
  create(userDto: CreateUserDTO) {
    return this.userService.save(userDto);
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
