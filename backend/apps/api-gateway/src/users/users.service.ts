import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    // constructor (@Inject('USER_SERVICE') private readonly client: ClientKafka){};

    findAll(){
        return "hello users";
    }

    updateUser(){

    }

    findById(){

    }

    findByEmail(){

    }

    removeUser(){
        
    }
}
