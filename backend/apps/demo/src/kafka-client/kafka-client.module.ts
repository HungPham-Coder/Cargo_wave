import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaClientService } from './kafka-client.service';

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
                groupId: 'hero-mails'
              }
            }
          }
        ]),
      ],
      providers: [KafkaClientService],
      exports: [ClientsModule],// Xuất ClientsModule để sử dụng lại
})
export class KafkaClientModule {}
