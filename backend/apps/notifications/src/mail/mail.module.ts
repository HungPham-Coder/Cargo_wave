import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      global:true,
      signOptions: {expiresIn: '5m'}
    }),
  ],
  providers: [
    MailService
  ],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
