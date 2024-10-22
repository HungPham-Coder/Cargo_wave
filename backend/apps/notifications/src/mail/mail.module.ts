import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/demo/src/entities/user.entity';
import { UsersModule } from 'apps/demo/src/users/users.module';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      signOptions: {expiresIn: '5m'}
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    MailService
  ],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
