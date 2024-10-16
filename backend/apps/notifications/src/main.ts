import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from 'apps/demo/src/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'hero',
        brokers: ['localhost:9092'],
      },

      consumer: {
        groupId: 'hero-consumer'
      },
    }
  });

  app.useGlobalPipes(new ValidationPipe());
  app.listen();
}
bootstrap();
