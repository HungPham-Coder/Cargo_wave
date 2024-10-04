import { Injectable } from '@nestjs/common';
import { PushService } from '../push/push.service';
import { SmsService } from '../sms/sms.service';
import { EmailService } from '../email/email.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';

@Injectable()
export class NotificationService {
    constructor (
        private emailService: EmailService,
        private smsService: SmsService,
        private pushNotificationService: PushService,
        private userPreferenceService: UserPreferenceService
    ){}

    async sendNotification (userId: string, message: string){
        const preferences = await this.userPreferenceService.findByUserId(userId);

        if (preferences.useEmail){
            //Send email
            this.emailService.sendEmail (userId,message);
        }

        if (preferences.useSms){
            //Send SMS
            this.smsService.sendSms (userId, message);
        }

        if (preferences.usePush){
            //Send push notification
            this.pushNotificationService.sendPushNotification(userId, message);
        }
    }
}
