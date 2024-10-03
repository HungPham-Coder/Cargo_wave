<<<<<<< HEAD
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
=======
import { Controller, Get, Post } from '@nestjs/common';
>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7
import { UsersService } from './users.service';
import { CreateUserDTO } from 'apps/demo/src/users/create-user-request.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('findAll')
    async findAll() {
        return this.userService.findAll();
    }

<<<<<<< HEAD
=======
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
>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7
}
