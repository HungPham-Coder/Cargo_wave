import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
<<<<<<< HEAD
=======
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';

>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7

@Module({
  imports: [
    MicroserviceClientModule
  ],
  providers: [AuthService],
  controllers: [AuthController],

})
export class AuthModule {}
