import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';


@Module({
  imports : [
    UsersModule,
    RolesModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      // signOptions: {expiresIn: '60s'}
    }
    )
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
