import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';

@Module({
  imports: [MicroserviceClientModule],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
