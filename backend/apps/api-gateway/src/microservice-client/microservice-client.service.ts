import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MicroserviceClientService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    async onModuleInit() {
        this.client.subscribeToResponseOf('hero.auth.register');
        this.client.subscribeToResponseOf('hero.auth.login');
        this.client.subscribeToResponseOf('hero.user.findAll');
        this.client.subscribeToResponseOf('hero.user.findById');
        this.client.subscribeToResponseOf('hero.user.findByEmail');
        this.client.subscribeToResponseOf('hero.user.createUser');
        this.client.subscribeToResponseOf('hero.user.removeUser');

        await this.client.connect();
    }
}
