import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePage } from 'twilio/lib/rest/api/v2010/account/message';
import { MessagePattern } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
    constructor (private readonly notificationService: NotificationService){};
    
    
    @Post()
    notification (@Body() userId: string, @Body() message: string){
        return this.notificationService.sendNotification (userId, message);
    }
}
