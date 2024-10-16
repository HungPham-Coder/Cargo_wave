import { Module } from '@nestjs/common';
import { KafkaClientModule } from '../kafka-client/kafka-client.module';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';

@Module({
    imports: [KafkaClientModule],
    providers: [MailsService],
    exports: [MailsService],
    controllers: [MailsController]
})
export class MailsModule {}
