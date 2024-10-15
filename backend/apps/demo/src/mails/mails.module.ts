import { Module } from '@nestjs/common';
import { KafkaClientModule } from '../kafka-client/kafka-client.module';
import { MailService } from '@sendgrid/mail';
import { MailsController } from './mails.controller';

@Module({
    imports: [KafkaClientModule],
    // controllers: [MailsController],
    providers: [MailService]
})
export class MailsModule {}
