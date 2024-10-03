import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDTO } from 'apps/demo/src/users/create-user-request.dto';

@Injectable()
export class UsersService {
<<<<<<< HEAD
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    async onModuleInit() {
        this.client.subscribeToResponseOf('hero.user.findAll');
        await this.client.connect();
    }
    findAll() {
        return this.client.send('hero.user.findAll', {});
    }


    updateUser() {

    }

    findById() {

    }

    findByEmail() {

    }

    removeUser() {

=======
    constructor (@Inject('HERO_SERVICE') private readonly client: ClientKafka){};
    
    findAll(){
        return this.client.send ('hero.user.findAll', {});
    }

    findById(id: number){
        return this.client.send ('hero.user.findById', id);
    }

    findByEmail(email: string){
        return this.client.send ('hero.user.findByEmail', email);
    }

    create (userDto: CreateUserDTO){
        return this.client.send ('hero.user.createUser', userDto);
    }

    remove(id: number){
        return this.client.send ('hero.user.removeUser', id);
>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7
    }
}
