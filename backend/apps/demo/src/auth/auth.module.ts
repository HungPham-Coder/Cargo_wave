import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './google-oauth/google.strategy';
import { MailsModule } from '../mails/mails.module';


@Module({
  imports : [
    MailsModule,
    UsersModule,
    RolesModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '5m'}
    }
    )
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
