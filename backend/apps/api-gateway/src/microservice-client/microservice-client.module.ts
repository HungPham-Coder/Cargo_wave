import { Module } from '@nestjs/common';
import { MicroserviceClientService } from './microservice-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
  exports: [ClientsModule],// Xuất ClientsModule để sử dụng lại
  providers: [MicroserviceClientService]
})
export class MicroserviceClientModule { }
