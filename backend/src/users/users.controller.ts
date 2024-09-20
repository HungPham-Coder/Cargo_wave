import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Get ('findAll')
    findAll(){
        return this.userService.findAll()
    }
}
