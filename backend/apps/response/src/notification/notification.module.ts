import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EmailService } from '../email/email.service';
import { PushService } from '../push/push.service';
import { SmsService } from '../sms/sms.service';
import { UserPreferenceModule } from 'apps/demo/src/user-preference/user-preference.module';

@Module({
  imports: [ UserPreferenceModule],
  controllers: [NotificationController],
  providers: [NotificationService, EmailService, SmsService, PushService]
})
export class NotificationModule {}
