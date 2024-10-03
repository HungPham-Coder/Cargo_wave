import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'USER_SERVICE',
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           clientId: 'hero',
  //           brokers: ['localhost:9092'],
  //         },
  //         consumer: {
  //           groupId: 'hero-consumer'
  //         }
  //       }
  //     }

  //   ]),
  // ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
