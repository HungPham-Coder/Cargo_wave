import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { ApiGatewayService } from './api-gateway.service';
<<<<<<< HEAD
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    AuthModule, UsersModule, PermissionsModule,
=======
import { MicroserviceClientModule } from './microservice-client/microservice-client.module';

@Module({
  imports: [  
    AuthModule, UsersModule,
<<<<<<< HEAD
    MicroserviceClientModule,
=======
>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'hero-consumer'
          }
        }
      }
    ]),
>>>>>>> 7bb9903d9749668a5919af505bfa527e4067ba08
  ],
  controllers: [ApiGatewayController],
<<<<<<< HEAD
  providers: [ApiGatewayService],
=======
  providers: [ ApiGatewayService],
  
>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7
})
export class ApiGatewayModule { }
