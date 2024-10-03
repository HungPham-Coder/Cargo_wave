import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';


@Module({
  imports: [
<<<<<<< HEAD
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
=======
    MicroserviceClientModule
>>>>>>> c7c112782f74ac8981d8bb89c4e012e3df9dd4f7
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
