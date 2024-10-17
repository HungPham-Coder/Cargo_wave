import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaClientService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    async onModuleInit() {
        this.client.subscribeToResponseOf('hero.mails.confirm');
        this.client.subscribeToResponseOf('hero.mails.resetPassword');
        this.client.subscribeToResponseOf('hero.mails.resEmail');
        await this.client.connect();
    }
}
