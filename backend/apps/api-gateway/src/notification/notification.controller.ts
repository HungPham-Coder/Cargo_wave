import { Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor (private readonly notificationService: NotificationService){}

    @Post ()
    sendNotification (userId: string, message :string){
        this.notificationService.sendNotification(userId, message);
    }
}
