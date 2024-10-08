import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  // providers: [NotificationService],
  // controllers: [NotificationController]
})
export class NotificationModule {}
