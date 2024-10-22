import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Thay đổi thành URL frontend của bạn
    credentials: true,
  });
  // app.use(cors({
  //   origin: 'http://localhost:3000',
  //   credentials: true,
  // }));
  app.useGlobalPipes(new ValidationPipe());
  app.startAllMicroservices();
  await app.listen(3001);

  
}
bootstrap();
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