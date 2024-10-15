import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MailsService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    confirm(){
        return this.client.send('hero.mails.confirm', {});
    }

    resetPassword(){
        return this.client.send('hero.mails.resetPass', {});
    }
}
