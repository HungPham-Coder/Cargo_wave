import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService} from './users.service';
@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService){};
    
    @Get()
    findTestQuery(@Query ('role') role?: 'INTERN' | 'ADMIN' |'ENGINEERS'){
        return this.usersService.findAll(role);
    }
    
    
// biên dịch từ trên xuống nếu get này để dưới ":id" nó sẽ không nhận được "intern"
    // @Get ("intern")
    // findInterns(){
    //     return "interns";
    // }
    @Get(":id")
    findById(@Param('id') id : string){
        return this.usersService.findOne(+id); // {ra file json} //+ -> convert to number
    }

    @Post()
    create(@Body () user : { name: string, email: string, role: 'INTERN' | 'ENGINEER'| 'ADMIN'}){
        return this.usersService.create(user) ;
    }

    @Patch(":id")
    update(@Param('id') id: string, @Body() userUpdate:{ name: string, email: string, role: 'INTERN' | 'ENGINEER'| 'ADMIN'}){
        //return {id, ...userUpdate} // nếu bên trong lấy user nó sẽ coi đó là một object còn ...user nó chỉ lấy các thuộc tính
        return this.usersService.update(+id, userUpdate)
    }

    @Delete (':id')
    delete (@Param('id') id: string){
        return this.usersService.delete(+id)
    }

}
