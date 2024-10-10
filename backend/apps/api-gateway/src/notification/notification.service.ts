import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
    constructor (@Inject('HERO_SERVICE') private readonly client: ClientKafka){}

    sendNotification (userId: string, message: string){
        this.client.send ('hero.notification', {userId, message})
    }
}
