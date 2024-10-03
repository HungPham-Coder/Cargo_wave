import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule} from './users/users.module';
import { UsersService } from './users/users.service';
import { ApiGatewayService } from './api-gateway.service';
import { MicroserviceClientModule } from './microservice-client/microservice-client.module';

@Module({
  imports: [  
    AuthModule, UsersModule,
<<<<<<< HEAD
    MicroserviceClientModule,
=======
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
  providers: [ ApiGatewayService],
  
})
export class ApiGatewayModule {}
