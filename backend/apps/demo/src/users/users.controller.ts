import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './create-user-request.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    // @Get ('findAll')
    @MessagePattern ("hero.user.findAll")
    findAll(){
        return this.userService.findAll()
    }

    @MessagePattern ("hero.user.createUser")
    create(userDto: CreateUserDTO){
        return this.userService.create(userDto);
    }

    @MessagePattern ("hero.user.removeUser")
    removeUser(id: number){
        return this.userService.removeUser(id);
    }

    @MessagePattern ("hero.user.findByEmail")
    findByEmail(email: string){
        return this.userService.findByEmail(email);
    }
}
