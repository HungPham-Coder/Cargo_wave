import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';


@Module({
  imports: [
    MicroserviceClientModule
  ],
  providers: [AuthService],
  controllers: [AuthController],

})
export class AuthModule {}
