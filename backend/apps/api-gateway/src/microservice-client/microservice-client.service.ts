import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MicroserviceClientService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    async onModuleInit() {
        // //auth
        // this.client.subscribeToResponseOf('hero.auth.register');
        // this.client.subscribeToResponseOf('hero.auth.login');

        // //user
        // this.client.subscribeToResponseOf('hero.user.findAll');
        // this.client.subscribeToResponseOf('hero.user.findById');
        // this.client.subscribeToResponseOf('hero.user.findByEmail');
        // this.client.subscribeToResponseOf('hero.user.createUser');
        // this.client.subscribeToResponseOf('hero.user.removeUser');
        // this.client.subscribeToResponseOf('hero.notification');
        // await this.client.connect();
    }
}
