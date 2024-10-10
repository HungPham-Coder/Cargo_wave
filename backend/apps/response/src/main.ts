import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ResponseModule } from './response.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice <MicroserviceOptions>(ResponseModule, {
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
