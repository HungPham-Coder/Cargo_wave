import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule} from './users/users.module';
import { UsersService } from './users/users.service';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [  
    AuthModule, UsersModule,
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
  ],
  controllers: [ApiGatewayController],
  providers: [ ApiGatewayService],
})
export class ApiGatewayModule {}
