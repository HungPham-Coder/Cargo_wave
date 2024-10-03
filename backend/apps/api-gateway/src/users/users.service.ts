import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
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

    }
}
