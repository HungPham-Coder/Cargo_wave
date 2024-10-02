import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    // @Get ('findAll')
    @MessagePattern ("hero.user")
    findAll(){
        return this.userService.findAll()
    }
}
