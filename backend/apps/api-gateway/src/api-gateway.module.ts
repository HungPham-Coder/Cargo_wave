import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ClientKafka } from '@nestjs/microservices';

@Module({
  imports: [  
    AuthModule
  ],
  providers: [ApiGatewayService],
  controllers: [ApiGatewayController],

})
export class ApiGatewayModule {}
