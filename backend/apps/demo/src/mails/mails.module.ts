import { Module } from '@nestjs/common';
import { KafkaClientModule } from '../kafka-client/kafka-client.module';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [KafkaClientModule,
        JwtModule.register({
        global:true,
        signOptions: {expiresIn: '5m'}
      })],
    providers: [MailsService],
    exports: [MailsService],
    controllers: [MailsController]
})
export class MailsModule {}
