import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { ApiGatewayService } from './api-gateway.service';
import { MicroserviceClientModule } from './microservice-client/microservice-client.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    AuthModule, UsersModule, PermissionsModule, RolesModule,
    MicroserviceClientModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],

})
export class ApiGatewayModule { }
