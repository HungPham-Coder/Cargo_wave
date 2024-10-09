import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice <MicroserviceOptions>(NotificationModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'hero',
        brokers: ['localhost:9092'],
      },

      consumer:{
        groupId: 'hero-consumer'
      },
    }
  });

  app.listen();
}
bootstrap();
