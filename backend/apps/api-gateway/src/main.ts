import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.enableCors();
  app.startAllMicroservices();
  app.useGlobalPipes (new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
