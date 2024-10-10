import { Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePage } from 'twilio/lib/rest/api/v2010/account/message';
import { MessagePattern } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
    constructor (private readonly notificationService: NotificationService){};
    
    @MessagePattern ('hero.notification')
    notification (userId: string, message: string){
        this.notificationService.sendNotification (userId, message);
    }
}
