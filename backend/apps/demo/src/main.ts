import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'hero',
  //     protoPath: join(__dirname, 'hero/hero.proto'),
  //     url: 'localhost:3001',
  //   },
  // });

  // const app = await NestFactory.createMicroservice <MicroserviceOptions>(AppModule, {
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'hero',
  //       brokers: ['localhost:9092'],
  //     },

  //     consumer:{
  //       groupId: 'hero-consumer'
  //     },
  //   }
  // });

  // app.useGlobalPipes (new ValidationPipe());
  // app.listen();
}
bootstrap();
