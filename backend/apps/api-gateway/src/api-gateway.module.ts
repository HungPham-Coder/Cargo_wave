import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [  
    AuthModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, AuthService],
})
export class ApiGatewayModule {}
