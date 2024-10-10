import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'apps/demo/src/users/create-user-request.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('findAll')
    async findAll() {
        return this.userService.findAll();
    }

    // @Post ('create')
    // create (userDto: CreateUserDTO){
    //     return this.userService.create(userDto);
    // }

    // @Post('remove')
    // removeUser (id: number){
    //     return this.userService.remove(id);
    // }

    // @Post ('findByEmail')
    // findByEmail(email: string){
    //     return this.userService.findByEmail(email);
    // }
}
